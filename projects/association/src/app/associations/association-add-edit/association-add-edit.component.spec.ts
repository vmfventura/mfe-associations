import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationAddEditComponent } from './association-add-edit.component';

describe('AssociationAddEditComponent', () => {
  let component: AssociationAddEditComponent;
  let fixture: ComponentFixture<AssociationAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
