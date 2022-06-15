import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../service/apiservice.service';
// import {DataService  } from "../service/data.service";
@Component({
  selector: 'app-display-state-and-district',
  templateUrl: './display-state-and-district.component.html',
  styleUrls: ['./display-state-and-district.component.css']
})
export class DisplayStateAndDistrictComponent implements OnInit {
  isAddNewStateEnable : boolean = true; // to show and hide the edit button
  isAddNewDistrictEnable : boolean = true;
  isSelectAddNewDistrictEnable: boolean = true;
   name : any;
   State:any;
  District:any;
  SelectedState:any={id:0,name:''}
  SelectedDistrict:any={id:0,name:''}
  constructor(private apiService:ApiserviceService) { }
  public states = {
    name:"",
    state_id:""
  }
  public districts:any = {
    name:"",
    state_id:"",
    district_id:""
  }
  ngOnInit(): void {
    this.showAll();
  }
showAll(){
  this.apiService.getAllData().subscribe((res)=>{
    this.State=res.data;
  })
}

onSubmit(state:string){
  //add state
  this.apiService.saveState(this.states).subscribe(
    (data:any)=>{
      // success
     console.log(data)
    
     this.ngOnInit()
     
    },(error)=>{
      console.log(error)
      
    }
  )
 
  this.states.name='';
}
getStateId(state_id:number){
  this.districts.state_id=state_id;

}
onSubmitDistrict(){
  this.apiService.saveDistrict(this.districts).subscribe(
    (data:any)=>{
      //success
     console.log(data)
    
     this.apiService.getDistrictByStateId(this.districts.state_id).subscribe((res)=>{
      this.District=res.data;
    })
     this.ngOnInit()
     
    },(error)=>{
      console.log(error)
      
    }
  )

  this.districts.name='';
}
onAddNewStateClick(){
    this.isAddNewStateEnable =!this.isAddNewStateEnable;
    this.states.name='';
}
onAddNewDistrictClick(){
  this.isAddNewDistrictEnable =!this.isAddNewDistrictEnable;
  this.districts.name='';
  // this.ngOnInit()
}

onChangeState(state_id:any){
  this.apiService.getDistrictByStateId(state_id).subscribe(
   ( res) =>{
     this.District =res.data
     console.log(res)
   }
  )
  // this.apiService.getDistrictByStateId(state_id).subscribe((res)=>this.District=res.json);

  this.ngOnInit()
}
onSelectAddNewDistrictClick(){
  this.isSelectAddNewDistrictEnable =!this.isSelectAddNewDistrictEnable;
  
}
// reset(){
//   this.districts.name=""
// }
}
