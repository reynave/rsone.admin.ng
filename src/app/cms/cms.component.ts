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
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {

  items: any = [];
  obj: any = [];
  model: any = new Model(0,"","",0);
  getId: any;
  show: boolean = false;

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getHttp();    
  }

  showForm(){
    this.show = true;
  }

  hideForm(){
    this.show = false;
  }

  getHttp() {
    this.http.get<any>(environment.api + "content/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items =  data['items']; 
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

  cms_create(){
     localStorage.setItem('getId', '');
     localStorage.setItem('action', 'create');
     this.router.navigate(['/cms/create/']);
  }

  cms_detail(id: string){
     localStorage.setItem('getId', id);
     localStorage.setItem('action', 'detail');
     this.router.navigate(['/cms/detail/'+id]);
  }

  onSubmit(){

    const body = {
      data : this.model,
    }

    console.log(body);
    
    this.http.post<any>(environment.api + "content/onSubmit", body, {
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
      data : this.model, // 
    }

    console.log(body);
    
    this.http.post<any>(environment.api + "content/onUpdateSubmit", body, {
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

  onDelete(id: number){
    if(confirm('Are you sure?')){
    this.http.get<any>(environment.api + "content/onDelete/"+id, {
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

  cmsStatus(param: number){
     let txt = '';
     if(param == 0) { txt = 'Draft'; }
     else if(param == 1) { txt = 'Published'; }
     else if(param == 2) { txt = 'Unpublished'; }
     return txt;
  }

  open(content: any, obj: any) {
    this.model.id = obj.id;
    this.model.status = obj.status;
    this.model.name = obj.name;
    this.model.content = obj.content;
    this.modalService.open(content, { size: 'lg' });
  }

}
