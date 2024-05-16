import {Component, computed, EventEmitter, OnInit, Output, Signal, signal} from '@angular/core';
import {AssociationListComponent} from "./association-list/association-list.component";
import {Association} from "../models/association";
import {AssociationsService} from "../services/associations.service";
import {NgForOf, NgIf} from "@angular/common";
import {AssociationAddEditComponent} from "./association-add-edit/association-add-edit.component";
import {Colaborator} from "../models/colaborator";
import {Project} from "../models/project";
import {ProjectService} from "../services/project.service";
import {ColaboratorService} from "../services/colaborator.service";
import {FilterComponent} from "../shared-components/filter.component";
import {AssociationInterface} from "../models/association-interface";
import {forkJoin} from "rxjs";
import {FindTestsPlugin} from "@angular-devkit/build-angular/src/builders/karma/find-tests-plugin";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-associations',
  standalone: true,
  imports: [
    AssociationListComponent,
    NgForOf,
    NgIf,
    AssociationAddEditComponent,
    FilterComponent,
    FormsModule
  ],
  templateUrl: './associations.component.html',
  styleUrl: './associations.component.css'
})
export class AssociationsComponent implements OnInit {
  get filter(): string {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value;
    // this.filterCriteria.update(prev => {
    //   return {...prev, filter: value};
    // });
    this.filterCriteria.set(value);
  }

  association: Association [] = [];
  // associationInter: Signal<AssociationInterface[]> = signal([]);
  associationI = signal<AssociationInterface[]>([]);
  private _filter: string = '';
  everything: any;
  colaborators: Colaborator[] = [];
  projects: Project[] = [];
  // filteredAssociations: AssociationInterface [] = [];
  componentMustBeShown: boolean = false;
  @Output() needUpdateForm = new EventEmitter<boolean>();

  ngOnInit() {
    this.colaboratorService.getColaborators().subscribe(colaborators => {
      this.colaborators = colaborators;
    });

    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  constructor(private associationService: AssociationsService,
              private colaboratorService: ColaboratorService,
              private projectService: ProjectService) {
    this.fetchAssociations();
    this.associationService.associationUpdated.subscribe(() => this.fetchAssociations());
  }

  filterCriteria = signal<string>('');
  assoc = this.associationService.associations;
  proj = this.projectService.projects;
  colab = this.colaboratorService.colaborators;

  filteredAssociationsF = computed(() => {
    const filter = this.filterCriteria().toLowerCase();
    return this.assoc().filter(a => {
      const project = this.proj().find(p => p.id === a.projectId);
      const colab = this.colab().find(c => c.id === a.colaboratorId);
      if (!project || !colab) {
        return false;
      }
      return colab.name.toLowerCase().includes(filter) || project.name.toLowerCase().includes(filter);
    });
  });

  fetchAssociations() {
    forkJoin({
      projects: this.projectService.getProjects(),
      colaborators: this.colaboratorService.getColaborators(),
      associations: this.associationService.getAssociations()
    }).subscribe({
      next: value => {
        this.everything = value.associations.map(association => {
          let project = value.projects.find(p => p.id === association.projectId);
          let colaborator = value.colaborators.find(c => c.id === association.colaboratorId);

          let newAssociation: AssociationInterface = {
            associationI: association,
            projectName: project ? project.name : 'Unknown',
            colaboratorName: colaborator ? colaborator.name : 'Unknown'
          };
          return newAssociation;
        });
      }
    });
  }


  showAddComponent() {
    this.componentMustBeShown = !this.componentMustBeShown;
  }

  cleanBoxes() {
    this.fetchAssociations();
  }

  openEditComponent($event: boolean) {
    // console.log(this.componentMustBeShown);
    if (!this.componentMustBeShown) {
      this.showAddComponent();
      this.needUpdateForm.emit(true);
    } else {
      this.needUpdateForm.emit(true);
    }
  }

  closeAddComponent($event: boolean) {
    // this.projectDetailId = null;
    // this.enableEditComponent = false;
    this.showAddComponent();
    // this.fetchProjects();
  }
}
