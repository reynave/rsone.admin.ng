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
    public supportFormId: number
  ) { } 
}


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  items: any = [];  // open
  items2: any = []; // in-progress
  items3: any = []; // closed
  model : any = new Model(0,"","","",0,0);
  getId: any;
  obj: any = [];
  //iurl: string;
  tab1: boolean = true;
  tab2: boolean = false;
  tab3: boolean = false;

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    
    this.getHttp();

    $(document).ready(function() {
       $('#example').DataTable();
    });

  }


  getHttp() {
    this.http.get<any>(environment.api + "support/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items = data['items'];
      },
      error => {
        console.log(error);
      },
    );

    this.http.get<any>(environment.api + "support/inprogress", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items2 = data['items'];
      },
      error => {
        console.log(error);
      },
    );

    this.http.get<any>(environment.api + "support/closed", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items3 = data['items'];
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
      data : { id : this.getId, supportStatusId : this.model.supportStatusId }, // 
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

  openClick(){
    this.tab1 = true;
    this.tab2 = false;
    this.tab3 = false;
    $(document).ready(function() {
       $('#example').DataTable();
    });
  }

  inprogressClick(){
    this.tab1 = false;
    this.tab2 = true;
    this.tab3 = false;
    $(document).ready(function() {
       $('#example2').DataTable();
    });
  }

  closedClick(){
    this.tab1 = false;
    this.tab2 = false;
    this.tab3 = true;
    $(document).ready(function() {
       $('#example3').DataTable();
    });
  }

  iurl: any;
  new_tab: string = '';

  goToLink(url: string){
    window.open(url, "_blank");
  }

  open(content: any, obj: any) {
    this.iurl = this.sanitizer.bypassSecurityTrustResourceUrl('https://a-morphosys.com/application/residence.one/user.api/renov/index?ticket='+( obj != null ? obj.ticketNumber : ''));
    this.new_tab = 'https://a-morphosys.com/application/residence.one/user.api/renov/index?ticket='+( obj ? obj.ticketNumber : '')+'&action=print';
    this.model.supportStatusId = obj.supportStatusId ? obj.supportStatusId : 1;
    this.modalService.open(content, { size: 'lg' });
  }


}
