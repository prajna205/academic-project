import { Component } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { UtilityService } from './service/utility.services';
import { filter } from 'rxjs/operators';
import { async } from 'rxjs';
import { Popover } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hiring-event';
  navBool=true;
  token:string;
  
  constructor(public utilityService : UtilityService , private route : ActivatedRoute, private router: Router) {
    // this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(event => {
    //       if(event.url == "/" || event.url == "/login"){
    //         this.navBool = false;
    //       }
    // });
  }
  ngOnInit(): void {
    // this.route.queryParams
    // .subscribe(params => {
    //   console.log("query string",params);
    //   if(params.token!="undefined" && params.token!=null )
    //    this.token = params.token;
      // sessionStorage.setItem('token', this.token);
      // this.token=sessionStorage.getItem('token');
      // console.log("get token",sessionStorage.getItem('token'));

      // console.log("app",this.token);
      // this.navTrue();
  }

  // navTrue(){
  // // let obj: Event;
  //   this.router.events.pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe(event => {
  //         console.log(event.url);
  //         // obj=event
  //         if(event.url == "/" || event.url == "/login"){
  //           console.log(event.url == "/" || event.url == "/login");
  //           this.navBool = false;
  //           // return false;


  //         }

  //     // else


  //     });
  //     // console.log("obj",obj);
  //     // return true;


  // }
}
