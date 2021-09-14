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
    public name: string,
    public userId: number,
    public virtual_account: string,
    public userName: string,
    public rt_rw_id: number
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
  model : any = new Model(0,"","",0,"","",0);
  userItems: any = [];
  rtrwItems: any = [];
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

    this.http.get<any>(environment.api + "rtrw/index", {
        headers: this.configService.headers()
    }).subscribe(
        data => {  
          this.rtrwItems = data['items'];
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
        this.items = data['items'].filter((item: any) => {
           let result: any;
           result = item.user_name != null;
           return result;
        }); 
        $(document).ready(function() {
          $('#example').DataTable({"lengthMenu":[ [250,500],[250,500]],"ordering": false});
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
        console.error(error);
        alert("This unit "+this.model.house+" already exist. Please select another unit.");
      },

    );
  }

  onDelete(id: number){
    if(confirm('Are you sure?')){
    this.http.get<any>(environment.api + "residence/onDelete/"+id, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
         window.location.reload(true);
      },
      error => {
        console.log(error);
      },

    );
    }
  }

  changeWarga()
  {
    const body = {
      data : this.model.userId,
    }
    
    this.http.post<any>(environment.api + "residence/getVA", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
       this.model.virtual_account = data['item'];
      },
      error => {
        console.log(error);
      },

    );
  }

  open(content: any, obj: any) {
    this.model = obj;
    this.modalService.open(content, { size: 'md' }).result.then((result) => {
      console.log('Open');
    }, (reason) => { // Untuk closed modal
      console.log(`Dismissed`);
      window.location.reload();
    });
  }

}
