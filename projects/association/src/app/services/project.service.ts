import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Project} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrlQ = 'https://localhost:7283/api/Project';
  projects = signal<Project[]>([]);
  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrlQ).pipe(
      tap((projects: Project[]) => {
        this.projects.set(projects);
      })
    );
  }
}
