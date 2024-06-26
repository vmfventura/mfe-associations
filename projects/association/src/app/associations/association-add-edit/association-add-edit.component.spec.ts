import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AssociationAddEditComponent } from './association-add-edit.component';
import { AssociationsService } from '../../services/associations.service';
import { ColaboratorService } from '../../services/colaborator.service';
import { ProjectService } from '../../services/project.service';
import { Subject } from 'rxjs';
import {AssociationsComponent} from "../associations.component";

describe('AssociationAddEditComponent', () => {
  let component: AssociationAddEditComponent;
  let fixture: ComponentFixture<AssociationAddEditComponent>;
  let needUpdateFormSubject = new Subject<boolean>();
  let mockAssociationsComponent = {
    needUpdateForm: needUpdateFormSubject.asObservable()
  };
  let mockAssociationsService: {
    associationSelected: null,
    createAssociation: jasmine.Spy,
    associationUpdated: { emit: jasmine.Spy } };
  let mockColaboratorService = {
    getColaborators: jasmine.createSpy('getColaborators').and.returnValue(of([]))
  };

  let mockProjectService = {
    getProjects: jasmine.createSpy('getProjects').and.returnValue(of([]))
  };

  beforeEach(async () => {
    mockAssociationsService = {
      associationSelected: null,
      createAssociation: jasmine.createSpy('createAssociation').and.returnValue(of({})),
      associationUpdated: { emit: jasmine.createSpy('emit') }
    };

    mockColaboratorService = {
      getColaborators: jasmine.createSpy('getColaborators').and.returnValue(of([]))
    };

    mockProjectService = {
      getProjects: jasmine.createSpy('getProjects').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: AssociationsService, useValue: mockAssociationsService },
        { provide: ColaboratorService, useValue: mockColaboratorService },
        { provide: ProjectService, useValue: mockProjectService },
        { provide: AssociationsComponent, useValue: mockAssociationsComponent } // Provide AssociationsComponent here
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formAddEditAssociation).toBeTruthy();
    expect(mockColaboratorService.getColaborators).toHaveBeenCalled();
    expect(mockProjectService.getProjects).toHaveBeenCalled();
  });

  it('should emit closeShowComponent event on goBack', () => {
    spyOn(component.closeShowComponent, 'emit');
    component.goBack();
    expect(component.closeShowComponent.emit).toHaveBeenCalledWith(false);
  });

  it('should submit form on onSubmit', () => {
    component.formAddEditAssociation = component.formBuilder.group({
      colaboratorId: [1],
      projectId: [1],
      startDate: ['2024-01-01'],
      endDate: ['2024-02-01'],
      fundamental: [false],
    });
    component.onSubmit();
    expect(mockAssociationsService.createAssociation).toHaveBeenCalled();
  });
});
