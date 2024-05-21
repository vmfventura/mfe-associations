import {Component, computed, EventEmitter, Input, Output, signal, Signal} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {Project} from "../models/project";
import {FormGroup, FormsModule} from "@angular/forms";
import {ProjectViewComponent} from "./project-view/project-view.component";
import {ProjectAddEditComponent} from "./project-add-edit/project-add-edit.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ProjectViewComponent,
    FormsModule,
    ProjectAddEditComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  get filterProjectEndDate(): Date | null {
    return this._filterProjectEndDate;
  }

  set filterProjectEndDate(value: Date | null) {
    this._filterProjectEndDate = value;
    this.filterCriteriaEndDate.set(value);
  }
  get filterProjectStartDate(): Date | null {
    return this._filterProjectStartDate;
  }

  set filterProjectStartDate(value: Date | null) {
    this._filterProjectStartDate = value;
    this.filterCriteriaStartDate.set(value);
  }
  get filterProjects(): string {
    return this._filterProjects;
  }

  set filterProjects(value: string) {
    this._filterProjects = value;
    this.filterCriteria.set(value);
  }
  projects: Signal<Project[]> = signal([]);
  private _filterProjects: string= '';
  private _filterProjectStartDate: Date | null = null;
  private _filterProjectEndDate: Date | null = null;

  // addShowComponent: boolean = false;
  boolDetailsComponent: boolean = false;
  buttonAddVisible: boolean = true;
  @Input() projectDetailId!: Project | null;
  @Output() projectAssociation = new EventEmitter<Project>();
  @Input() closeEditComponent!: boolean;
  @Input() enableEditComponent!: boolean;
  @Output() enableOrDisable = new EventEmitter<boolean>();
  @Output() needUpdateForm = new EventEmitter<boolean>();
  @Output() projectAssociationChange = new EventEmitter<Project>();

  constructor(private projectService: ProjectService) {
    // this.filterForm = new FormGroup({
    //   filter: new FormControl(''),
    //   filterStartDate: new FormControl(''),
    //   filterEndDate: new FormControl('')
    // });

    this.fetchProjects();
    this.projectService.projectUpdated.subscribe(() => this.fetchProjects());
  }
  componentMustBeShown: boolean = false;
  filterCriteria = signal<string>('');
  filterCriteriaStartDate = signal<Date | null>(null);
  filterCriteriaEndDate = signal<Date | null>(null);
  proj = this.projectService.projects;

  filteredProjectsF = computed(() => {
    const filter = this.filterCriteria().toLowerCase();
    const filterStartDate = this.filterCriteriaStartDate();
    const filterEndDate = this.filterCriteriaEndDate();
    return this.proj().filter(p =>
      p.name!.toLowerCase().includes(filter) &&
      (!filterEndDate || (p.startDate && p.startDate <= filterEndDate)) &&
      (!filterStartDate || (p.endDate && p.endDate >= filterStartDate)));
  });

  fetchProjects() {
    this.projectService.getProjects()
      .subscribe();
  }

  showAddComponent() {
    // this.showButtonAdd();
    // this.addShowComponent = !this.addShowComponent;
    // this.enableOrDisable.emit(false);
    this.componentMustBeShown = !this.componentMustBeShown;
  }

  showDetailsComponent() {
    this.boolDetailsComponent = !this.boolDetailsComponent;
  }

  closeAddComponent($event: boolean) {
    // this.projectDetailId = null;
    // this.enableEditComponent = false;
    this.showAddComponent();
  }

  showButtonAdd() {
    this.buttonAddVisible = !this.buttonAddVisible;
  }
  editEnable($event: boolean){
    // this.enableEditComponent = $event;
    if (!this.componentMustBeShown) {
      this.showAddComponent();
      this.needUpdateForm.emit(true);
    }
  }

  projectSelected($event: Project) {
    this.projectDetailId = $event;
    if (this.enableEditComponent)
    {
      this.enableOrDisable.emit(true);
      this.showAddComponent();
    } else {
      this.projectAssociationChange.emit(this.projectDetailId);
      console.log('Project Association emits:', this.projectDetailId);
      this.showButtonAdd();
      this.showDetailsComponent();
    }
  }

  cleanBoxes() {
    // this.filter = '';
    this.filterProjectStartDate = null;
    this.filterProjectEndDate = null;
    this.fetchProjects();
  }

}
