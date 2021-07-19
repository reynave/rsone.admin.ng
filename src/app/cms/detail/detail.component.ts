import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $ : any;
declare var tinymce: any;

export class Model {
  constructor(
    public id: number,
    public name: string,
    public content: string,
    public status: number,
  ) { } 
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  items: any = [];
  obj: any = [];
  model: any = new Model(0,"","",0);
  getId: any;

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
    let getId = localStorage.getItem('getId');
    if(getId != ''){
    this.http.get<any>(environment.api + "content/detail/"+getId, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items = data;
        this.model.id = this.items['id'];
        this.model.status = this.items['status'];
        this.model.name = this.items['name'];
        this.model.content = this.items['content'];
      },
      error => {
        console.log(error);
      },

    );
    }
  }

  onSubmit(){
    let action = localStorage.getItem('action');
    const body = {
      data : this.model,
    }
    console.log(body);
    
    if(action == 'create'){
    this.http.post<any>(environment.api + "content/onSubmit", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
       console.log(data); 
       //window.location.reload();
       this.router.navigate(['/cms']);
      },
      error => {
        console.log(error);
      },
    );
    } else if(action == 'detail') {
    this.http.post<any>(environment.api + "content/onUpdateSubmit", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
       console.log(data); 
       this.router.navigate(['/cms']);
      },
      error => {
        console.log(error);
      },
    );
    }
  }

  back(){
     localStorage.setItem('getId', '');
     this.router.navigate(['/cms']);
}

}
