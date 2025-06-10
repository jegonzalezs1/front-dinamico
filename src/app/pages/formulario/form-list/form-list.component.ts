import { Component, OnInit } from '@angular/core';
import { IFormulario } from '../../../shared/models/Formulario';
import { FormularioService } from '../../../services/formulario/formulario.service';
import { ToastrService } from 'ngx-toastr';
import { ModelComponent } from '../../../shared/ui/model/model.component';
import { FormEditComponent } from '../form-edit/form-edit.component';
import { FormViewComponent } from '../form-view/form-view.component';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [ModelComponent, FormEditComponent, FormViewComponent],
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss'
})
export class FormListComponent implements OnInit{
  isModelOpen = false;
  isModelView = false
  formularioSeleccionado!: any;
  formularios: IFormulario[] = [];
  formulario!: IFormulario;

  constructor(
    private formularioService: FormularioService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllFormularios();
  }

  getAllFormularios() {
    this.formularioService.getAllFormularios().subscribe({
      next: (response) => {
        if (response) {
          this.formularios = response;
        }
      },
    });
  }

  resetFormulario(): void {
    this.formulario = { idFormulario: 0, nombreFormulario: '' }; 
  }

  createFormulario() {
    this.openModelCreate();
  }

  editFormulario(formulario: IFormulario) {
    this.formulario = formulario;
    this.openModelEdit();
  }

  viewFormulario(idFormulario: number): void {
    this.formularioService.getFormularioCampos(idFormulario).subscribe((formulario) => {
      this.formularioSeleccionado = formulario;
    })
    this.openModelView();
  }

  deleteFormulario(idFormulario: number) {
    this.formularioService.deleteFormulario(idFormulario).subscribe({
      complete: () => {
        this.toastr.success("Se ha eliminado el formulario");
        this.getAllFormularios();
      },
      error: () => {
        this.toastr.warning("Hubo un problema al eliminar los registros", "Información del formulario");
      }
    });
  }

  openModelCreate() {
    this.isModelOpen = true;
    this.resetFormulario();
  }

  closeModelCreate() {
    this.isModelOpen = false;
    this.getAllFormularios();
  }

  openModelEdit() {
    this.isModelOpen = true;
  }

  closeModelEdit() {
    this.isModelOpen = false;
    this.getAllFormularios();
  }

  openModelView() {
    this.isModelView = true;
  }

  closeModelView() {
    this.isModelView = false;
    this.getAllFormularios();
  }
}