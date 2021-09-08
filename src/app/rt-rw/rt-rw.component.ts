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
    public unit_rt: string,
    public unit_rw: string,
    public rt_userId: number,
    public rw_userId: number,
    public rt_username: string,
    public rw_username: string,
    public userId: number,
    public action: string,
  ) { } 
}

export class EditModel {
  constructor(
    public id: number,
    public no_rt: string,
    public no_rw: string,
    public unit_rt: string,
    public unit_rw: string,
    public rt_userId: number,
    public rw_userId: number,
    public rt_username: string,
    public rw_username: string,
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
  rtItems: any = [];
  rwItems: any = [];
  userItems: any = [];  // open
  userRTItems: any = [];
  userRWItems: any = [];
  model : any = new Model(0,"","014","","",0,0,"","",1,"create");
  editmodel : any = new EditModel(0,"","014","","",0,0,"","",1);
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

    this.http.get<any>(environment.api + "users/all_rt", {
        headers: this.configService.headers()
    }).subscribe(
        data => {  
          this.userRTItems = data['items'];
        },
        error => {
          console.error(error);
          alert(error);
        },
    );

    this.http.get<any>(environment.api + "users/all_rw", {
        headers: this.configService.headers()
    }).subscribe(
        data => {  
          this.userRWItems = data['items'];
        },
        error => {
          console.error(error);
          alert(error);
        },
    );

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
          $('#example').DataTable({
            ordering:false,
          });
        });
      },
      error => {
        console.log(error);
      },
    );

    this.http.get<any>(environment.api + "residence/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
        this.rtItems = data['items'];
      },
      error => {
        console.log(error);
      },
    );

    this.http.get<any>(environment.api + "residence/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
        this.rwItems = data['items'];
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
         if(data['alert']!='') {
             console.log(data['alert']);
             alert(data['alert']);
             false;
         }
         window.location.reload(true);
       },
       error => {
         console.log(error);
    });
  }

  onUpdateSubmit(){
    const body = {
      data : this.editmodel,
    }
    
    this.http.post<any>(environment.api + "rtrw/onUpdateSubmit", body, {
       headers: this.configService.headers()
    }).subscribe(
       data => {
         window.location.reload(true);
       },
       error => {
         console.log(error);
    });
  }

 cancel(){
    this.model.no_rt = '';
    this.model.no_rw = '';
    this.model.rt_userId = 0;
    this.model.rw_userId = 0;
    this.modalService.dismissAll();
 }

 editcancel(){
    this.editmodel.no_rt = '';
    this.editmodel.no_rw = '';
    this.editmodel.rt_userId = 0;
    this.editmodel.rw_userId = 0;
    this.modalService.dismissAll();
 }

 open(content: any, obj: any){
    this.model = obj;
    this.model.action = 'create';
    this.modalService.open(content);
 }

 openedit(content: any, obj: any){
    this.model = obj;
    this.model.action = 'update';
    this.modalService.open(content);
 }

  setfromRes1(house:string){
    this.http.get<any>(environment.api + "residence/getResdata/"+house, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.model.rt_userId = data['items'][0]['userId'];
        this.model.rt_username = data['items'][0]['name'];
        //this.editmodel.rt_userId = data['items'][0]['userId'];
        //this.editmodel.rt_username = data['items'][0]['name'];
      },
      error => {
        console.log(error);
      },

    );
  }

  setfromRes2(house:string){
    this.http.get<any>(environment.api + "residence/getResdata/"+house, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.model.rw_userId = data['items'][0]['userId'];
        this.model.rw_username = data['items'][0]['name'];
        //this.editmodel.rw_userId = data['items'][0]['userId'];
        //this.editmodel.rw_username = data['items'][0]['name'];
      },
      error => {
        console.log(error);
      },

    );
  }

}
