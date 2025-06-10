import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ICampo } from '../../../shared/models/Campo';
import { IFormulario } from '../../../shared/models/Formulario';
import { FormularioService } from '../../../services/formulario/formulario.service';
import { CampoService } from '../../../services/campo/campo.service';

@Component({
  selector: 'app-form-input-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-input-edit.component.html',
  styleUrls: ['./form-input-edit.component.scss'],
})
export class FormInputEditComponent implements OnChanges {
  @Input() data: ICampo | null = null;
  @Output() onCloseModel = new EventEmitter();

  formCampo!: FormGroup;
  formularios: IFormulario[] = [];

  constructor(
    private fb: FormBuilder,
    private formularioService: FormularioService,
    private campoService: CampoService,
    private toastr: ToastrService
  ) {
    this.formCampo = this.fb.group({
      idCampo: new FormControl(0),
      nombreCampo: new FormControl('', [Validators.required]),
      tipoCampo: new FormControl(0, [Validators.required]),
      idFormulario: new FormControl(null, [Validators.required])
    });

    this.getAllFormularios();
  }

  getAllFormularios() {
    this.formularioService.getAllFormularios().subscribe({
      next: (response) => {
        this.formularios = response;
      },
      error: () => {
        this.toastr.warning("Error al cargar los formularios", "Información");
      }
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (!this.data || this.data.idCampo === 0) {
      this.formCampo.reset();
    } else {
      this.formCampo.patchValue({
        idCampo: this.data.idCampo,
        nombreCampo: this.data.nombreCampo,
        tipoCampo: this.data.tipoCampo,
        idFormulario: this.data.idFormulario,
      });
    }
  }

  onSubmit() {
    if (this.formCampo.valid) {
      if (this.data) {
        this.campoService.updateCampo(this.data.idCampo as number, this.formCampo.value).subscribe({
          complete: () => {
            this.resetFormCampo();
            this.toastr.success("Se ha actualizado el campo");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al actualizar los registros", "Información del campo");
          }
        });
      } else {
        this.campoService.createCampo(this.formCampo.value).subscribe({
          complete: () => {
            this.resetFormCampo();
            this.toastr.success("Se ha creado el campo");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al guardar los registros", "Información del campo");
          }
        });
      }
    } else {
      this.formCampo.markAllAsTouched();
    }
  }

  resetFormCampo() {
    this.formCampo.reset();
    this.onClose();
  }
}
