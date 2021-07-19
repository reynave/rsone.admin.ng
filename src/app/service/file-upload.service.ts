import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // API url
  baseApiUrl = "https://file.io"

  constructor(private http:HttpClient) { }

  // Returns an observable
  upload(file: any) {
  
      // Create form data
      const formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append("filename", file);
        
      // Make http post request over api
      // with formData as req
      this.http.post<any>(environment.api + "billing/upload", formData).subscribe(
        data => { 
         if(data['error'] != 0){
            window.alert(data['error']); 
         } else {
            window.alert('Data has been successfully uploaded!'); 
            window.location.reload();
         }
        },
        error => {
         console.log(error);
        },
      );
  }

}
