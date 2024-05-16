import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Colaborator} from "../models/colaborator";
import {C} from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root'
})
export class ColaboratorService {
  private apiUrlQ = 'https://localhost:5001/api/Colaborator';
  // private apiUrlC = 'https://localhost:5031/api/Association';
  constructor(private http: HttpClient) { }
  colaborators = signal<Colaborator[]>([]);

  getColaborators(): Observable<Colaborator[]> {
    return this.http.get<Colaborator[]>(this.apiUrlQ).pipe(
      tap((colaborators: Colaborator[]) => {
        this.colaborators.set(colaborators);
      })
    );
  }
}
