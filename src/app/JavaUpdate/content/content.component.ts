import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JavaContentUpdateDTO } from 'src/app/models/javaUpdateModels/java-content-update-dto'; 
import { JavaContentUpdateService } from 'src/app/Services/content-update/java-content-update.service';
import { JavaContentUpdateVM } from 'src/app/ViewModels/java-content-update-vm';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  vmObj!: JavaContentUpdateVM;
  contentUpdateForm!: FormGroup;
  javaContentUpdateDTO! : JavaContentUpdateDTO;

  constructor(private contentService: JavaContentUpdateService, private formBuilder: FormBuilder) {  }

  ngOnInit() : void {
    this.contentUpdateForm = this.formBuilder.group({
      
        newContent: ['', Validators.required],
        oldContent: ['', Validators.required],
        oldSoft: ['', Validators.required],
        terminalName: ['', Validators.required],
        contentName: ['', Validators.required]

    })

   this.getJavaUpdateContent();
   //this.getWeathers();
  }

  getJavaUpdateContent(){
    this.contentService.getJavaContentUpdate().subscribe({
      next: (data : any) => {
        
        this.vmObj = <JavaContentUpdateVM>data;
        console.log(this.vmObj.contentNames);

      }
    });
  }

  UpdateJavaContnet() {
    console.log('clicked');
    console.log(this.contentUpdateForm.value);
    console.log(this.contentUpdateForm.valid);
    //this.javaContentUpdateDTO = <>  
    if(this.contentUpdateForm.valid) {
      this.contentService.UpdateJavaContnet(this.contentUpdateForm.value).subscribe({
        next: (data : any) => {
          //if(data. )
          alert(data);
          this.contentUpdateForm.reset();
          //console.log(data.toString());
        }
      })
    } else {
      alert("შეავსეთ ყველა ველი");
    }

  }

}
