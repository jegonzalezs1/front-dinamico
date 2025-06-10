import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFormulario } from '../../shared/models/Formulario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  urlApp = environment.urlAddress;
  urlApi = 'api/formulario/';

  constructor(private http: HttpClient) {}

  getAllFormularios(): Observable<IFormulario[]> {
    return this.http.get<IFormulario[]>(`${this.urlApp}${this.urlApi}`);
  }

  getFormulario(idFormulario: number): Observable<IFormulario> {
    return this.http.get<IFormulario>(`${this.urlApp}${this.urlApi}${idFormulario}`);
  }

  getFormularioCampos(idFormulario: number): Observable<IFormulario> {
    return this.http.get<IFormulario>(`${this.urlApp}${this.urlApi}campos/${idFormulario}`);
  }

  createFormulario(formulario: IFormulario): Observable<IFormulario> {
    return this.http.post<IFormulario>(`${this.urlApp}${this.urlApi}`, formulario);
  }

  updateFormulario(idFormulario: number, formulario: IFormulario): Observable<IFormulario> {
    return this.http.put<IFormulario>(`${this.urlApp}${this.urlApi}${idFormulario}`, formulario);
  }

  deleteFormulario(idFormulario: number): Observable<IFormulario> {
    return this.http.delete<IFormulario>(`${this.urlApp}${this.urlApi}${idFormulario}`);
  }
}
