import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { JavaContentUpdateVM } from 'src/app/ViewModels/java-content-update-vm';
import { environment } from 'src/environments/environment';
//import { JavaContentUpdateDTO } from 'src/app/models/java-content-update-dto';


@Injectable({
  providedIn: 'root'
})

export class JavaContentUpdateService {

  apiUrl: string = environment.apiHostUrl; 
  ContentUpdateVmdata! : JavaContentUpdateVM;
  //javaContentUpdateDTO! : JavaContentUpdateDTO;
  constructor(private http: HttpClient) { }

  getJavaContentUpdate() : Observable<any> {
    return this.http.get(this.apiUrl+"/JavaUpdate/ContentUpdate");
  }

  UpdateJavaContnet(dtoToPass: any) : Observable<any> {
    return this.http.post(this.apiUrl+"/JavaUpdate/ContentUpdate", dtoToPass);
    
  }

  // getTests() : Observable<any> {
  //   console.log("tested");
  //   return this.http.get("https://localhost:7203/Home/GetTest");
  // }

}
