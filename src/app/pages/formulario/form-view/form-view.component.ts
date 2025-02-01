import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IFormulario } from '../../../shared/models/Formulario';
import { CampoService } from '../../../services/campo/campo.service';
import { ICampo } from '../../../shared/models/Campo';

@Component({
  selector: 'app-form-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit {
  @Input() formulario: IFormulario | null = null;
  @Output() onCloseModel = new EventEmitter();

  formView: FormGroup = this.fb.group({});
  campos: ICampo[] = [];

  constructor(
    private fb: FormBuilder,
    private campoService: CampoService) {}

  ngOnInit(): void {
    this.campoService.getAllCampos().subscribe((data: ICampo[]) => {
      this.campos = data;
    });
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

  onClose() {
    this.onCloseModel.emit(false);
  }
}
