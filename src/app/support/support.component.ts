import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
    public rtUser: string,
    public rwUser: string,
    public scUser: string,
    public userId: number,
    public chkIPL: boolean,
    public noteIPL: string,
    public chkNote: boolean,
    public izinNote: string,
    public startDate: string,
    public endDate: string,
  ) { } 
}


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  items: any = [];  // open
  userItems: any = [];  // open
  model : any = new Model(0,"","","",0,0,"","","","","",1,false,"",false,"","","");
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
  read1: boolean = false;
  read2: boolean = false;

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
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

    this.http.get<any>(environment.api + "support/index", {
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
       this.modalService.dismissAll();
       if (this.model.supportStatusId == 11)
          this.router.navigate(['/support/inprogress']);
       else if (this.model.supportStatusId == 100)
          this.router.navigate(['/support/closed']);
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

  chkIPL_click(){
     if(this.model.chkIPL) this.read1 = true;
     console.log(this.model.chkIPL);
  }

  chkNote_click(){
     this.model.chkNote = true;
     if(this.model.chkNote) this.read2 = true;
     console.log(this.model.chkNote);
  }

  onDateRangeValid(){
      let fromDate = Date.parse(this.model.startDate);
      let toDate = Date.parse(this.model.endDate);
      if(fromDate > toDate || isNaN(toDate)){
         alert('Invalid date range! Please select date correctly.');
         this.model.startDate = '';
         this.model.endDate = '';
      }
      console.log(fromDate);
      console.log(toDate);
      // https://esausilva.com/2017/04/20/date-range-validation-in-javascript-es5-and-one-liner-es6/
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
    this.iurl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.api+'formresidenceone/index/'+fro+'?ticket='+( obj != null ? obj.ticketNumber : '')+'&t='+this.configService.token());
    this.new_tab = environment.api+'formresidenceone/index/'+fro+'?ticket='+( obj ? obj.ticketNumber : '')+'&action=print&t='+this.configService.token();
    //this.model.supportStatusId = obj.supportStatusId ? obj.supportStatusId : 10;
    this.model = obj;
    if(obj.supportFormId == 1){
       this.model.assignUser = this.model.f5;
       this.model.rtUser = this.model.f4; // General diambil dari field f3 dari hasil pengisian template utk print preview
    }
    else if(obj.supportFormId == 2){ // Izin
       this.model.scUser = this.model.f17; // Security
       this.model.rtUser = this.model.f18; // RT User
       this.model.startDate = this.model.f19; // Start Date
       this.model.endDate = this.model.f20; // End Date
       this.model.chkIPL = (this.model.f21 != null) ? true : false;
       this.model.noteIPL = this.model.f22;
       this.model.chkNote = (this.model.f23 != null) ? true : false;
       this.model.izinNote = this.model.f24;
    }
    else if(obj.supportFormId == 4){ // Renovasi
       this.model.scUser = this.model.f15; // Security
       this.model.bcUser = this.model.f17; // BuildCtrl User
       this.model.rtUser = this.model.f19; // RT User
    }
    this.modalService.open(content, { size: 'xl' });

  }
}
