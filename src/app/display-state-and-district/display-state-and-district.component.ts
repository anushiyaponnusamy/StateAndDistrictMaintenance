import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {DataService  } from "../service/data.service";
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
  constructor(private dataService:DataService) { }
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
    // this.getDistrictByStateId(this.districts.state_id);
  }
showAll(){
  this.dataService.getAll().subscribe((data:any)=>{
    this.State=data;
    console.log(this.State)
    console.log(this.states.name)
  })
}
// show:boolean=false;
// setShowTrue(name:any){
//   this.show=true;
// }
onSubmit(){
  //add user
  this.dataService.saveState(this.states).subscribe(
    (data:any)=>{
      //success
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
  // this.districts.state_id=state_id;
  // console.log(state_id)

}
onSubmitDistrict(){
  this.dataService.saveDistrict(this.districts).subscribe(
    (data:any)=>{
      //success
     console.log(data)
    
     this.dataService.getDistrictByStateId(this.districts.state_id).subscribe((data:any)=>{
      this.District=data;
      console.log(this.State)
      console.log(this.states.name)
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
  this.dataService.getDistrictByStateId(state_id).subscribe(
   ( data:any) =>{
     this.District =data
   }
  )
  this.ngOnInit()
}
onSelectAddNewDistrictClick(){
  this.isSelectAddNewDistrictEnable =!this.isSelectAddNewDistrictEnable;
  
}
reset(){
  this.districts.name=""
}
}
