import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  url_ ="http://localhost:8080/";
  headers={
    headers:new HttpHeaders({
    'Content-Type':'application/json'
  })}

  getAll():any{
    return this.http.get<any>(`${this.url_}StateDistrict/states`).pipe()
  
  }
  getDistrictByStateId(state_id:number){
    return this.http.get(`${this.url_}StateDistrict/districts/${state_id}`).pipe()
  }

  public saveState(states:any){
    return this.http.post(`${this.url_}StateDistrict/states`,states)
 }
 public saveDistrict(districts:any){
  return this.http.post(`${this.url_}StateDistrict/districts`,districts)
}
}
