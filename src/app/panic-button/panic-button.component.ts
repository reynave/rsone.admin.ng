import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $ : any;

export class Model {
  constructor(
    public id: number,
    public name: string,
    public value: string
  ) { } 
}

@Component({
  selector: 'app-panic-button',
  templateUrl: './panic-button.component.html',
  styleUrls: ['./panic-button.component.css']
})
export class PanicButtonComponent implements OnInit {

  items: any = [];
  model : any = new Model(0,"","");
  success: boolean = false;

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  onSubmit(){
    const body = {
      data : this.model,
    }

    console.log(body);
    
    this.http.post<any>(environment.api + "settings/panicButtonUpdate", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
       console.log(data); 
       this.success = true;//window.location.reload();
      },
      error => {
        console.log(error);
      },

    );
  }

  getHttp() {
    this.http.get<any>(environment.api + "settings/panicButton", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.model.value = data.items;
      },
      error => {
        console.log(error);
      },

    );
  }

}
