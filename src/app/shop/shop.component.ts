import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  list : any ;
  list1 : any ;

  add : string = "";
  addList :any;
  constructor(
    public common : CommonService,
    private router : Router,
  ) { }

  ngOnInit() {
//location.href.split('page=')[1]
   console.log("passed value");
   this.list = [];
    this.common.getDetailsLogin(location.href.split('phone=')[1]).subscribe(result=>{
      console.log("logres",result);
      this.addList = result
      this.add = this.addList.details.split(['&'][0])[2]
      // console.log("logres",this.add);
    this.common.getDetailsOrder().subscribe(result1=>{
      console.log("oder details",result1);
      this.list1 = result1
      for(var i=0;i<this.list1.length;i++)
      {
        if(this.list1[i].shopName == this.add)
        {
          this.list.push(this.list1[i])
        }
      }
    })
  });
  }

}
