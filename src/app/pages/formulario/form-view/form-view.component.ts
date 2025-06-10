import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IFormulario } from '../../../shared/models/Formulario';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnChanges {
  @Input() formulario!: IFormulario |  null;
  @Output() onCloseModel = new EventEmitter();

  formView!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formView = this.fb.group({});
  }

  ngOnChanges(): void {
    this.validarFormulario();
  }

  viewFormulario(): void {
    if (!this.formulario || !this.formulario.campos) {
      return;
    }

    this.formulario.campos.forEach((campo) => {
      this.formView.addControl(campo.nombreCampo, this.fb.control({ value: '', disabled: false }));
    });
  }

  validarFormulario(){
    if (this.formulario) {
      if (!this.formulario.campos) {
        this.formulario.campos = [];
      }
      this.viewFormulario();
    }
  }
  
  onClose() {
    this.onCloseModel.emit(false);
  }

  obtenerTipoEntradaInput(tipo: string): string {
    switch (tipo) {
      case 'string':
        return 'text';
      case 'int':
        return 'number';
      case 'Date':
        return 'date';
      default:
        return 'text';
    }
  }
}