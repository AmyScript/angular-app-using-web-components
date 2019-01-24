import { Component, OnInit
} from '@angular/core';

import {DsgInput} from '@amyscript/dsg-input';
import { getWeatherData } from './getWeatherData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'web-components';
  cityInput = '';
  queryCity = '';
  hourlyConditions = [];
  currentConditions = null;
  currentDate = '';
  queryLocation = '';
  showHourly = false;

  ngOnInit() {
    this.onSelect = this.onSelect.bind(this);
    document.addEventListener('buttonClicked', async(e: any) => {
      if (e.detail.button === 'city-input-button') {
        const cityInput = <DsgInput>document.getElementById('city-custom-input-element');
        this.queryCity = cityInput.getAttribute('cityprop');
        await this.handleCityUpdate(this.queryCity);
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
    let weatherData = '';
    if (city !== '' || city !== undefined) {
      getWeatherData(city).then(res => {
        if (res !== null) {
          weatherData = res;
          this.parseData(weatherData);
        }
      });
    }
    // clear the input field
    const cityInputElement = <DsgInput>document.getElementById('city-custom-input-element');
    cityInputElement.setAttribute('cityprop', '');
  }


  onSelect() {
    console.log('Executed callback passed to dsg-input-button');
  }
}
