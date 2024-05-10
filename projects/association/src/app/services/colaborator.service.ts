import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Colaborator} from "../models/colaborator";

@Injectable({
  providedIn: 'root'
})
export class ColaboratorService {
  private apiUrlQ = 'https://localhost:5001/api/Colaborator';
  // private apiUrlC = 'https://localhost:5031/api/Association';
  constructor(private http: HttpClient) { }

  getColaborators(): Observable<Colaborator[]> {
    return this.http.get<Colaborator[]>(this.apiUrlQ);
  }
}
