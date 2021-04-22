import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : string ="";
  password : string = "";
  res : any = null;
  department : Number =0;
  sign : boolean = true;
  phone : string;
  address : string="";
  sphone : string="";
  email : string="";
  details : string="";
  location : string ="";
  lat : Number = 0
  log : Number = 0 

  constructor(
    public common : CommonService,
    private router : Router,
  ) { }

  ngOnInit() {
    // taking Location
    navigator.geolocation.getCurrentPosition((position) => { 
      console.log("Got position", position.coords);
      this.location = position.coords.latitude +"&"+ position.coords.longitude;
      this.lat = position.coords.latitude;
      this.log = position.coords.longitude
      console.log("Got location", this.location);
    });
    // end of taking location
    


  }

  sub(){
    this.common.getDetailsLogin(this.phone).subscribe(result =>{
      console.log("login Dis",result);
      this.res = result;
      // console.log("login Disp",this.res.password);
      if(this.res !=null){
      if(this.res.password === this.password)
      {
        console.log("login successfull");
        if(this.res.department == 0)
      {this.router.navigate(['customer'],{ queryParams: { phone: this.phone} });}
      else if(this.res.department == 1){
        this.router.navigate(['shop'],{ queryParams: { phone: this.phone} });
      }
      else if(this.res.department == 2){
        this.router.navigate(['delevery'],{ queryParams: { phone: this.phone} });
      }
      }
      else{
        console.log("Username or Password Invalid");
        this.createBasicMessage();
      }
    }
    else{
      console.log("Username or Password Invalid");
      this.createBasicMessage();

      // ("Username or Password Invalid")
    }
    });
  }
  signup(){
    this.sign = false;
    this.username = "";
    this.password = "";
  }
  signup2(){
    console.log("department",this.department);
    this.details = this.username+'&'+this.email+'&'+this.address+'&'+this.sphone+'&'+this.location;
    console.log("details",this.details);

    this.common.createLogin(this.phone,this.password,this.department,this.details,this.lat,this.log).subscribe(result=>{
      console.log("login is",result);
      if(this.department == 0)
      {this.router.navigate(['customer'],{ queryParams: { phone: this.phone} });}
      else if(this.department == 1){
        this.router.navigate(['shop'],{ queryParams: { phone: this.phone} });
      }
      else if(this.department == 2){
        this.router.navigate(['delevery'],{ queryParams: { phone: this.phone} });
      }
      
    });
  }
  createBasicMessage(): void {
    alert('Username or Password Invalid');
  }

}
