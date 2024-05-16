// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { AssociationsComponent } from './associations.component';
//
// describe('AssociationsComponent', () => {
//   let component: AssociationsComponent;
//   let fixture: ComponentFixture<AssociationsComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AssociationsComponent]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(AssociationsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AssociationsComponent } from './associations.component';
import { AssociationsService } from '../services/associations.service';
import { ColaboratorService } from '../services/colaborator.service';
import { ProjectService } from '../services/project.service';
import { of } from 'rxjs';

describe('AssociationsComponent', () => {
  let component: AssociationsComponent;
  let fixture: ComponentFixture<AssociationsComponent>;

  let mockAssociationsService = {
    associations: of([]),
    associationUpdated: { subscribe: jasmine.createSpy('subscribe') },
    getAssociations: jasmine.createSpy('getAssociations').and.returnValue(of([]))
  };

  let mockColaboratorService = {
    getColaborators: jasmine.createSpy('getColaborators').and.returnValue(of([]))
  };

  let mockProjectService = {
    getProjects: jasmine.createSpy('getProjects').and.returnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AssociationsService, useValue: mockAssociationsService },
        { provide: ColaboratorService, useValue: mockColaboratorService },
        { provide: ProjectService, useValue: mockProjectService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch associations on ngOnInit', () => {
    component.ngOnInit();
    expect(mockAssociationsService.getAssociations).toHaveBeenCalled();
    expect(mockColaboratorService.getColaborators).toHaveBeenCalled();
    expect(mockProjectService.getProjects).toHaveBeenCalled();
  });

  it('should toggle componentMustBeShown on showAddComponent', () => {
    component.showAddComponent();
    expect(component.componentMustBeShown).toBeTrue();
    component.showAddComponent();
    expect(component.componentMustBeShown).toBeFalse();
  });

  it('should fetch associations on cleanBoxes', () => {
    component.cleanBoxes();
    expect(mockAssociationsService.getAssociations).toHaveBeenCalled();
  });

  it('should toggle componentMustBeShown and emit needUpdateForm on openEditComponent', () => {
    spyOn(component.needUpdateForm, 'emit');
    component.openEditComponent(true);
    expect(component.componentMustBeShown).toBeTrue();
    expect(component.needUpdateForm.emit).toHaveBeenCalledWith(true);
  });

  it('should toggle componentMustBeShown on closeAddComponent', () => {
    component.closeAddComponent(true);
    expect(component.componentMustBeShown).toBeFalse();
  });
});
