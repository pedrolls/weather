import { WeatherDatas } from 'src/app/models/interfaces/WeatherDatas';
import { WeatherService } from './../../services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy{

  public initialCityName: string = 'Recife';
  weatherDatas!: WeatherDatas;
  //Propriedade de assinatura para se desiscrever do observable quando o componente e fechado.
  private readonly destroy$: Subject<void> = new Subject();
  searchIcon = faMagnifyingGlass;

  constructor(private WeatherService: WeatherService){  }

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName:string ): void {
    this.WeatherService.getWatherDatas(cityName)
    .pipe(takeUntil(this.destroy$)) //O takeUntil passamos a assinatura (o subject) antes de se inscrever no observable para se desiscrever quando fechar o componente.
    .subscribe({
      next: (response) => {
        response && (this.weatherDatas = response);
        console.log(response);
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    //FAzendo a desiscrição do observable quando o componente é destruído
    this.destroy$.next();
    this.destroy$.complete();
  }
}
