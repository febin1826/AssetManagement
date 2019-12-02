import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchaseorder } from '../purchaseorder';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Assetmaster } from '../assetmaster';
import { AssetmasterService } from '../assetmaster.service';

@Component({
  selector: 'app-assetorder',
  templateUrl: './assetorder.component.html',
  styleUrls: ['./assetorder.component.scss']
})
export class AssetorderComponent implements OnInit {

  purchases: Observable<Purchaseorder[]>;
  
  constructor(private authService:AuthService, private toastr: ToastrService, private router:Router, private masterOrderService: AssetmasterService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.purchases=this.masterOrderService.getAssetOrders();
  }

  Logout(){
    this.authService.logout();
    this.router.navigateByUrl('logout');
  }
}