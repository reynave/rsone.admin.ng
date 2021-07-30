import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  active: string = "";
  uname: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
   // private http: HttpClient,
    private configService: ConfigService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.active = this.activatedRoute.snapshot.data.active;
    console.log(this.active);
    let jsstr = localStorage.getItem("resoneClient_obj");
    this.uname = JSON.parse(jsstr || '{}').username; //https://stackoverflow.com/a/46915314
  }

  logout(){
    this.configService.removeToken();
    this.router.navigate(['/']);
  }

  //this._username = 'Administrator';

}
