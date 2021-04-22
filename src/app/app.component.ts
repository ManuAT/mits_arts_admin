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
  ngOnInit(){
    this.router.navigate(['login']);
  }
}
