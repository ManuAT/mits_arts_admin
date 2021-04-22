import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) {
    

   }
  createLogin(phone,password,department,details,lat,log){
    console.log(lat,log);
    
    return this.http.post('https://foodapp28.herokuapp.com/api/login',{phone,password,department,details,lat,log})
  } 

  createOrder(itemName,stockNo,shopName,qundity,phone){
    return this.http.post('https://foodapp28.herokuapp.com/api/order',{itemName,stockNo,shopName,qundity,phone})
  } 
  
  getDetailsLogin(phone){
    return this.http.get('https://foodapp28.herokuapp.com/api/login',{params:{phone}})
  }
  // getDetailsLogin2(){
  //   return this.http.get('http://localhost:8080/api/login')
  // }
  getDetailsOrder(){
    return this.http.get('https://foodapp28.herokuapp.com/api/order')
  }
   getDetailsStock(){
    return this.http.get('https://foodapp28.herokuapp.com/api/stock')
  }
}
