import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AssociationListComponent } from './association-list.component';
import { AssociationsService } from '../../services/associations.service';
import { Router } from '@angular/router';

describe('AssociationListComponent', () => {
  let component: AssociationListComponent;
  let fixture: ComponentFixture<AssociationListComponent>;
  let mockAssociationsService = {
    associationSelected: null
  };
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AssociationsService, useValue: mockAssociationsService },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssociationListComponent);
    component = fixture.componentInstance;
    component.association = {
      associationI: {
        id: 1,
        projectId: 1,
        colaboratorId: 1,
        startDate: '2022-01-01',
        endDate: '2022-12-31',
        fundamental: true
      },
      projectName: 'Test Project',
      colaboratorName: 'Test Colaborator'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display association details', () => {
    const projectName = fixture.debugElement.query(By.css('#projectName')).nativeElement.textContent;
    expect(projectName).toContain('Test Project');

    const colaboratorName = fixture.debugElement.query(By.css('#colabName')).nativeElement.textContent;
    expect(colaboratorName).toContain('Test Colaborator');

    const startDate = fixture.debugElement.query(By.css('#assocStartDate')).nativeElement.textContent;
    expect(startDate).toContain('2022-01-01');

    const endDate = fixture.debugElement.query(By.css('#assocEndDate')).nativeElement.textContent;
    expect(endDate).toContain('2022-12-31');

    const fundamental = fixture.debugElement.query(By.css('#fundamentalCheckbox')).nativeElement.checked;
    expect(fundamental).toBeTrue();
  });

  it('should emit editComponentOpen on sendAssociation', () => {
    spyOn(component.editComponentOpen, 'emit');
    component.sendAssociation();
    expect(mockAssociationsService.associationSelected).toBe(component.association.associationI);
    expect(component.editComponentOpen.emit).toHaveBeenCalledWith(true);
  });
});
