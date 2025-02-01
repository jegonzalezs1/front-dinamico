import { IFormulario } from "./Formulario";

export interface ICampo {
  idCampo?: number,
  nombreCampo: string,
  tipoCampo: string,
  idFormulario: number,
  formulario: IFormulario
}
