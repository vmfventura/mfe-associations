import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Association} from "../../models/association";
import {AssociationsService} from "../../services/associations.service";
import {Colaborator} from "../../models/colaborator";
import {Project} from "../../models/project";
import {Router} from "@angular/router";
import {AssociationInterface} from "../../models/association-interface";

@Component({
  selector: 'app-association-list',
  standalone: true,
  imports: [],
  templateUrl: './association-list.component.html',
  styleUrl: './association-list.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})


export class AssociationListComponent {
  @Input() association!: AssociationInterface;
  @Input() colaborators!: Colaborator[];
  @Input() projects!: Project[];
  @Output() editComponentOpen = new EventEmitter<boolean>();

  constructor(private associationService: AssociationsService,
              private router: Router) {
  }

  sendAssociation() {
    this.associationService.associationSaved(this.association.associationId);
    // this.router.navigate(['/association/details', this.association.id]);
    this.editComponentOpen.emit(true);
  }

}
