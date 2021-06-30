import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $ : any;

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  items: any = []; 

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
  obj: any = [];
  open(content: any) {
    this.modalService.open(content);
  }


}
