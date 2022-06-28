import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JavaSoftUpdateService {

  apiUrl: string =  environment.apiHostUrl;

  constructor(private http: HttpClient) { }

  getSoftContent() {
    return this.http.get(this.apiUrl+"/JavaUpdate/SoftUpdate");
  }

  updateSoftContent(data: any) {
    return this.http.post(this.apiUrl+"/JavaUpdate/SoftUpdate", data);
  }

}
