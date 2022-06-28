import { Component, OnInit, ViewChild } from '@angular/core';
import { TerminalSearchFilterDTO } from 'src/app/models/javaUpdateModels/terminalSearchFilterDTO';
import { TerminalSearchService } from 'src/app/Services/terminal-search/terminal-search.service';
import { ActivatedRoute } from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { elementAt } from 'rxjs';
import { changeUpdateDto } from 'src/app/models/javaUpdateModels/change-update-dto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-terminal-search',
  templateUrl: './terminal-search.component.html',
  styleUrls: ['./terminal-search.component.scss']
})
export class TerminalSearchComponent implements OnInit {
  
  hostUrl: string =  environment.apiHostUrl;
  lstLength: number = 0;
  contentNames!: string[];
  terminalSearchForm!: FormGroup;
  offset!: number;
  perPage!: number;
  checkAll: boolean = false;
  checkSingle: boolean = false;
  enableType: string = "enable-update";
  disableType: string = "disable-update";
  enableUpdateFlashMessage: boolean = false;
  disableUpdateFlashMessage: boolean = false;
  couldnotUpdate: boolean = false;
  unknownError: boolean = false;
  changeUpdateModel: changeUpdateDto = {
    terminals: [],
    updatetype : "test"
  }
  filter: TerminalSearchFilterDTO = {
    checkBox: false,
    currentContent: "",
    currentSoft: "",
    contentName: "",
    terminalName: "",
    offset: 0,
    perPage: 10
  }

  displayedColumns: string[] = ['checkBox' ,'updateenabled', 'reqDate', 'terminalName', 'softVersion', 'contentVersion', 'cashLastDate', 'coinLastDate'];
  dataSource! :MatTableDataSource<TerminalSearchFilterDTO>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  // export interface PeriodicElement {
  //   name: string;
  //   position: number;
  //   weight: number;
  //   symbol: string;
  // }

  // const ELEMENT_DATA: []

  constructor(private searchService: TerminalSearchService, private _activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    //alert(this.hostUrl);

    this.terminalSearchForm = this.formBuilder.group({

      currentContent: [''],
      currentSoft: [''],
      terminalName: [''],
      contentName: [''],
      offset: 0,
      perPage: 10

    });
    this.getTerminalSearchData();
  }

  getTerminalSearchData() {
    
    console.log(this.filter);
    this.searchService.getTerminalSearch(this.filter).subscribe({
      next: (data: any) => {
        //console.log(data)
        this.contentNames = data.contentNames;
        this.dataSource = new MatTableDataSource<TerminalSearchFilterDTO>(data.terminalSearchList);
        this.lstLength = data.paginationInfo.totalItems;
        console.log(this.dataSource);
        //console.log(this.dataSource.data);
        //this.dataSource.paginator = this.paginator;

      },
      error: (err: any) => {
        console.log(err);
      }
    });

    this.checkAll = false;
    this.checkSingle = false;
  }

  terminalSearch() {
    if(this.terminalSearchForm.valid) {
      this.filter.contentName = this.terminalSearchForm.value.contentName;
      this.filter.currentSoft = this.terminalSearchForm.value.currentSoft;
      this.filter.terminalName = this.terminalSearchForm.value.terminalName;
      this.filter.currentContent = this.terminalSearchForm.value.currentContent;
      this.filter.offset = 0;
      this.filter.perPage = 10;

      this.searchService.getTerminalSearch(this.filter).subscribe({
        next: (data: any) => {
          console.log(data);
          this.contentNames = data.contentNames;
          this.dataSource = new MatTableDataSource(data.terminalSearchList);
          this.lstLength = data.paginationInfo.totalItems;
          //console.log(this.dataSource.data);
          //this.dataSource.paginator = this.paginator;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }else {
      alert('შეავსეთ ყველა ველი');
    }
  }

  public petch(event?: PageEvent) {
    this.filter.offset = this.paginator.pageIndex;
    this.filter.perPage = this.paginator.pageSize;
    this.searchService.getTerminalSearch(this.filter)
      .subscribe({
          next: data => {
            this.contentNames = data.contentNames;
            this.dataSource = new MatTableDataSource<TerminalSearchFilterDTO>(data.terminalSearchList);
            this.lstLength = data.paginationInfo.totalItems;
          },
          error: () => {
            alert('მოხდა შეცდომა, კიდევ სცადეთ');
          }
        });
    return event;
  }

  checkUncheck() {
    this.checkAll = !this.checkAll;
    this.checkSingle = !this.checkSingle;
  }

  changeUpdate(type: string) {

    if(type=="enable-update") {
      //console.log(this.checkAll);
      if(this.checkAll) {
        //console.log('Shemovida');
        this.changeUpdateModel.terminals = <Array<string>>this.dataSource.filteredData.filter(x=>x.updateenabled == "0").map(k=>k.terminalName);
      }
    } else if(type=="disable-update") {
      if(this.checkAll) {
        this.changeUpdateModel.terminals = <Array<string>>this.dataSource.filteredData.filter(x=>x.updateenabled == "1").map(k=>k.terminalName);
      }
      
    }
    this.changeUpdateModel.updatetype = type;
    
    this.searchService.changeUpdate(this.changeUpdateModel).subscribe({
      next: (data) => {
        console.log(data.enabledOrDisabled);
        console.log(data.type);
        if(data.enabledOrDisabled && data.type=="enabled") {
          this.enableUpdateFlashMessage = true;
          setTimeout(() => {
            this.enableUpdateFlashMessage = false;
          }, 2000);
        } else if(!data.enabledOrDisabled && data.type=="notEnabled") {
          this.couldnotUpdate = true;
          setTimeout(() => {
            this.couldnotUpdate = false;
          }, 2000);
        }
        if(data.enabledOrDisabled && data.type=="disabled") {
          this.disableUpdateFlashMessage = true;
          setTimeout(() => {
            this.disableUpdateFlashMessage = false;
          }, 2000);
        } else if(!data.enabledOrDisabled && data.type=="notDisabled") {
          this.couldnotUpdate = true;
          setTimeout(() => {
            this.couldnotUpdate = false;
          }, 2000);
        }
        if(!data.enabledOrDisabled && data.type=="alreadyStarted")
          this.unknownError = true;
          setTimeout(() => {
            this.unknownError = false;
          }, 2000);
        this.getTerminalSearchData();
      }
    });

    this.changeUpdateModel.terminals = [];
    console.log(this.changeUpdateModel.terminals);
  
  }


  addToterminalList(terminalName: string, ischecked: boolean) {
    var currentList = this.changeUpdateModel.terminals;
    //console.log(!currentList.includes(terminalName));
    if(!currentList.includes(terminalName)) {
      this.changeUpdateModel.terminals.push(terminalName);
    } else {
      console.log(this.changeUpdateModel.terminals.indexOf(terminalName));
      let index = this.changeUpdateModel.terminals.indexOf(terminalName);
      let count = 1;
      this.changeUpdateModel.terminals.splice(index,1);
    }

    console.log(this.checkSingle);
    if(ischecked) {
      console.log("checked")
    }
    if(!ischecked) {
      console.log("uncheked");
      
    }
    console.log(this.changeUpdateModel.terminals);
    //console.log(terminalName);
  }

  
}
