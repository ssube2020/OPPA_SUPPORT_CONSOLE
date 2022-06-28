import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JavaSoftUpdateService } from 'src/app/Services/soft-update/java-soft-update.service';
import { JavaSoftUpdateVM } from 'src/app/ViewModels/java-soft-update-vm';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-soft',
  templateUrl: './soft.component.html',
  styleUrls: ['./soft.component.scss']
})

export class SoftComponent implements OnInit {

  vmObj!: JavaSoftUpdateVM;
  softUpdateForm!: FormGroup;

  constructor(private softUpdateService: JavaSoftUpdateService, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {

    this.getJavaSoftContent();

    this.softUpdateForm = this.formBuilder.group({
      
      newSoft: ['', Validators.required],
      oldContent: ['', Validators.required],
      oldSoft: ['', Validators.required],
      terminalName: ['', Validators.required],
      contentName: ['', Validators.required]

  })

  }

  getJavaSoftContent() {
    this.softUpdateService.getSoftContent().subscribe({
      next: (data: any) => {
        this.vmObj = <JavaSoftUpdateVM>data;
        console.log(this.vmObj);
      }
    });
  }

  updateJavaSoft() {
    if(this.softUpdateForm.valid) {
      console.log("valid");
      this.softUpdateService.updateSoftContent(this.softUpdateForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          alert("soft updated succesfully");
        }
      })
    } else {
      alert("შეავსეთ ყველა ველი");
    }
    
  }

}
