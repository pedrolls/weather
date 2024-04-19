import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'b82bfa191cb9c6f5319032fb15d81d58';

  constructor(private http : HttpClient) { }

  getWatherDatas(cityName: string): Observable<any>{
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`,{}
      )
  };
}
