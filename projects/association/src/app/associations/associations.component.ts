import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges
} from '@angular/core';
import {AssociationListComponent} from "./association-list/association-list.component";
import {AssociationsService} from "../services/associations.service";
import {AssociationAddEditComponent} from "./association-add-edit/association-add-edit.component";
import {ProjectService} from "../services/project.service";
import {ColaboratorService} from "../services/colaborator.service";
import {FilterComponent} from "../shared-components/filter.component";
import {AssociationInterface} from "../models/association-interface";
import {forkJoin} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Project} from "../models/project";

@Component({
  selector: 'app-associations',
  standalone: true,
  imports: [
    AssociationListComponent,
    AssociationAddEditComponent,
    FilterComponent,
    FormsModule
  ],
  templateUrl: './associations.component.html',
  styleUrl: './associations.component.css'
})
export class AssociationsComponent {
  projectSelected: Project | null = null;
  get filterEndDate(): Date | null {
    return this._filterEndDate;
  }

  set filterEndDate(value: Date | null) {
    this._filterEndDate = value;
    this.filterCriteriaEndDate.set(value);
  }
  get filterStartDate(): Date | null {
    return this._filterStartDate;
  }

  set filterStartDate(value: Date | null) {
    this._filterStartDate = value;
    this.filterCriteriaStartDate.set(value);
  }
  get filter(): string {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value;
    this.filterCriteria.set(value);
  }

  associationI = signal<AssociationInterface[]>([]);
  private _filter: string = '';
  private _filterStartDate: Date | null = null;
  private _filterEndDate: Date | null = null;

  componentMustBeShown: boolean = false;
  @Output() needUpdateForm = new EventEmitter<boolean>();

  @Input() projectAssociation!: EventEmitter<Project>;

  constructor(private associationService: AssociationsService,
              private colaboratorService: ColaboratorService,
              private projectService: ProjectService) {
    this.fetchAssociations();
    this.associationService.associationUpdated.subscribe(() => this.fetchAssociations());
    this.projectSelected = this.projectService.projectSelected;
    console.log("association: "+ this.projectAssociation);
  }

  filterCriteria = signal<string>('');
  // filterProjectCriteria = signal<string>('');
  filterCriteriaStartDate = signal<Date | null>(null);
  filterCriteriaEndDate = signal<Date | null>(null);
  assoc = this.associationService.associations;
  proj = this.projectService.projects;
  colab = this.colaboratorService.colaborators;

  associationsMapping = computed ( () => {
    return this.assoc().map(a => {
      const project = this.proj().find(p => p.id === a.projectId);
      const colab = this.colab().find(c => c.id === a.colaboratorId);
      const newAssociation: AssociationInterface = {
        associationI: a,
        projectName: project ? project.name : 'Unknown',
        colaboratorName: colab ? colab.name : 'Unknown'
      };
      return newAssociation;
    });
    }
  )

  filteredAssociationsF = computed(() => {
    const filter = this.filterCriteria().toLowerCase();
    const filterStartDate = this.filterCriteriaStartDate();
    const filterEndDate = this.filterCriteriaEndDate();
    const associations = this.associationsMapping();
    // const projectIds = this.projectAssociation().map(p => p.id);

    return associations.filter(a =>
      (a.colaboratorName.toLowerCase().includes(filter) ||
      (a.projectName!.toLowerCase().includes(filter) &&
        // (projectIds.includes(a.associationI.projectId)) &&
      (!filterEndDate || (a.associationI.startDate && a.associationI.startDate <= filterEndDate)) &&
      (!filterStartDate || (a.associationI.endDate && a.associationI.endDate >= filterStartDate))
    )));
  });

  fetchAssociations() {
    forkJoin({
      projects: this.projectService.getProjects(),
      colaborators: this.colaboratorService.getColaborators(),
      associations: this.associationService.getAssociations()
    }).subscribe();
  }


  showAddComponent() {
    this.componentMustBeShown = !this.componentMustBeShown;
  }

  cleanBoxes() {
    this.filterStartDate = null;
    this.filterEndDate = null;
    this.fetchAssociations();
  }

  openEditComponent($event: boolean) {
    if (!this.componentMustBeShown) {
      this.showAddComponent();
      // this.needUpdateForm.emit(true);
    }
  }

  closeAddComponent($event: boolean) {
    this.showAddComponent();
  }
}
