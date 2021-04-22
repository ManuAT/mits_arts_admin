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
  geScore :any;
  getEvent:any;
  ngOnInit(){

    // this.router.navigate(['login']);
    this.common.getScore().subscribe(result=>{
      this.geScore = result[0];
      console.log("Score",this.geScore);

    });

    this.common.getEvent().subscribe(result=>{
      console.log("Evnet",result);
      this.getEvent = result;
    })

  }
}
