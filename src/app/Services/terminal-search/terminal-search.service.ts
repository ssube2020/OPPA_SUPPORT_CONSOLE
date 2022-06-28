import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { changeUpdateDto } from 'src/app/models/javaUpdateModels/change-update-dto';
import { TerminalSearchFilterDTO } from 'src/app/models/javaUpdateModels/terminalSearchFilterDTO';


@Injectable({
  providedIn: 'root'
})
export class TerminalSearchService {
  apiUrl: string = environment.apiHostUrl;
  terminalSearchMethod: string = "/JavaUpdate/TerminalSearch";
  changeUpdateMethod: string = "/JavaUpdate/ChangeUpdate";
  geenrateExcelMethod: string = "/JavaUpdate/GenerateExcel";

  constructor(private http: HttpClient) { }

  getTerminalSearch(data: any) {
    // console.log(data);
    // console.log(offset);
    // console.log(perPage);
    // console.log(environment.apiUrl+this.methodName);
    // const params = new HttpParams()
    //   .set('offset', offset)
    //   .set('perPage', perPage);
    //   console.log( params.toString() );

  //   let options = new RequestOptions({
  //     headers: this._getHeaders()
  //  });
   //return this.http.post(url, JSON.stringify(postdata),options).map(res => res.json());

    return this.http.post<any>(this.apiUrl+this.terminalSearchMethod, data);
  }

  changeUpdate(data: changeUpdateDto) {
    return this.http.post<any>(this.apiUrl+this.changeUpdateMethod,data);
  }

  generateExcell(data: TerminalSearchFilterDTO) {
    return this.http.post<File>(this.apiUrl+this.geenrateExcelMethod, data);
  }


}
