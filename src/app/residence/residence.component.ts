import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, filter} from 'rxjs/operators';

declare var $ : any;

export class Model {
  constructor(
    public id: number,
    public house: string,
    public userId: number,
    public userName: string,
    public rt: number,
    public rw: number,
    public note: string
  ) { } 
}

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.css']
})


export class ResidenceComponent implements OnInit {

  items: any = [];
  loading: boolean = false;
  model : any = new Model(0,"",0,"",0,0,"");
  userItems: any = [];
  obj: any;

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService
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

    this.http.get<any>(environment.api + "residence/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
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

  onAction(){
    const body = {
      data : this.model,
    }

    console.log(body);

    //window.location.reload();
    
    this.http.post<any>(environment.api + "residence/onSubmit", body, {
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

  open(content: any, obj: any) {
    this.model.id = obj.id;
    this.model.house = obj.house;
    this.model.userId = obj.userId;
    this.model.userName = obj.user_name;
    this.model.rt = obj.rt;
    this.model.rw = obj.rw;
    this.model.note = obj.note;
    this.modalService.open(content, { size: 'md' });
  }

}
