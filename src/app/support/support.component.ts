import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $ : any;

export class Model {
  constructor(
    public id: number,
    public ticketNumber: string,
    public subject: string,
    public note: string,
    public supportStatusId: number
  ) { } 
}


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  items: any = []; 
  model : any = new Model(0,"","","",0);
  getId: any;

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    
    this.getHttp();
  }


  getHttp() {
    this.http.get<any>(environment.api + "support/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items =  data['items']; 
        $(document).ready(function() {
          $('#example').DataTable();
        } );
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

  obj: any = [];
  open(content: any) {
    this.modalService.open(content);
  }


}
