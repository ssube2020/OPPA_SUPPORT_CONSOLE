import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from 'src/app/Services/pofile-management/profile-service.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  profilesToDelete!: number[];
  constructor(@Inject (MAT_DIALOG_DATA) public data: any, private profService: ProfileService) 
  {
    
    this.profilesToDelete = data.dataToDelete;
    console.log(this.profilesToDelete); 
  }

  ngOnInit(): void {
  }

  deleteProfile() {
    this.profService.deleteProfile(this.profilesToDelete).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: ()=> {
        alert('something went wrong');
      }
    });
    alert('deleted');
  }

  
}
