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
    public virtual_account: string,
    public residence_status: string,
    public house: string,
    public username: string,
  ) { } 
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  items: any = [];
  resItems: any = [];
  accessItems: any = [];
  model : any = new UsersModel(0,"","","",0,"","","","");
  getId: any;
  obj: any = [];

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
          $('#example-user').DataTable({"lengthMenu":[ [250,500,1000],[250,500,1000]],"ordering": true,"scrollX": true});
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

    this.http.get<any>(environment.api + "residence/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
        this.resItems = data['items'];
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
    
    this.http.post<any>(environment.api + "users/onSubmit", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
       //console.log(data); 
       window.location.reload();
      },
      error => {
        console.log(error);
      },

    );
  }

  resetPassword()
  {
    const body = {
      data : this.model,
    }

    console.log(body);
    
    this.http.post<any>(environment.api + "users/reset_password", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
       console.log(data);
       window.alert('User '+this.model.name+ ' has been successfully reset password!');
       window.location.reload();
      },
      error => {
        console.log(error);
      },

    );
  }

  setfromRes(){
    this.http.get<any>(environment.api + "residence/getResdata/"+this.model.house, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.model.username = this.model.house;
        this.model.name = data['items'][0]['name']; 
        this.model.email = data['items'][0]['email']; 
      },
      error => {
        console.log(error);
      },

    );
  }

  delete_user(id: number){
    if(confirm('Are you sure?')){
    this.http.get<any>(environment.api + "residence/delete_user/"+id, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
      },
      error => {
        console.log(error);
      },

    );
    }
  }

  open(content: any, obj:any) {
    this.model = obj;
    this.modalService.open(content);
  }

}
