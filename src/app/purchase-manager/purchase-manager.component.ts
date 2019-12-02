import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '../purchase.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Purchaseorder } from '../purchaseorder';
import { Observable } from 'rxjs';
import { AssetType } from '../asset-type';
import { Vendor } from '../vendor';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-purchase-manager',
  templateUrl: './purchase-manager.component.html',
  styleUrls: ['./purchase-manager.component.scss']
})
export class PurchaseManagerComponent implements OnInit {
  purchaseForm: FormGroup;
  purchase: Purchaseorder = new Purchaseorder();
  assetId: number;
  assettypes:Observable<AssetType[]>;
  vendor: Observable<Vendor>;
  vendors: Observable<Vendor[]>;
  constructor(private authservice: AuthService,private formBuilder: FormBuilder, private purchaseservice: PurchaseService,private route:ActivatedRoute,
    private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData()
  {
    this.purchaseForm = this.formBuilder.group({
      pd_order_no:['ORD'+Math.floor((Math.random()*10000)+1),Validators.compose([Validators.required])],

      pd_type_id: ['', Validators.compose([Validators.required])],
      pd_qty: ['', Validators.compose([Validators.required])],
      pd_vendor_id: ['', Validators.compose([Validators.required])]
     
     
  });
}
onOptionsSelected(value: number){

  console.log(value);
  this.vendors=this.purchaseservice.getVendor(value);
  this.purchaseservice.getVendor(value).subscribe(data=>{
    console.log("vendor",data);
  })
  this.vendors.forEach(x=>{
    console.log(x);
  })
}
Logout(){
  this.authservice.logout();
  this.router.navigateByUrl("login");
}
  searchAssetType(name:string)
  {
    this.assettypes=this.purchaseservice.getAssetTypes(name);
    this.purchaseservice.getAsset(name).subscribe(res=>{
      res.forEach(element => {
        
        this.assetId=element["ad_id"];
        console.log(this.assetId);
      });
      
    })
  }
addorder()
{
  console.log(this.assetId);
  this.purchase.pd_order_no=this.purchaseForm.controls.pd_order_no.value;
  this.purchase.pd_ad_id=this.assetId;
  this.purchase.pd_type_id=this.purchaseForm.controls.pd_type_id.value;
  this.purchase.pd_qty=this.purchaseForm.controls.pd_qty.value;
  this.purchase.pd_vendor_id=this.purchaseForm.controls.pd_vendor_id.value;
  this.purchase.pd_status="PO-Raised with Supplier";
  this.purchaseservice.addpurchase(this.purchase).subscribe(res=>{
    this.toastr.success('Success ', 'Order Placed');
  })
}
}
