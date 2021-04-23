import { Component } from '@angular/core';
import { CommonService } from './common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    public common : CommonService,
    private router : Router,
  ) {

  }
  title = 'foodapp';
  getScore :any;
  getEvent:any;
  enableUpdateScore:boolean=false;
  // red:number=0;
  // green:number=0;
  // blue:number=0;
  // yellow:number=0;
  eventName:string="";
  eventCategory:string="";
  eventTime:string="";
  eventWinner:string="";
  updateData:any={
    "eventName":"",
    "eventCategory":"",
    "eventTime":"",
    "eventWinner":""
  };
  ngOnInit(){

    // this.router.navigate(['login']);
    this.getScoreFuntion();
    this.getEventFuntion();

    

  }

  getScoreFuntion(){
    this.common.getScore().subscribe(result=>{
      this.getScore = result[0];
      console.log("Score",this.getScore);

    });
  }

  getEventFuntion(){
    this.common.getEvent().subscribe(result=>{
      console.log("Evnet",result);
      this.getEvent = result;
    })
  }



  scoreUpdate(){
    this.common.updateScore(this.getScore).subscribe(result=>{
      console.log(result);
      this.getScoreFuntion();
      this.enableUpdateScore=false
    })    
  }

  deleteEvent(_id){
    this.common.deleteEvent(_id).subscribe(result=>{
      console.log("deleted",result);
      this.getEventFuntion();
    })
  }

  addEventFuntion(eventName,eventCategory,eventTime,eventWinner){
    this.common.createEvent(eventName,eventCategory,eventTime,eventWinner).subscribe(result=>{
      console.log("Event_add",result);
      this.getEventFuntion();
      
    })
  }

  updateEventFuntion(updateData){

    this.common.updateEvent(updateData._id,updateData.eventName,updateData.eventCategory,updateData.eventTime,updateData.eventWinner).subscribe(result=>{
      console.log("Event_updated",result);
      this.getEventFuntion();
    })
    
  }
  
}
