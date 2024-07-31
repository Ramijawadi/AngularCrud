import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }


  //post employee

  postEmployee(data:any) {
    
return this._http.post<any>("https://retoolapi.dev/HYd96h/data",data).
pipe(map((res:any)=> {

  return res ;
}) )

  }

  //get 

  getEmployee(){

    return this._http.get("https://retoolapi.dev/HYd96h/data").
    pipe(map((res:any)=> {

      return res ;
    }) )
    

  }

  //delete

  deleteEmployee(id:number) {

    return this._http.delete("https://retoolapi.dev/HYd96h/data"+id).
    pipe(map((res:any)=> {

      return res ;
    }) )
    
  }
}
