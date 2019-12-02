import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AssetmasterService } from '../assetmaster.service';
import { Assetmaster } from '../assetmaster';

@Component({
  selector: 'app-assetmasterlist',
  templateUrl: './assetmasterlist.component.html',
  styleUrls: ['./assetmasterlist.component.scss']
})
export class AssetmasterlistComponent implements OnInit {

  masters: Observable<Assetmaster[]>;

  constructor(private authService: AuthService, private router: Router, private masterService: AssetmasterService) { }

  ngOnInit() {
    this.reloadData();
  }


  reloadData(){
    this.masters=this.masterService.getMasterList();
    this.masters.forEach(x=>{
    console.log(x);
    })
  }

  Logout(){
    this.authService.logout();
    this.router.navigateByUrl('logout');
  }
}
