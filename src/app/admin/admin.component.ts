import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private locationStrategy: LocationStrategy) {
    history.pushState(null,null,window.location.href);
    this.locationStrategy.onPopState(()=>{
      history.pushState(null,null,window.location.href);
    });
   }

  ngOnInit() {
  }

}
