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

@Component({
  selector: 'app-associations',
  standalone: true,
  imports: [
    AssociationListComponent,
    NgForOf,
    NgIf,
    AssociationAddEditComponent,
    FilterComponent
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
    // this.filterCriteria.update(prev => ({ ...prev , filter: value}));
    // this.filterCriteria.set(value);
  }

  association: Association [] = [];
  // association: Signal<Association> = signal([]);
  private _filter: string = '';
  colaborators: Colaborator[] = [];
  projects: Project[] = [];
  filteredAssociations: AssociationInterface [] = [];
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
  // // filteredAssociations = computed (() =>
  // //   this.assoc().filter(a => a.colaboratorId.))
  // proj = this.projectService.projects;

  // filteredAssociations = computed(() =>
  //   this.assoc().filter(a => {
  //     const project = this.proj().find(p => p.id === a.projectId);
  //     if (!project) return false;
  //     return project.name.toLowerCase().includes(this.filterCriteria());
  //   })
  // );

  // fetchAssociations() {
  //   this.associationService.getAssociations()
  //     .subscribe((list: Association[]) => {
  //       // this.association = list;
  //       this.filteredAssociations = list;
  //       console.log("updated");
  //     })
  // }

  fetchAssociations() {
    let allProjects: Project[];
    let allCollaborators: Colaborator[];

    this.projectService.getProjects().subscribe((projects: Project[]) => {
      allProjects = projects;

      this.colaboratorService.getColaborators().subscribe((collaborators: Colaborator[]) => {
        allCollaborators = collaborators;

        this.associationService.getAssociations().subscribe((list: Association[]) => {
          this.filteredAssociations = list.map(association => {
            let project = allProjects.find(p => p.id === association.projectId);
            let collaborator = allCollaborators.find(c => c.id === association.colaboratorId);

            // Create a new object that conforms to the AssociationInterface
            let newAssociation: AssociationInterface = {
              associationId: association.id,
              projectName: project ? project.name : 'Unknown',
              colaboratorName: collaborator ? collaborator.name : 'Unknown',
              startDate: association.startDate,
              endDate: association.endDate,
              fundamental: association.fundamental
            };

            return newAssociation;
          });
          console.log("updated");
        });
      });
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
