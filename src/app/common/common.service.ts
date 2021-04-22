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

  // API for mits Atrts
  getScore(){
    return this.http.get('https://mitsarts2021.herokuapp.com/api/score')
  }
  updateScore(score){
      var red=score.red
      var green = score.green;
      var blue = score.blue;
      var yellow = score.yellow;
       return this.http.put('https://mitsarts2021.herokuapp.com/api/score',{red,green,blue,yellow})
  }
  getEvent(){
    return this.http.get('https://mitsarts2021.herokuapp.com/api/event')
  }
  createEvent(eventName,eventCategory,eventTime,eventWinner){
    return this.http.post('https://mitsarts2021.herokuapp.com/api/event',{eventName,eventCategory,eventTime,eventWinner})
  }
  updateEvent(_id,eventName,eventCategory,eventTime,eventWinner){
    return this.http.put('https://mitsarts2021.herokuapp.com/api/event',{_id,eventName,eventCategory,eventTime,eventWinner})

  }
  deleteEvent(_id){
    return this.http.delete('https://mitsarts2021.herokuapp.com/api/event',{params:{_id}})
  }
}
