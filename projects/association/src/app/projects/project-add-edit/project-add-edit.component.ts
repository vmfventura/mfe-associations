import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {ProjectsComponent} from "../projects.component";

@Component({
  selector: 'app-project-add-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './project-add-edit.component.html',
  styleUrl: './project-add-edit.component.css'
})
export class ProjectAddEditComponent implements OnInit, OnDestroy {
  formAddEditProject!: FormGroup;
  tryToSubmit: boolean = false;
  projects: Project[] = [];
  projectToEdit: Project | null = null;
  needUpdate: boolean = false;
  enableOrDisable: boolean = false;
  @Output() closeShowComponent = new EventEmitter<boolean>();


  constructor(private projectService: ProjectService,
              public formBuilder: FormBuilder,
              private projectsComponent: ProjectsComponent) {
  }


  ngOnInit() {
    this.projectsComponent.needUpdateForm.subscribe((needUpdate) => {
      if (needUpdate) {
        this.needUpdate = needUpdate;
        console.log(this.needUpdate);
        this.writeProjectToForm();
      }
    });
    this.writeProjectToForm();
  }

  ngOnDestroy() {
    this.projectService.projectSelected = null;
  }

  createFormControl(value: any, isDisabled: boolean): FormControl {
    return new FormControl({value: value, disabled: isDisabled}, Validators.required);
  }

  writeProjectToForm() {
    this.projectToEdit = this.projectService.projectSelected;
    const project = this.projectToEdit || new Project(0, "", null, null);
    const isDisabled = this.projectToEdit !== null;
    this.enableOrDisable = isDisabled;
    this.formAddEditProject = this.formBuilder.group({
      // id: this.createFormControl(project.id, isDisabled),
      name: this.createFormControl(project.name, isDisabled),
      startDate: this.createFormControl(project.startDate, isDisabled),
      endDate: this.createFormControl(project.endDate, isDisabled)
    });
  }

  onSubmit() {
    if (this.formAddEditProject.valid) {
      const project: Project = this.formAddEditProject.value;
      this.projectService.createProject(project).subscribe( {
        next: response => {
          console.log("done it projects");
        },
        error: error => {
          console.log("error");
        },
        complete: () => {
          this.projectService.projectUpdated.emit();
          this.goBack();
        }
      });
      console.log(project);
    }
  }

  goBack() {
    this.closeShowComponent.emit(false);
  }
}
