import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  tokenName : string = "resoneClient_ver1";
  objName : string = "resoneClient_obj";
  objUser : string = "resoneUser_obj";
  secretKey : string = "YourSecretKeyForEncryption&Descryption";

  varKey: string = "mXTSxrEKSESLFG7DtecSrYnZb33LyBuVDKJ3KehXe7Q67NGFWGehU3ANexas3ZbrkfUs5RpVtGNfcgEBqxp5Unk5azj4ZgdWfhkf";
  varToken: string;
  varHeaders: any = [];  
  constructor( 
    private localstorage : LocalstorageService,
    private router : Router,

  ) { 
    this.varToken = "tokentest";

  }


  headers() {    
    return this.varHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Key': this.varKey,
      'Token': this.token(),
    });
  }

  removeToken(){
    localStorage.removeItem(this.tokenName);
    localStorage.removeItem(this.objName);
    
  }

  token() : any{
    return  localStorage.getItem(this.tokenName) !== null ? localStorage.getItem(this.tokenName) : false;
  } 

  setToken(data : any ){
    localStorage.setItem(this.tokenName, data);
  }
  setObj(data :any ){
    localStorage.setItem(this.objName,  JSON.stringify(data));
  }

  getUser(){
    return  localStorage.getItem(this.objUser) !== null ? localStorage.getItem(this.objUser) : false;
  }

  getObj(){
    return false;
  //  return JSON.parse(localStorage.getItem(this.objName));
  }
  relogin(data  : any){
    if(data['error'] === 400){
      this.router.navigate(['relogin']);
    }
  }
}
