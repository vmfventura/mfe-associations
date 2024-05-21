import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AssociationsComponent} from "../associations/associations.component";
import {ProjectsComponent} from "../projects/projects.component";
import {Project} from "../models/project";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    AssociationsComponent,
    ProjectsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  projectAssociation!: Project | null;
  @Output() projectAssociationChange = new EventEmitter<Project>();

  onProjectAssociationChange(projects: Project) {
    this.projectAssociation = projects;
    console.log('Project Association updated:', this.projectAssociation);
    this.projectAssociationChange.emit(this.projectAssociation);
  }

}
