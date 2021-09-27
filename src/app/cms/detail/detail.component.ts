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
    public id_content_category: number,
    public start_date: string,
    public end_date: string,
    public name: string,
    public content: string,
    public status: number,
    public filename: string,
  ) { } 
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  file: any; // Variable to store file
  items: any = [];
  categoryItems: any = [];
  obj: any = [];
  model: any = new Model(0,0,"","","","",0,"");
  getId: any;
  config: any = {
     height: 300,
     menubar: false,
     plugins: [
       'advlist autolink lists link image charmap print preview anchor',
       'searchreplace visualblocks code fullscreen',
       'insertdatetime media table paste code help wordcount'
     ],
     toolbar:
       'undo redo | formatselect | bold italic backcolor | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | removeformat | help'
   };

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHttp();
    this.http.get<any>(environment.api + "content/content_category", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.categoryItems =  data['items']; 
      },
      error => {
        console.log(error);
      },

    );
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
        this.model = data;
      },
      error => {
        console.log(error);
      },
    );
    }
  }

  onChange(event: any) {
    this.file = typeof event.target.files[0] != "undefined" ? event.target.files[0] : '';
  }

  onSubmit(){
    let action = localStorage.getItem('action');

    if (typeof (this.file) != "undefined") {
       
       const formData = new FormData();
       formData.append("filename", this.file);
       formData.append('token', this.configService.token());
       this.model.filename = this.file.name;
       this.http.post<any>(environment.api + "upload/cmsImage", formData).subscribe(
          data => { 
          console.log(data);
        },
        error => {

        },
      );
    }

    const body = {
      data : this.model,
    }
        
    // Store form name as "file" with file data
    
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

  onDateRangeValid(){
      let fromDate = Date.parse(this.model.start_date);
      let toDate = Date.parse(this.model.end_date);
      if(fromDate >= toDate || isNaN(toDate)){
         alert('Invalid date range! Please select date correctly.');
         this.model.end_date = "";
      }
      console.log(fromDate);
      console.log(toDate);
      // https://esausilva.com/2017/04/20/date-range-validation-in-javascript-es5-and-one-liner-es6/
  }

  back(){
     localStorage.setItem('getId', '');
     this.router.navigate(['/cms']);
}

}
