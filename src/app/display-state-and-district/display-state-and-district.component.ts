    import { ThisReceiver } from '@angular/compiler';
    import { Component, OnInit, ViewChild } from '@angular/core';
    import * as _ from 'lodash';
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

      
      constructor() { }
    
       state:any;
       district:any;
       statelist:any;
       statename:any;
       stateId:any;
       districtlist:any;
       districtname:any;
       districtId:any;
      
      ngOnInit(): void {
        this.statelist=[]
        this.districtlist=[]
      }
      
    submit(){
      console.log(this.statelist.statename);

        this.statelist.push(
              {statename:this.statelist.statename,
                stateId:this.statelist.length +1})
                this.statelist=_.uniqBy(this.statelist,'statename')
        console.log(this.statelist)
        this.statelist.statename='';
        console.log("submit:::this.statelist.statename",this.statelist.statename);
      
    }
    getStateId(stateIds: any){
      this.statelist.stateId=stateIds;
      this.districtlist.stateId=stateIds;
    }
    submitDistrict(districtnameFromInput: any){
      
        this.districtlist.push({districtname:this.districtlist.districtname,stateId:this.statelist.stateId,
        districtId:this.districtlist.length+1
      
      })
      this.districtlist=_.uniqBy(this.districtlist,'districtname')
      this.onChangeSelect(this.districtlist.stateId);
    console.log("submitDistrict:::districtlist.stateId",this.districtlist.stateId)
      this.districtlist.districtname='';
      console.log('submit dist',this.districtlist)
    }
    
    onChangeSelect(stateIds:any){
      this.districtlist.stateId=stateIds
    this.district=this.districtlist.filter((i:any) => i.stateId === this.statelist.stateId);
    console.log("change:::this.district.length>0",this.district.length>0)
    if(this.district.length>0){
      console.log("change:::this.district",this.district)
      return  this.district;

    }else{
      return this.district;
    }
      

    }

    onAddNewStateClick(){
        this.isAddNewStateEnable =!this.isAddNewStateEnable;
        this.statelist.statename='';
    }
    onAddNewDistrictClick(){
      this.isAddNewDistrictEnable =!this.isAddNewDistrictEnable;
      this.districtlist.districtname='';
    }


    onSelectAddNewDistrictClick(){
      this.isSelectAddNewDistrictEnable =!this.isSelectAddNewDistrictEnable;
      
    }


    }
