import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EnviarFeedbackService {

  constructor(private httpClient: HttpClient) {}

  enviarFeedback(form: any ): Observable <any[]>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.httpClient.post<any[]>(`${environment.apiUrl}/send`, form,{headers});
  }
}
