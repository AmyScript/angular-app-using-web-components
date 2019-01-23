import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {DsgInput} from '@amyscript/dsg-input';
import { getWeatherData } from './getWeatherData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  title = 'web-components';
  city = '';
  hourlyConditions = [];
  currentConditions = null;
  currentDate = '';
  queryLocation = '';
  showHourly = false;
  constructor() { }

  ngOnInit() {
    this.onSelect = this.onSelect.bind(this);
    document.addEventListener('buttonClicked', async(e: any) => {
      if (e.detail.button === 'city-input-button') {
        const cityInput = <DsgInput>document.getElementById('city-custom-input-element');
        this.city = cityInput.getAttribute('value');
        await this.handleCityUpdate(this.city);
      }
    });
  }

  parseData = weatherData => {
    this.hourlyConditions = weatherData.weather[0].hourly;
    this.currentConditions = weatherData.current_condition[0];
    this.currentDate = weatherData.weather[0].date;
    this.queryLocation = weatherData.request[0].query;

  }

  handleCityUpdate = (city) => {
    city = city;
    let weatherData = '';
    if (city !== '' || city !== undefined) {
      getWeatherData(city).then(res => {
        if (res !== null) {
          weatherData = res;
          this.parseData(weatherData);
        }
      });
    }
    const cityInput = <DsgInput>document.getElementById('city-custom-input-element');
    cityInput.value = '';
  }

  onSelect() {
    console.log('button clicked');
  }
}
