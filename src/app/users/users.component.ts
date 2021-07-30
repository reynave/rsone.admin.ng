import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $ : any;

export class UsersModel {
  constructor(
    public id: number,
    public email: string,
    public name: string,
    public status: string,
    public id_user_access: number,
  ) { } 
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  items: any = [];
  accessItems: any = [];
  model : any = new UsersModel(0,"","","",0);
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
    this.http.get<any>(environment.api + "users/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.items =  data['items']; 
        $(document).ready(function() {
          $('#example-user').DataTable({"lengthMenu":[ [250,500],[250,500]],"ordering": false,"scrollX": true});
        } );
      },
      error => {
        console.log(error);
      },

    );

    this.http.get<any>(environment.api + "users/access_right", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.accessItems =  data['items']; 
        $(document).ready(function() {
          $('#example').DataTable();
        } );
      },
      error => {
        console.log(error);
      },

    );

  }

  

  onUpdateSubmit(){
    
  }

  onSubmit(){
    const body = {
      data : this.model,
    }

    console.log(body);
    
    this.http.post<any>(environment.api + "users/onSubmit", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
       console.log(body); 
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
