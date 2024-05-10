import {EventEmitter, Injectable, Input, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap, tap} from "rxjs";
import {Association} from "../models/association";

@Injectable({
  providedIn: 'root'
})
export class AssociationsService {
  private apiUrlQ = 'https://localhost:5041/api/Association';
  private apiUrlC = 'https://localhost:5031/api/Association';

  associationSelected: Association[] = [];
  associations = signal<Association[]>([]);

  constructor(private http: HttpClient) {
  }

  associationUpdated = new EventEmitter<void>();

  getAssociations(): Observable<Association[]> {
    return this.http.get<Association[]>(this.apiUrlQ).pipe(
      tap((associations: Association[]) => {
        this.associations.set(associations);
      })
    );
  }

  getAssociation(associationId: number): Observable<Association> {
    return this.http.get<Association>(this.apiUrlQ + '/' + associationId).pipe(
      tap((association: Association) => {
        this.associationSelected = [association];
      })

    );
  }

  createAssociation(association: Association): Observable<Association> {
    return this.http.post<Association>(this.apiUrlC, association).pipe(
      tap(() => this.associationUpdated.emit())
    );
  }

  associationSaved(associationId: number) {
    this.getAssociation(associationId).subscribe(association => {
      this.associationSelected = [association];
    });
  }
}
