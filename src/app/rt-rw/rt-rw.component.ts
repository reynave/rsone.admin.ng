import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $ : any;

export class Model {
  constructor(
    public id: number,
    public no_rt: string,
    public no_rw: string,
    public rt_userId: number,
    public rw_userId: number,
    public userId: number
  ) { } 
}

@Component({
  selector: 'app-rt-rw',
  templateUrl: './rt-rw.component.html',
  styleUrls: ['./rt-rw.component.css']
})
export class RtRwComponent implements OnInit {
  items: any = [];  // open
  userItems: any = [];  // open
  model : any = new Model(0,"","",0,0,1);
  obj: any = [];

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {

    this.http.get<any>(environment.api + "users/all", {
        headers: this.configService.headers()
    }).subscribe(
        data => {  
          this.userItems = data['items'];
        },
        error => {
          console.error(error);
          alert(error);
        },
    );

    this.http.get<any>(environment.api + "rtrw/index/", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items = data['items'];
        $(document).ready(function() {
          $('#example').DataTable();
        });
      },
      error => {
        console.log(error);
      },
    );
  }

  onSubmit(){
    const body = {
      data : this.model,
    }
    
    this.http.post<any>(environment.api + "rtrw/onSubmit", body, {
       headers: this.configService.headers()
    }).subscribe(
       data => {
         //console.log(data); 
         window.location.reload(true);
       },
       error => {
         console.log(error);
    });
 }

 open(content: any, obj: any){
    //if(obj.length > 0)
    this.model = obj;
    this.modalService.open(content);
 }


}
