import {TestBed} from '@angular/core/testing';

import {ProjectService} from './project.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch projects', () => {
    const mockProjects = [
      {id: 1, name: 'Project 1', description: 'Description 1', startDate: new Date('2022-01-01'), endDate: new Date('2022-12-31'), isSavedInDB: true},
      {id: 2, name: 'Project 2', description: 'Description 2', startDate: new Date('2022-01-01'), endDate: new Date('2022-12-31'), isSavedInDB: true}
    ];

    service.getProjects().subscribe(projects => {
      expect(projects).toEqual(mockProjects);
    });

    const req = httpMock.expectOne('http://localhost:5186/api/Project');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });

});
