import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataDto } from 'src/app/models/userManagement/userDataDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementServiceService {

  apiUrl: string = environment.apiHostUrl; 

  constructor(private http: HttpClient) { }

  deleteUser(data: UserDataDto) {
    return this.http.post<UserDataDto>(this.apiUrl+"/UserManagement/Delete", data);
  }

}
