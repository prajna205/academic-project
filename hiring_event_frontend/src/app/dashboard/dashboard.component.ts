import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private authService : AuthGuard) { }
  token : any;
  ngOnInit(): void {
    console.log(this.route.snapshot.params['userName']);


  }



  redirectTo(){
    // this.token  = this.authService.getToken();
    // this.token = this.route.snapshot.params['token'];
    // console.log(this.token);
    this.router.navigate(["/login"])
    // document.location.href = 'http://localhost:4200?token='+this.token;

  }

}
