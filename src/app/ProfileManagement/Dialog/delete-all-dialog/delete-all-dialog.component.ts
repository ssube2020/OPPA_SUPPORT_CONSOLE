import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProfileDTO } from 'src/app/models/profileManagement/addProfileDto';
import { DeleteAllDto } from 'src/app/models/profileManagement/deleteAllProfileDto';
import { ProfileService } from 'src/app/Services/pofile-management/profile-service.service';

@Component({
  selector: 'app-delete-all-dialog',
  templateUrl: './delete-all-dialog.component.html',
  styleUrls: ['./delete-all-dialog.component.scss']
})
export class DeleteAllDialogComponent implements OnInit {
  deleteAllDto!: AddProfileDTO;
  constructor(@Inject (MAT_DIALOG_DATA) public data: any, private profService: ProfileService) {
    console.log(data); 
    this.deleteAllDto = data.formValues;
    console.log(this.deleteAllDto);
    // console.log(typeof(this.deleteAllDto.profileId));
    // console.log(this.deleteAllDto.productId);
    //console.log(typeof(this.deleteAllDto));
  }

  ngOnInit(): void {
  }


  deleteAllProfile() {
    console.log(this.deleteAllDto);
    console.log(this.deleteAllDto.profileId);
    console.log(this.deleteAllDto.productId);
    //console.log(typeof(this.deleteAllDto.profileId));
    this.profService.deleteFilteredProfiles(this.deleteAllDto).subscribe({
      next: (data) => {
        alert(data.comment);
      }
    });
  }

}
