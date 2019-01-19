import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
  }
  onSelect() {
    console.log('button clicked');
  }
}
