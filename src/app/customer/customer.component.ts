import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';
declare var Microsoft: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  lat : Number[] = [];
  log : Number[] = [];
  address :String[] = [];
  stock : any;
  search : String ="";
  list : any;
  cart : any  =[];
  sum : number = 0;
  constructor(
    public common : CommonService,
    private router : Router,
  ) { }

  ngOnInit() {
    var res;
    var test1;
    this.common.getDetailsLogin("404").subscribe(result=>{
      console.log("logres",result);
      res = result;
      for(var i=0;i<res.length;i++)
      {
        if(res[i].department == 1){
          
          this.lat.push(res[i].lat);
          this.log.push(res[i].log);
          
          test1 =  res[i].details.split(['&'][0])
          this.address.push(test1[2]);
        }
      }
      console.log("test",this.lat,this.log,this.address);
      
   

    // maps

    var map = null, infobox, dataLayer;
            setTimeout(() => {

                var map = new Microsoft.Maps.Map(document.getElementById("myMap"), {
                disableZooming: false,
                zoom : 12
                });
                var center = map.getCenter(9.9770008,76.2473529);
    
                dataLayer = new Microsoft.Maps.EntityCollection();
                map.entities.push(dataLayer);
    
                var infoboxLayer = new Microsoft.Maps.EntityCollection();
                map.entities.push(infoboxLayer);
    
                infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, offset: new Microsoft.Maps.Point(0, 20) });
                infoboxLayer.push(infobox);
    
                for(var i=0;i< this.lat.length;i++) {   
                    var position = new Microsoft.Maps.Location(this.lat[i],this.log[i]);        
                var pin1 = new Microsoft.Maps.Pushpin(position,{
                  icon: 'https://docs.microsoft.com/en-us/bingmaps/v8-web-control/media/bmv8-poi-custom.png',
                  anchor: new Microsoft.Maps.Point(12, 39)
                });
                pin1.Title = this.address[i];
                // pin1.Description =this.locations[i].subTitle;
                Microsoft.Maps.Events.addHandler(pin1, 'mouseover', displayInfobox);
                Microsoft.Maps.Events.addHandler(pin1, 'mouseout', closeInfobox);
                dataLayer.push(pin1);
            }
                function displayInfobox(e) {
                    if (e.targetType == 'pushpin') {
                        infobox.setLocation(e.target.getLocation());
                        infobox.setOptions({ visible: true, title: e.target.Title });
                    }
    
                }
              function closeInfobox(e) {
                  if (e.targetType == 'pushpin') {
                      infobox.setOptions({ visible: false});
                  }
              }
    
              }, 1000);

            })
    this.common.getDetailsStock().subscribe(result=>{
      console.log("result of stock",result); 
      this.stock = result;
      this.list = result
    });
    
  }
  listFn(){
      console.log("search",this.search);
      this.list=[];
      for(var i=0;i<this.stock.length;i++)
      {
        if(this.stock[i].itemName == this.search){
          this.list.push(this.stock[i]);
        }
      }
      if(this.search == ""){
        this.list = this.stock
      }
  }
  cartFn(item){
    
    console.log("cart",item);
    this.cart.push(item)
    this.sum += item.cost;
  }
  buyFn(){
    console.log("buy");
    for(var i = 0;i<this.cart.length;i++){
      this.common.createOrder(this.cart[i].itemName,this.cart[i].stockNo,this.cart[i].shopName,this.cart[i].quantity,(location.href.split('phone=')[1])).subscribe(result=>{
        console.log("buy succes",result);
        
      })
    }
    this.cart = [];
    this.sum =0;
    alert("Your order Placed Sucessfully");
  }
  removeFn(item,cost){
    console.log("intex",item);
    this.sum = this.sum - cost;
    // this.cart.remove(item)
    this.cart.splice(item, 1);
  }
}
