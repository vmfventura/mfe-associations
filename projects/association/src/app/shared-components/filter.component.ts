import {Component, model} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-filter-component',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  template: `
    <div class="col-3 d-flex justify-content-center">
      <input type="text" class="form-control" id="filterName" placeholder="Filter by name" [(ngModel)]="listFilter" >
    </div>
  `
})
export class FilterComponent {
  title = 'Filter Component'
  listFilter = model('');
}
