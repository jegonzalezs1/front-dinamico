import { Component, OnInit } from '@angular/core';
import { IFormulario } from '../../../shared/models/Formulario';
import { FormularioService } from '../../../services/formulario/formulario.service';
import { ToastrService } from 'ngx-toastr';
import { ModelComponent } from '../../../shared/ui/model/model.component';
import { FormEditComponent } from '../form-edit/form-edit.component';
import { Router } from '@angular/router';
import { FormViewComponent } from '../form-view/form-view.component';
import { CampoService } from '../../../services/campo/campo.service';

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
    private campoService: CampoService,
    private toastr: ToastrService,
    private router: Router
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

  editFormulario(formulario: any) {
    this.formulario = formulario;
    this.openModelEdit();
  }

  viewFormulario(idFormulario: number): void {
    this.formularioService.getFormulario(idFormulario).subscribe((formulario) => {
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