import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }

apiurl='http://localhost:3000';
    headers={
    headers:new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*'
     })
}
getStateByName(state:any):Observable<any>{
  let statename=state;
  return this.http.get(`${this.apiurl}/state?name=${statename}`)
  
  }
  getDistrictByName(district:any):Observable<any>{
    let districtname=district;
    return this.http.get(`${this.apiurl}/district?name=${districtname}`)
    
    }
  getAllData(){
    return this.http.get<any>(`${this.apiurl}/state`);
  }
  // save state
  saveState(data:any)
  {
    return this.http.post<any>(`${this.apiurl}/state`,data);
  }
   // save district by using state_id
   saveDistrict(data:any) :Observable<any>
   {
     return this.http.post<any>(`${this.apiurl}/district`,data)
   }
  getDistrictByStateId(stateId:any):Observable<any>{
    let stateIds=stateId;
    return this.http.get(`${this.apiurl}/district?stateId=${stateIds}`)
    
    }
    getDistrictByFilter(){
      return this.http.get<any>(`${this.apiurl}/district`);
    }
}
