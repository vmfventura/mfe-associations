import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Association} from "../../models/association";
import {Colaborator} from "../../models/colaborator";
import {ColaboratorService} from "../../services/colaborator.service";
import {AssociationsService} from "../../services/associations.service";
import {ProjectService} from "../../services/project.service";
import {Project} from "../../models/project";
import {AssociationsComponent} from "../associations.component";

@Component({
  selector: 'app-association-add-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './association-add-edit.component.html',
  styleUrl: './association-add-edit.component.css'
})
export class AssociationAddEditComponent implements OnInit, OnDestroy {
  formAddEditAssociation!: FormGroup;
  tryToSubmit: boolean = false;
  associations: Association [] = [];
  colaborators: Colaborator [] = [];
  projects: Project[] = [];
  associationToEdit: Association | null = null;
  needUpdate: boolean = false;
  enableOrDisable: boolean = false;
  @Output() closeShowComponent = new EventEmitter<boolean>();

  constructor(public associationService: AssociationsService,
              private colaboratorService: ColaboratorService,
              private projectService: ProjectService,
              public formBuilder: FormBuilder,
              private associationsComponent: AssociationsComponent) {
  }

  ngOnInit() {
    this.getColaboratorsName();
    this.getProjectsName();
    this.associationsComponent.needUpdateForm.subscribe((needUpdate) => {
      if (needUpdate) {
        this.needUpdate = needUpdate;
        console.log(this.needUpdate)
        this.writeAssociationToForm();
      }
    });
    this.writeAssociationToForm();
  }

  private createFormControl(value: any, isDisabled: boolean): FormControl {
    return new FormControl({value: value, disabled: isDisabled}, Validators.required);
  }
  writeAssociationToForm() {
    this.associationToEdit = this.associationService.associationSelected;
    const association = this.associationToEdit || new Association(0, 0, 0, null, null, false);
    const isDisabled = this.associationToEdit !== null;
    this.enableOrDisable = isDisabled;
    this.formAddEditAssociation = this.formBuilder.group({
      // id: new FormControl(association.id),
      colaboratorId: this.createFormControl(association.colaboratorId, isDisabled),
      projectId: this.createFormControl(association.projectId, isDisabled),
      startDate: this.createFormControl(association.startDate, isDisabled),
      endDate: this.createFormControl(association.endDate, isDisabled),
      fundamental: this.createFormControl(association.fundamental, isDisabled),
    });
  }

  ngOnDestroy() {
    this.associationService.associationSelected = null;
  }

  getColaboratorsName() {
    this.colaboratorService.getColaborators().subscribe(colaborators => {
      this.colaborators = colaborators;
    });
  }

  getProjectsName() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  goBack() {
    this.closeShowComponent.emit(false);
  }

  onSubmit() {
    console.log(this.formAddEditAssociation.valid);
    if (this.formAddEditAssociation.valid) {
      const association: Association = this.formAddEditAssociation.value;
      this.associationService.createAssociation(association).subscribe({
        next: response => {
          console.log("done it");
        },
        error: error => {
          console.log("error");
        },
        complete: () => {
          this.associationService.associationUpdated.emit();
          this.goBack();
        }
      });
      console.log(association);
    }
  }
}
