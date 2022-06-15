import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }
  // connectfrontend to backend

  apiurl='http://localhost:3000';
    headers={
    headers:new HttpHeaders({
    'Content-Type':'application/json'
  })}
  getAllData():Observable<any>{
    return this.http.get(`${this.apiurl}/state`).pipe()
  }
  
  // save state
  saveState(data:any):Observable<any>
  {
    return this.http.post(`${this.apiurl}/saveState`,data)
  }
   // save district by using state_id
   saveDistrict(data:any):Observable<any>
   {
     return this.http.post(`${this.apiurl}/saveDistrict`,data)
   }
  getDistrictByStateId(state_id:any):Observable<any>{
    let state_ids=state_id;
    return this.http.get(`${this.apiurl}/district/${state_ids}`).pipe()
    }
}
