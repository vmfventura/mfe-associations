import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css'
})
export class ProjectViewComponent {
  @Input() project!: Project;
  @Output() enableEditComponent = new EventEmitter<boolean>();
  @Output() projectSelected = new EventEmitter<Project>();
  @Output() closeEditShowComponent = new EventEmitter<boolean>();

  constructor(private projectService: ProjectService) { }
  sendEdit(){
    this.projectService.projectSelected = this.project;
    this.enableEditComponent.emit(true);
    this.sendInfo();
  }
  sendInfo() {
    this.projectSelected.emit(this.project)
    this.closeEditShowComponent.emit(true);
    console.log('Project Association sended:', this.project);
  }
}
