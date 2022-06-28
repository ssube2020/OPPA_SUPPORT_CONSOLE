import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProfileFilterDTO } from 'src/app/models/profileManagement/profile-filter-dto';
import { AddProfileDTO } from 'src/app/models/profileManagement/addProfileDto';
import { DeleteAllDto } from 'src/app/models/profileManagement/deleteAllProfileDto';
import { DeleteAllResponse } from 'src/app/models/profileManagement/deleteAllResponseDto';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  apiUrl: string = environment.apiHostUrl;

  constructor(private http: HttpClient) { }


  getProfiles(data: ProfileFilterDTO) {
    return this.http.post<any>(this.apiUrl+"/Profile/Index", data);
  }

  addProfile(data: AddProfileDTO) {
    return this.http.post<any>(this.apiUrl+"/Profile/Create", data);
  }

  deleteProfile(data: number[]) {
    return this.http.post(this.apiUrl+"/Profile/Delete",data);
  }

  deleteFilteredProfiles(data: AddProfileDTO) {
    return this.http.post<DeleteAllResponse>(this.apiUrl+"/Profile/DeleteAll", data);
  }


}
