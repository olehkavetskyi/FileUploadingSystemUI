import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService]
    });
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload file via POST request', () => {
    const formData = new FormData();
    formData.append('file', new Blob(['test data']));
    service.upload(formData).subscribe(response => {
      expect(response).toEqual('response from server');
    });
    const req = httpMock.expectOne('api/uploading');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(formData);
    req.flush('response from server');
  });
});
