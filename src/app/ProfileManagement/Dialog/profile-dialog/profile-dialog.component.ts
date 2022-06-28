import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { elementAt } from 'rxjs';
import { AddProfileDTO } from 'src/app/models/profileManagement/addProfileDto';
import { ProfileService } from 'src/app/Services/pofile-management/profile-service.service';
import { ProductIdAndName } from 'src/app/ViewModels/ProductIdAndName';
import { ProfileIdAndName } from 'src/app/ViewModels/ProfileIdAndNameVm';

//import { ProfilemanagementComponent } from '../../profilemanagement/profilemanagement.component';


@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  
  @Input() profIdsList!: ProfileIdAndName[];
  @Input() prodIdsList!: ProductIdAndName[];
  @Input() teststr!: string;
  selectedProfileId!: number;
  selectedProductId!: number;
  addProfdto: AddProfileDTO = {
    profileId : 0,
    productId : 0
  }

  @Input() childProperty!: string;
  constructor(public dialogRef: MatDialogRef<ProfileDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private profService: ProfileService)
  {
    this.profIdsList = data.profiles;
    this.prodIdsList = data.products;
    console.log(this.prodIdsList);

  }

  ngOnInit(): void {
  }

  selectOption(event: any) {
    var target = event.target;
    var idAttr = target.attributes.id;
    var targetId = idAttr.nodeValue;
    var CurrentNumber = event.target.value;
    console.log(CurrentNumber);
    if(targetId=="profile_id") {
      this.selectedProfileId = CurrentNumber;
    }
    if(targetId=="product_id") {
      this.selectedProductId = CurrentNumber;
    }
    console.log(this.selectedProductId);
    console.log(this.selectedProfileId);
  }

  addProduct() { 
    this.addProfdto.profileId = this.selectedProfileId;
    this.addProfdto.productId = this.selectedProductId;
    //alert(this.addProfdto.profileId + this.addProfdto.productId);
    console.log(this.addProfdto);
    this.profService.addProfile(this.addProfdto).subscribe({
      next: (data) => {
        if(data) {
          alert('პროდუქტი დაემატა წარმატებით');
        }
        error: (err: any) => {
          alert(err);
        }
      }
    });
  }


}
