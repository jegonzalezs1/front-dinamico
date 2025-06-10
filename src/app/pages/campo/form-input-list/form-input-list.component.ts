import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CampoService } from '../../../services/campo/campo.service';
import { FormularioService } from '../../../services/formulario/formulario.service';
import { ICampo } from '../../../shared/models/Campo';
import { IFormulario } from '../../../shared/models/Formulario';
import { ModelComponent } from '../../../shared/ui/model/model.component';
import { FormInputEditComponent } from '../form-input-edit/form-input-edit.component';

@Component({
  selector: 'app-form-input-list',
  standalone: true,
  imports: [ModelComponent, FormInputEditComponent],
  templateUrl: './form-input-list.component.html',
  styleUrls: ['./form-input-list.component.scss'],
})
export class FormInputListComponent implements OnInit {
  isModelOpen = false;
  campos: ICampo[] = [];
  formularios: IFormulario[] = [];
  campo!: ICampo;

  constructor(
    private campoService: CampoService,
    private formularioService: FormularioService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCampos();
    this.getAllFormularios();
  }

  getAllCampos() {
    this.campoService.getAllCampos().subscribe({
      next: (response) => {
        if (response) {
          this.campos = response;
        }
      },
    });
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

  resetCampo(): void {
    this.campo = { idCampo: 0, nombreCampo: '', tipoCampo: '', idFormulario: 0, formulario: { idFormulario: 0, nombreFormulario: '' }}; 
  }

  createCampo() {
    this.openModelCreate();
  }

  editCampo(campo: ICampo) {
    this.campo = campo;
    this.openModelEdit();
  }
  
  deleteCampo(idCampo: number) {
    this.campoService.deleteCampo(idCampo).subscribe({
      complete: () => {
        this.toastr.success("Se ha eliminado el campo");
        this.getAllCampos();
      },
      error: () => {
        this.toastr.warning("Hubo un problema al eliminar los registros", "Información del campo");
      }
    });
  }

  openModelCreate() {
    this.isModelOpen = true;
    this.resetCampo();
  }

  closeModelCreate() {
    this.isModelOpen = false;
    this.getAllCampos();
  }

  openModelEdit() {
    this.isModelOpen = true;
  }

  closeModelEdit() {
    this.isModelOpen = false;
    this.getAllCampos();
  }
}
