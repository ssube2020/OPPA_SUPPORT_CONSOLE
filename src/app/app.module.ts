import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './JavaUpdate/content/content.component';
import { SoftComponent } from './JavaUpdate/soft/soft.component';
import { TerminalSearchComponent } from './JavaUpdate/terminal-search/terminal-search.component';
import { ProfilemanagementComponent } from './ProfileManagement/profilemanagement/profilemanagement.component';
import { DeleteuserComponent } from './DeleteUser/deleteuser/deleteuser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ProfileDialogComponent } from './ProfileManagement/Dialog/profile-dialog/profile-dialog.component';
import { DeleteDialogComponent } from './ProfileManagement/Dialog/delete-dialog/delete-dialog.component';
import { DeleteAllDialogComponent } from './ProfileManagement/Dialog/delete-all-dialog/delete-all-dialog.component';
import { AuthComponent } from './Authorization/auth/auth.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    SoftComponent,
    TerminalSearchComponent,
    ProfilemanagementComponent,
    DeleteuserComponent,
    ProfileDialogComponent,
    DeleteDialogComponent,
    DeleteAllDialogComponent,
    AuthComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
