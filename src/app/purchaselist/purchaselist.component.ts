import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseService } from '../purchase.service';
import { Router } from '@angular/router';
import { Purchaseorder } from '../purchaseorder';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchaselist',
  templateUrl: './purchaselist.component.html',
  styleUrls: ['./purchaselist.component.scss']
})
export class PurchaselistComponent implements OnInit {
  public popoverTitle: string = 'Cancel Order..?';
  public popoverMessage: string = 'If sure, click Confirm..!!';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  purchase: Observable<Purchaseorder>;
  purchases: Observable<Purchaseorder[]>;
  constructor(private purchaseservice: PurchaseService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.purchase = this.purchaseservice.getpurchaseList();
    this.purchases = this.purchaseservice.getpurchaseList();

  }
  cancelOrder(id: number) {
    this.purchaseservice.cancelPurchase(id).subscribe(res => {
      this.toastr.success('Order Cancelled..!!');
      this.reloadData();
    })

  }
}
