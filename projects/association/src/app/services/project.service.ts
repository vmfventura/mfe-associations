import {EventEmitter, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Project} from "../models/project";
import {Association} from "../models/association";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrlQ = 'http://localhost:5186/api/Project';
  private apiUrlC = 'http://localhost:5188/api/Project';
  projects = signal<Project[]>([]);

  projectSelected: Project | null = null;

  constructor(private http: HttpClient) { }

  projectUpdated = new EventEmitter<void>();

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrlQ).pipe(
      tap((projects: Project[]) => {
        this.projects.set(projects);
      })
    );
  }
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrlC, project).pipe(
      tap(() => this.projectUpdated.emit())
    );
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.apiUrlC + '/' + project.id, project).pipe(
      tap(() => this.projectUpdated.emit())
    );
  }
}
