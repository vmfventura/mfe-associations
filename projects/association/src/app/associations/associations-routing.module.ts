import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AssociationListComponent} from "./association-list/association-list.component";

const routes: Routes = [
  { path: 'association-list', component: AssociationListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationsRoutingModule { }
