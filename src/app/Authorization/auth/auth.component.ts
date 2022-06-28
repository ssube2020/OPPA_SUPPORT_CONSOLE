import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  apiUrl: string = environment.apiHostUrl+"/Home/Index";
  //@Input() loginStatus: boolean = false;
  @Output() emitData = new EventEmitter<boolean>();
  loginStatus: boolean = false;

  @Input() error!: string | null;
  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log('{{this.apiUrl}}');
    //Router.navi
    //window.location.href = "http://localhost:19781/Home/?RedirectUrl=http://localhost:4200/content/";
    //headers: HttpHeaders = new  HttpHeaders()

    return this.http.get<any>(environment.apiHostUrl+"/Home/Index").subscribe({
      next: (data) => {
        if(data.authStatus == "unauthorized") {
          window.location.href = "http://localhost:19781/Home/?"+"RedirectUrl="+ "http://localhost:5203/Home/Index";
        } else {
          alert('avtorizebulia');
        }
      }
    });
  }

  logIn() {
    this.loginStatus = true;
    this.emitData.emit(this.loginStatus);
    //this.loginStatus = true;
    //console.log(this.componentTitle);
    //alert('works');
  }

}
