import { ICampo } from "./Campo";

export interface IFormulario {
  idFormulario: number,
  nombreFormulario: string,
  campos?: ICampo[]
}