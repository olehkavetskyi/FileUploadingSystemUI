import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl = 'api/';

  constructor(private http: HttpClient) { }
  upload(data: FormData) {
    return this.http.post(this.apiUrl + 'uploading', data);
  }
}
