import {TestBed} from '@angular/core/testing';

import {ColaboratorService} from './colaborator.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ColaboratorService', () => {
  let service: ColaboratorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ColaboratorService]
    });
    service = TestBed.inject(ColaboratorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch colaborators', () => {
    const mockColaborators = [
      {id: 1, name: 'Colaborator 1', email: 'colab1@mail.com'},
      {id: 2, name: 'Colaborator 2', email: 'colab2@mail.com'}
    ];

    service.getColaborators().subscribe(colaborators => {
      expect(colaborators).toEqual(mockColaborators);
    });

    const req = httpMock.expectOne('https://localhost:5001/api/Colaborator');
    expect(req.request.method).toBe('GET');
    req.flush(mockColaborators);
  });

});
