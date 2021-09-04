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
  loading: boolean = false;

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private fileUploadService: FileUploadService
) { }

  ngOnInit(): void {
    this.loading = true;
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
        this.loading = false;
        this.items =  data;
        this.items = this.items.filter((item: any) => {
           let result: any;
           result = item[0] != 'UNIT';
           return result;
        });
        $(document).ready(function() {
          $('#example').DataTable({"lengthMenu":[ [250,500],[250,500]],"ordering": false,"scrollX": true});
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

  showAlert(){
     this.loading = false;
     console.log("Ok");
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

}
