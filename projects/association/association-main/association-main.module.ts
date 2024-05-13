import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../src/app/home/home.component";
import {HttpClientModule} from "@angular/common/http";
import {AssociationsComponent} from "../src/app/associations/associations.component";
import {AssociationListComponent} from "../src/app/associations/association-list/association-list.component";

export const routes : Routes  = [
  {path: '',
  component: AssociationsComponent
  },
  { path: 'associations', component: AssociationsComponent},
  { path: 'association-list', component: AssociationListComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class AssociationMainModule { }
