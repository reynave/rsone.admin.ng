import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


declare var $ : any;

export class Model {
  constructor(
    public id: number,
    public ticketNumber: string,
    public subject: string,
    public note: string,
    public supportStatusId: number,
    public supportFormId: number,
    public assignUser: string,
    public bcUser: string,
    public rwUser: string,
    public scUser: string,
    public userId: number
  ) { } 
}


@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.css']
})
export class ClosedComponent implements OnInit {
  items: any = [];  // open
  userItems: any = [];  // open
  model : any = new Model(0,"","","",0,0,"","","","",1);
  getId: any;
  obj: any = [];
  //iurl: string;
  tab1: boolean = true;
  tab2: boolean = false;
  tab3: boolean = false;
  scList: any = []; // Security
  rtList: any = []; // RT
  rwList: any = []; // RT
  bcList: any = []; // Building Control
  asgList: any = []; // Assignment with Office House

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private sanitizer: DomSanitizer
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

    this.http.get<any>(environment.api + "users/all_sc", {
        headers: this.configService.headers()
    }).subscribe(
        data => {  
          this.scList = data['items'];
        },
        error => {
          console.error(error);
          alert(error);
        },
    );

    this.http.get<any>(environment.api + "users/all_rt", {
        headers: this.configService.headers()
    }).subscribe(
        data => {  
          this.rtList = data['items'];
        },
        error => {
          console.error(error);
          alert(error);
        },
    );

    this.http.get<any>(environment.api + "users/all_bc", {
        headers: this.configService.headers()
    }).subscribe(
        data => {  
          this.bcList = data['items'];
        },
        error => {
          console.error(error);
          alert(error);
        },
    );

    this.http.get<any>(environment.api + "users/all_office", {
        headers: this.configService.headers()
    }).subscribe(
        data => {  
          this.asgList = data['items'];
        },
        error => {
          console.error(error);
          alert(error);
        },
    );

    this.http.get<any>(environment.api + "support/closed", {
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
  }

  onSubmit(){

    const body = {
      data : this.model,
    }

    console.log(body);
    
    this.http.post<any>(environment.api + "support/onSubmit", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
       console.log(data); 
       window.location.reload();
      },
      error => {
        console.log(error);
      },

    );
  }

  onUpdateSubmit(){

    const body = {
      //data : { id : this.getId, ticketNumber : this.model.ticketNumber, supportStatusId : this.model.supportStatusId, supportFormId : this.model.supportFormId }, // 
      data : this.model
    }

    console.log(body);
    
    this.http.post<any>(environment.api + "support/onUpdateSubmit", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
       console.log(data); 
       window.location.reload();
      },
      error => {
        console.log(error);
      },

    );
  }

  iurl: any;
  new_tab: string = '';

  goToLink(url: string){
    window.open(url, "_blank");
  }

  open(content: any, obj: any) {
    let fro = '';
    if(obj.supportFormId == 2){ // izin
       fro = 'izin';
    }
    else if(obj.supportFormId == 4){
       fro = 'renov';
    }
    else{
       fro = 'general';
    }
    this.iurl = this.sanitizer.bypassSecurityTrustResourceUrl('https://forwards.or.id/admin.api.uat/formresidenceone/index/'+fro+'?ticket='+( obj != null ? obj.ticketNumber : ''));
    this.new_tab = 'https://forwards.or.id/admin.api.uat/formresidenceone/index/'+fro+'?ticket='+( obj ? obj.ticketNumber : '')+'&action=print';
    //this.model.supportStatusId = obj.supportStatusId ? obj.supportStatusId : 10;
    this.model = obj;
    if(obj.supportFormId == 1){
       this.model.assignUser = this.model.f2;
    }
    else if(obj.supportFormId == 2){
       this.model.scUser = this.model.f17; // Security
       this.model.rtUser = this.model.f18; // RT User
    }
    else if(obj.supportFormId == 4){
       this.model.scUser = this.model.f15; // Security
       this.model.bcUser = this.model.f17; // RT User
       this.model.rtUser = this.model.f19; // RT User
    }
    this.modalService.open(content, { size: 'xl' });

  }
}
