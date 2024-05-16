import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AssociationsService } from './associations.service';
import { Association } from '../models/association';

describe('AssociationsService', () => {
  let service: AssociationsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AssociationsService]
    });

    service = TestBed.inject(AssociationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch associations', () => {
    const mockAssociations: Association[] = [
      { id: 1, projectId: 1, colaboratorId: 1, startDate: new Date('2022-01-01'), endDate: new Date('2022-12-31'), fundamental: true, isSavedInDB: true},
      { id: 2, projectId: 2, colaboratorId: 2, startDate: new Date('2022-01-01'), endDate: new Date('2022-12-31'), fundamental: false, isSavedInDB: true }
    ];

    service.getAssociations().subscribe(associations => {
      expect(associations).toEqual(mockAssociations);
    });

    const req = httpMock.expectOne('https://localhost:5041/api/Association');
    expect(req.request.method).toBe('GET');
    req.flush(mockAssociations);
  });

  it('should create an association', () => {
    const newAssociation: Association = { id: 3, projectId: 3, colaboratorId: 3, startDate: new Date('2022-01-01'), endDate: new Date('2022-12-31'), fundamental: true, isSavedInDB: true};

    service.createAssociation(newAssociation).subscribe(association => {
      expect(association).toEqual(newAssociation);
    });

    const req = httpMock.expectOne('https://localhost:5031/api/Association');
    expect(req.request.method).toBe('POST');
    req.flush(newAssociation);
  });
});
