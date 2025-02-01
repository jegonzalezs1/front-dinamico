// campo.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICampo } from '../../shared/models/Campo';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CampoService {
  urlApp = environment.urlAddress;
  urlApi = 'api/campo/';

  constructor(private http: HttpClient) {}

  getAllCampos(): Observable<ICampo[]> {
    return this.http.get<ICampo[]>(`${this.urlApp}${this.urlApi}`);
  }

  getCampo(idCampo: number): Observable<ICampo[]> {
    return this.http.get<ICampo[]>(`${this.urlApp}${this.urlApi}${idCampo}`);
  }

  createCampo(campo: ICampo): Observable<ICampo> {
    return this.http.post<ICampo>(`${this.urlApp}${this.urlApi}`, campo);
  }

  updateCampo(idCampo: number, campo: ICampo): Observable<ICampo> {
    return this.http.put<ICampo>(`${this.urlApp}${this.urlApi}${idCampo}`, campo);
  }

  deleteCampo(idCampo: number): Observable<ICampo> {
    return this.http.delete<ICampo>(`${this.urlApp}${this.urlApi}${idCampo}`);
  }
}
