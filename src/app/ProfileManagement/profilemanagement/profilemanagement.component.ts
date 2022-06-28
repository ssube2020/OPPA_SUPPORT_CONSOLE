import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/pofile-management/profile-service.service';
import { ProfileFilterDTO } from 'src/app/models/profileManagement/profile-filter-dto';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProfileVM } from 'src/app/ViewModels/profile-vm';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../Dialog/profile-dialog/profile-dialog.component';
import { ProfileIdAndName } from 'src/app/ViewModels/ProfileIdAndNameVm';
import { ProductIdAndName } from 'src/app/ViewModels/ProductIdAndName';
import { DeleteDialogComponent } from '../Dialog/delete-dialog/delete-dialog.component';
import { DeleteAllDialogComponent } from '../Dialog/delete-all-dialog/delete-all-dialog.component';
import { AddProfileDTO } from 'src/app/models/profileManagement/addProfileDto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profilemanagement',
  //template: `<app-profile-dialog [childProperty]="parentProperty"></app-profile-dialog>`,
  templateUrl: './profilemanagement.component.html',
  styleUrls: ['./profilemanagement.component.scss']
})
export class ProfilemanagementComponent implements OnInit {
  hostUrl: string =  environment.apiHostUrl;
  checkAll: boolean = false;
  checkSingle: boolean = false;
  enableDeleteAllButton: boolean = false;
  searchForm!: FormGroup;
  totalItems!: number;
  profileIdsList!: ProfileIdAndName[];
  productIdsList!: ProductIdAndName[];
  profilesToDelete: number[] = [];
  tableColumns: string[] = ['checkbox', 'profile', 'profileId', 'product', 'productId'];
  dataSource!: MatTableDataSource<ProfileVM>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  deleteallDto: AddProfileDTO = {
    profileId: 0,
    productId: 0
  }

  proFilterDto: ProfileFilterDTO = {
    profile: '',
    product: '',
    offset: 0,
    perPage: 10
  }

  constructor(private profService: ProfileService,private formBuilder: FormBuilder,public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.dialogComponent.test();
    this.searchForm = this.formBuilder.group({

      profileId: [''],
      productId: ['']

    });
    this.getProfiles();
  }


  getProfiles() {
    this.profService.getProfiles(this.proFilterDto).subscribe({
      next: (data) => {
        this.profileIdsList = data.profiles;
        this.productIdsList = data.products;
        //this.profilesToDelete = data.
        this.dataSource = new MatTableDataSource<ProfileVM>(data.profileList);
        this.totalItems = data.paginationInfo.totalItems;
        // console.log(data);
        // console.log(this.dataSource.data);
        console.log(this.dataSource.filteredData);
        // console.log(data.profileList);
        //console.log(this.dataSource);
      }
    })

  }

  profileSearch() {
    this.proFilterDto.product = this.searchForm.value.productId;
    this.proFilterDto.profile = this.searchForm.value.profileId;
    if(this.proFilterDto.product!='' || this.proFilterDto.profile != '' ) {
      this.enableDeleteAllButton = true;
    } else {
      this.enableDeleteAllButton = false;
    }
    this.profService.getProfiles(this.proFilterDto).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<ProfileVM>(data.profileList);
        this.totalItems = data.paginationInfo.totalItems;
        console.log(this.searchForm.value.productId);
        console.log(this.searchForm.value.profileId);
      },
      error: () => {
        alert('შეიყვანეთ Profile Id და Product Id სწორად');
      }

    })
    //console.log(this.searchForm.value);
  }


  public fetch(event?: PageEvent) {
    this.proFilterDto.offset = this.paginator.pageIndex;  
    this.proFilterDto.perPage = this.paginator.pageSize ;
    this.profService.getProfiles(this.proFilterDto)
      .subscribe({
        next: data => {
          //this.contentNames = data.contentNames;
          this.dataSource = new MatTableDataSource<ProfileVM>(data.profileList);
          this.totalItems = data.paginationInfo.totalItems;
        },
        error: () => {
          alert('მოხდა შეცდომა, კიდევ სცადეთ');
        }
      });
    return event;
  }

  openDialog(event: any): void {
    console.log('shemodis');
    var target = event.target;
    var idAttr = target.attributes.id;
    var targetId = idAttr.nodeValue;
    console.log(target);
    console.log(idAttr);
    console.log(targetId);
    if (targetId == "add-btn") {
      this.dialog.open(ProfileDialogComponent, {
        width: '500px',
        data: {
          profiles: this.profileIdsList,
          products: this.productIdsList,
        }
      });
    }
    if (targetId == "delete-btn") {
      if (this.profilesToDelete.length > 0) {
        this.dialog.open(DeleteDialogComponent, {
          width: '400px',
          data: {
            dataToDelete: this.profilesToDelete
          }
        });
      } else {
        alert('აირჩიეთ პროფილი');
      }
    }
    
  }

  openDeleteAllDialog() {
    if(this.searchForm.value.profileId != '') {
      this.deleteallDto.profileId = parseInt(this.searchForm.value.profileId);
    }
    if(this.searchForm.value.productId != '') {
      this.deleteallDto.productId = parseInt(this.searchForm.value.productId);
    }
    //this.deleteallDto.productId = parseInt(this.searchForm.value.productId);
    //console.log(this.deleteallDto);
    // parseInt(this.searchForm.value.productId);
    // console.log((this.searchForm.value));
    this.dialog.open(DeleteAllDialogComponent, {
      width: '400px',
      data: {
        formValues: this.deleteallDto
      }
    });
  }

  checkUncheckAll() {
    //console.log(this.dataSource.filteredData.map(x=>x.id));
    this.checkAll = !this.checkAll;
    this.checkSingle = !this.checkSingle;
    if(this.checkAll) {
      this.profilesToDelete =  <Array<number>>this.dataSource.filteredData.map(x=>x.id);
      console.log(this.profilesToDelete);
      //this.profilesToDelete = this.dataSource.filteredData;
    } else {
      this.profilesToDelete = [];
      console.log(this.profilesToDelete);
    }
  }


  checkUncheckSingle(event: any) {
    var curId  = parseInt(event.target.value);

    if(event.target.checked) {
      this.profilesToDelete.push(curId);
      console.log(this.profilesToDelete);
    } else {
      const index = this.profilesToDelete.indexOf(curId, 0);
      console.log(index);
      if (index > -1) {
        this.profilesToDelete.splice(index, 1);
        console.log(this.profilesToDelete);
      }
    }
  }

}


