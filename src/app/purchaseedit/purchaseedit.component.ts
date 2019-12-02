import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Purchaseorder } from '../purchaseorder';
import { PurchaseService } from '../purchase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchaseedit',
  templateUrl: './purchaseedit.component.html',
  styleUrls: ['./purchaseedit.component.scss']
})
export class PurchaseEditComponent implements OnInit {

  purchase: Purchaseorder = new Purchaseorder();
  purchaseForm: FormGroup;
  id: number;

  constructor(private service: PurchaseService, private router: Router, private authService: AuthService, private route: ActivatedRoute, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];

    this.purchaseForm = this.formBuilder.group({
      pd_id: 'null',
      pd_order_no: ['', Validators.compose([Validators.required])],
      assetname: ['', Validators.compose([Validators.required])],
      assettype: ['', Validators.compose([Validators.required])],
      pd_qty: ['', Validators.compose([Validators.required])],
      vendor_name: ['', Validators.compose([Validators.required])],
      pd_status: ['', Validators.compose([Validators.required])],
      pd_odate: ['', Validators.compose([Validators.required])],
      pd_ddate: ['', Validators.compose([Validators.required])]
    });

    this.service.getPurchase(this.id).subscribe(x => {
      this.purchase = x;
    })

  }


  get formControls() {
    return this.purchaseForm.controls;
  }

  updatePurchase() {
    this.purchase.pd_id = this.id;
    this.purchase.pd_odate = this.purchaseForm.controls.pd_odate.value;
    this.purchase.pd_ddate = this.purchaseForm.controls.pd_ddate.value;
    this.purchase.pd_status = 'Consignment Received';
    this.purchase.pd_order_no = this.purchaseForm.controls.pd_order_no.value;
    this.purchase.pd_ad_id = this.purchase.pd_ad_id;
    this.purchase.pd_qty = this.purchase.pd_qty;
    this.purchase.pd_type_id = this.purchase.pd_type_id;
    this.purchase.pd_vendor_id = this.purchase.pd_vendor_id;
    if (this.purchase.pd_odate < this.purchase.pd_ddate) {
      this.service.updatePurchase(this.id, this.purchase).subscribe(res => {
        this.toastr.success('Order Updated');
        this.router.navigateByUrl("plist");
      });
    }
    else {
      this.toastr.error('Delivery date must be greater than Purchase date');
    }

  }

  cancelOrder(value: number) {

  }

}
