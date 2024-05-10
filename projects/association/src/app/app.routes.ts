import {Routes} from '@angular/router';
import {AssociationsComponent} from "./associations/associations.component";
import {AssociationAddEditComponent} from "./associations/association-add-edit/association-add-edit.component";

export const routes: Routes = [
  {
    path: 'association/associations', loadComponent: () => AssociationsComponent
  },
  { path: 'association/associations', loadChildren: () => import('./associations/associations.module').then(m => m.AssociationsModule) },
  {
    path: 'association/details/:id', component: AssociationAddEditComponent
  },
  {
    path: '',
    loadChildren: () => import('../../association-main/association-main.module').then((m) => m.AssociationMainModule)
  },

];
