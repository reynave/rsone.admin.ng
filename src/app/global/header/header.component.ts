import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  active: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
   // private http: HttpClient,
   // private configService: ConfigService,
    ) { }

  ngOnInit(): void {
    this.active = this.activatedRoute.snapshot.data.active;
    console.log(this.active);
  }

}
