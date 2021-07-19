import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $ : any;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  file: any; // Variable to store file
  items: any = [];

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private fileUploadService: FileUploadService
) { }

  ngOnInit(): void {
    this.getHttp(); 
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
    this.fileUploadService.upload(this.file);
  }

  getHttp() {
    this.http.get<any>(environment.api + "billing/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
        this.items =  data; 
        $(document).ready(function() {
          $('#example').DataTable();
        });
      },
      error => {
        console.log(error);
      },

    );
  }

  /*onUpload(){
    this.fileUploadService.upload(this.file);
  }*/

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

}
