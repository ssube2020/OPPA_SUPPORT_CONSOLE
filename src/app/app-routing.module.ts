import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './Authorization/auth/auth.component';
import { DeleteuserComponent } from './DeleteUser/deleteuser/deleteuser.component';
import { ContentComponent } from './JavaUpdate/content/content.component';
import { SoftComponent } from './JavaUpdate/soft/soft.component';
import { TerminalSearchComponent } from './JavaUpdate/terminal-search/terminal-search.component';
import { ProfilemanagementComponent } from './ProfileManagement/profilemanagement/profilemanagement.component';

const routes: Routes = [
  { path: 'content', component: ContentComponent },
  { path: 'soft', component: SoftComponent },
  { path: 'terminalsearch', component: TerminalSearchComponent },
  { path: 'profilemanagement', component: ProfilemanagementComponent },
  { path: 'deleteuser', component: DeleteuserComponent },
  { path: 'soft', component: SoftComponent },
  { path: '', component: AuthComponent },
  //{ path: '', redirectTo: 'http://192.168.90.222:8080/Home/LogIn', pathMatch: 'full'}
];

// const authRoute: Routes = [
//   { path: 'auth', component: AuthComponent },
//   { path: '', redirectTo: '/auth', pathMatch: 'full'}
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
 

