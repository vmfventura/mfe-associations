import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AssociationsService} from "../../services/associations.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-association-list',
  standalone: true,
  imports: [],
  templateUrl: './association-list.component.html',
  styleUrl: './association-list.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})


export class AssociationListComponent {
  @Input() association!: any;
  @Output() editComponentOpen = new EventEmitter<boolean>();

  constructor(private associationService: AssociationsService) {
  }

  sendAssociation() {
    // console.log(this.association);
    this.associationService.associationSelected = this.association.associationI ;
    // this.router.navigate(['/association/details', this.association.id]);
    this.editComponentOpen.emit(true);
  }

}
