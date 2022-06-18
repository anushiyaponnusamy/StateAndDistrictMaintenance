import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../service/apiservice.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-display-state-and-district',
  templateUrl: './display-state-and-district.component.html',
  styleUrls: ['./display-state-and-district.component.css']
})
export class DisplayStateAndDistrictComponent implements OnInit {
  isAddNewStateEnable : boolean = true; // to show and hide the edit button
  isAddNewDistrictEnable : boolean = true;
  isSelectAddNewDistrictEnable: boolean = true;
 
  State:any;
  District:any;
  constructor(private apiService:ApiserviceService) { }
  public states = {
   name:"",
   id:0
  }
  public districts:any = {
    name:"",
    id:"",
    stateId:""
  }
  ngOnInit(): void {
    this.showAll();
   
    // this.onChangeState(this.districts.stateId);
  }

showAll(){
  this.apiService.getAllData().subscribe((res:any)=>{
    this.State=res;
    console.log(res)
    
  },
  (error) => {
     throw error; 
  })
}


onSubmit(state:string){
  this.apiService.getStateByName(state).subscribe((res:any)=>{
     this.State=res;
if(this.State?.length==0){
  
  this.states.name=state;
  this.apiService.saveState(this.states).subscribe(
    (data:any)=>{
      this.ngOnInit()
  
        }
    //
  
  )
   
}else{
  this.ngOnInit()
}
  })


 
  this.states.name='';

}
getStateId(stateIds:number){
  this.districts.stateId=stateIds;

}
onSubmitDistrict(district:any){

  console.log(district)
  console.log(this.districts.stateId)
  this.apiService.getDistrictByStateId(this.districts.stateId).subscribe((res)=>{
    this.districts.name=res;
   
  })
  this.apiService.getDistrictByName(district).subscribe((res:any)=>{
    this.District=res;

if((this.District)?.length==0){
 
  this.districts.name=district;
this.apiService.saveDistrict(this.districts).subscribe(
  (data:any)=>{
    
//  this.ngOnInit()
this.onChangeState(this.districts.stateId)
  })
}
 })
 
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

onChangeState(stateId:any){
  this.ngOnInit()
  // console.log(stateId)
  // console.log(this.districts.stateId)
  this.apiService.getDistrictByStateId(stateId).subscribe(
   ( res) =>{
    
     this.District =res
     this.ngOnInit()
     console.log(this.District)
    
   }
  )
 
}

onSelectAddNewDistrictClick(){
  this.isSelectAddNewDistrictEnable =!this.isSelectAddNewDistrictEnable;
  
}

 
}
