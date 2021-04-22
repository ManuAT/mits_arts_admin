import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';
declare var Microsoft: any;

@Component({
  selector: 'app-delevery',
  templateUrl: './delevery.component.html',
  styleUrls: ['./delevery.component.css']
})
export class DeleveryComponent implements OnInit {
  list : any ;
  constructor(
    public common : CommonService,
    private router : Router,
  ) { }

  ngOnInit() {
    this.common.getDetailsOrder().subscribe(result=>{
      console.log("oder details",result);
      this.list = result;

      this.common.getDetailsLogin(this.list[0].phone).subscribe(result=>{
        console.log("phone",result);
        var test;
        test = result
        var map = null, infobox, dataLayer;
        setTimeout(() => {
          var map = new Microsoft.Maps.Map(document.getElementById("myMap"), {
            disableZooming: false,
            zoom :11,
            center: new Microsoft.Maps.Location(
              
              // this.latitude[i],
              // this.longitude[i]
              // 34,34
              test.lat,test.log
            ),
          });
          var center = map.getCenter();
  
          dataLayer = new Microsoft.Maps.EntityCollection();
          map.entities.push(dataLayer);
  
          var infoboxLayer = new Microsoft.Maps.EntityCollection();
          map.entities.push(infoboxLayer);
  
          infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, offset: new Microsoft.Maps.Point(0, 20) });
          infoboxLayer.push(infobox);
  
  
          var pin1 = new Microsoft.Maps.Pushpin(center, {
            icon: 'https://docs.microsoft.com/en-us/bingmaps/v8-web-control/media/bmv8-poi-custom.png',
            anchor: new Microsoft.Maps.Point(12, 39)
          });
          pin1.Title = "Coustomer";
          // pin1.Description = this.location.subTitle;
          Microsoft.Maps.Events.addHandler(pin1, 'mouseover', displayInfobox);
          Microsoft.Maps.Events.addHandler(pin1, 'mouseout', closeInfobox);
          dataLayer.push(pin1);
  
          function displayInfobox(e) {
            if (e.targetType == 'pushpin') {
              infobox.setLocation(e.target.getLocation());
              infobox.setOptions({ visible: true, title: e.target.Title, description: e.target.Description });
            }
  
          }
          function closeInfobox(e) {
            if (e.targetType == 'pushpin') {
              infobox.setOptions({ visible: false });
            }
          }
        }, 1000);
        
      })
    })
  }

}
