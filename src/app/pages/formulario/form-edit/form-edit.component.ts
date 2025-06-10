import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IFormulario } from '../../../shared/models/Formulario';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormularioService } from '../../../services/formulario/formulario.service';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.scss'
})
export class FormEditComponent implements OnChanges {
  @Input() data: IFormulario | null = null;
  @Output() onCloseModel = new EventEmitter();

  formFormulario!: FormGroup;
  formulario!: IFormulario;
  
  constructor(
    private fb: FormBuilder,
    private formularioService: FormularioService,
    private toastr: ToastrService
  ) {
    this.formFormulario = this.fb.group({
      idFormulario: new FormControl(0),
      nombreFormulario: new FormControl('', [Validators.required])
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (!this.data || this.data.idFormulario === 0) {
      this.formFormulario.reset();
    } else {
      this.formFormulario.patchValue({
        idFormulario: this.data.idFormulario,
        nombreFormulario: this.data.nombreFormulario
      });
    }
  }

  onSubmit() {
    if (this.formFormulario.valid) {
      if (this.data) {
        this.formularioService.updateFormulario(this.data.idFormulario as number, this.formFormulario.value).subscribe({
          complete: () => {
            this.resetFormFormulario();
            this.toastr.success("Se ha actualizado el formulario");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al actualizar los registros", "Información del formulario");
          }
        });
      } else {
        this.formularioService.createFormulario(this.formFormulario.value).subscribe({
          complete: () => {
            this.resetFormFormulario();
            this.toastr.success("Se ha creado el formulario");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al guardar los registros", "Información del formulario");
          }
        });
      }
    } else {
      this.formFormulario.markAllAsTouched();
    }
  }

  resetFormFormulario() {
    this.formFormulario.reset();
    this.onClose();
  }
}
