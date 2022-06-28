import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JavaContentUpdateService } from './Services/content-update/java-content-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor() { console.log(this.loggedIn)  }
  
  titlee: string = "shakooooooooooooooooooooooooooooooooooooooooooooooooo kai kacia";

  loggedIn: boolean = false;

  title = 'OPPA_SUPPORT_CONSOLE';
  navbarToggler: boolean = true;
  burgerClick:boolean = false;
  javaUpdateToggler:boolean = false;
  showComponent:boolean = false;
  softComponentToggle: boolean = false;

  toggleNavbar() {
    var a = document.getElementById("mySidenav");
    var b = document.getElementById("toggler");
    var arrow = document.getElementById("arrow-icon");
    var toMoveRight = document.getElementById("java-update");
    var paragraps = document.getElementsByClassName('navbar-item-paragraps');
    var contnetTable = document.getElementsByClassName('content-table');
    if(a!=null && b != null) {
      if(this.navbarToggler) {
        a.setAttribute("style", "width:70px");
        arrow?.setAttribute("style", "display:none;");
        if(this.javaUpdateToggler) {
          toMoveRight?.setAttribute("style","margin-left: 0px !important;");
        }
        setTimeout(()=>{                    
          b!.setAttribute("style", "marginLeft:70px");
        }, 70);
        for(let i=0; i<paragraps.length; i++) {
          paragraps[i].setAttribute("style", "display:none");
        }

        this.burgerClick = false;
        this.navbarToggler = false;
      } else {
        a.setAttribute("style", "width:250px");
        arrow?.setAttribute("style", "display:initial;");
        if(this.javaUpdateToggler) {
          toMoveRight?.setAttribute("style","margin-left: 20px !important;");
        }
        setTimeout(()=>{                         
          b!.setAttribute("style", "marginLeft:230px");
          b!.setAttribute("style","padding-left: 9.5%;");
        }, 150);
        for(let i=0; i<paragraps.length; i++) {
          paragraps[i].setAttribute("style", "display:initial");
          paragraps[i].setAttribute("style", "margin-left :10px; margin-top :15px;");
        }
        this.burgerClick = true;
        this.navbarToggler = true;
      }
    }
  }

  showOnMouseHover() {
    var a = document.getElementById("mySidenav");
    var arrow = document.getElementById("arrow-icon");
    var toMoveRight = document.getElementById("java-update");
    var paragraps = document.getElementsByClassName('navbar-item-paragraps');
    if (a != null) {
      a.setAttribute("style", "width:250px");
      arrow?.setAttribute("style", "display:initial;");
      if(this.javaUpdateToggler) {
        toMoveRight?.setAttribute("style","margin-left: 20px !important;");
      }
      for (let i = 0; i < paragraps.length; i++) {
        paragraps[i].setAttribute("style", "display:initial");
        paragraps[i].setAttribute("style", "margin-left :10px; margin-top :15px;");
      }
      this.navbarToggler = true;
    }
  }

  hideOnMouseOut() {
    if(!this.burgerClick) {
      var a = document.getElementById("mySidenav");
      var b = document.getElementById("toggler");
      var toMoveRight = document.getElementById("java-update");
      var arrow = document.getElementById("arrow-icon");
      var paragraps = document.getElementsByClassName('navbar-item-paragraps');
      if (a != null && b != null) {
        if (this.navbarToggler) {
          a.setAttribute("style", "width:70px");
          b.setAttribute("style", "marginLeft:70px");
          arrow?.setAttribute("style", "display:none;");
          if(this.javaUpdateToggler) {
            toMoveRight?.setAttribute("style","margin-left: 0px !important;");
          }
          for (let i = 0; i < paragraps.length; i++) {
            paragraps[i].setAttribute("style", "display:none");
          }
          this.navbarToggler = false;
        }
        this.navbarToggler = false;
      }
    }
  }

  toggleOnJavaUpdate() {
    var updateBtn = document.getElementById("java-update-btn");
    var dropdownContent = document.getElementsByClassName("java-update-container-toggle");
    var arrow = document.getElementById("arrow-icon");
    if(updateBtn) {
      if(!this.javaUpdateToggler) {
        dropdownContent[0].setAttribute("style", "display: block; margin-left:20px");
        //dropdownContent[0].classList.add('java-update-container');
        arrow?.classList.add('arrowDown');
        this.javaUpdateToggler = true;
      } else {
        dropdownContent[0].setAttribute("style", "display: none");
        arrow?.classList.remove('arrowDown');
        this.javaUpdateToggler = false;
      }
    }
  }

  logOut() {
    
    // this.loggedIn = false;
  }

  emittedDataByChild(data: boolean) {
    this.loggedIn = data;
    console.log(this.loggedIn);
  }

}


