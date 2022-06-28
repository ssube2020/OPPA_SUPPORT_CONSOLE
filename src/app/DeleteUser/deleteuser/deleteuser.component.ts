import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserDataDto } from 'src/app/models/userManagement/userDataDto';
import { UserManagementServiceService } from 'src/app/Services/user-management/user-management-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.scss']
})
export class DeleteuserComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private managementService: UserManagementServiceService) { }

  hostUrl: string =  environment.apiHostUrl;
  deleteForm! : FormGroup;
  deleteDto!: UserDataDto;

  ngOnInit(): void {
    this.deleteForm = this.formBuilder.group({

      phoneNumber: [''],
      character: ['']

    });
  }

  deleteUser() {
    if ((this.deleteForm.value.phoneNumber.length != 9) || (this.deleteForm.value.character.length != 1)) {
      alert('შეავსეთ ფორმა სწორ ფორმატში');
      return;
    }
    this.deleteDto = this.deleteForm.value;
    this.managementService.deleteUser(this.deleteDto).subscribe({
      next: (data) => {
        alert(data.phoneNumber);
      }
    });
  }

}
