import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Assetmaster } from '../assetmaster';
import { Purchaseorder } from '../purchaseorder';
import { PurchaseService } from '../purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetmasterService } from '../assetmaster.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assetmaster',
  templateUrl: './assetmaster.component.html',
  styleUrls: ['./assetmaster.component.scss']
})
export class AssetmasterComponent implements OnInit {

  master: Assetmaster=new Assetmaster();
  purchase: Purchaseorder=new Purchaseorder();
  masterForm: FormGroup;

  constructor(private authService: AuthService, private purchaseService:PurchaseService, private router: Router, private service: AssetmasterService, private route: ActivatedRoute, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  id:string;

  ngOnInit() {
    this.id=this.route.snapshot.params["id"];
    console.log(this.id);

    this.masterForm=this.formBuilder.group({
      am_ad_name: [Validators.required],
      am_atype_name : ['',Validators.compose([Validators.required])],
      am_make_name: ['',Validators.compose([Validators.required])],
      am_qty: ['',Validators.compose([Validators.required])],
      am_myyear: ['',Validators.compose([Validators.required])],
      am_warranty: ['',Validators.compose([Validators.required])],
      am_model: ['',Validators.compose([Validators.required])],
      am_from:[''],
      am_to: ['']

    }); 
    this.service.getAssetOrder(this.id).subscribe(res=>{
      this.purchase=res;
      this.master.am_ad_name=res["assetname"];
      this.master.am_atype_name=res["assettype"];
      
      this.master.am_make_name=res["vendor_name"];
      console.log(res["vendor_name"]);
      this.master.am_qty=res["pd_qty"];
      this.master.am_pdate=res["pd_ddateStr"];

    })


  }

  get formControls(){
    return this.masterForm.controls;
  }

  Logout(){
    this.authService.logout();
    this.router.navigateByUrl('logout');
  }

  addAsset(){
    
    this.master.am_myyear=this.masterForm.controls.am_myyear.value;
    this.master.am_warranty=this.masterForm.controls.am_warranty.value;
    this.master.am_from=this.masterForm.controls.am_from.value;
    this.master.am_to=this.masterForm.controls.am_to.value;
    this.master.am_atype_id=this.purchase.pd_type_id;
    this.master.am_make_id=this.purchase.pd_vendor_id;
    this.master.am_ad_id=this.purchase.pd_ad_id;
    this.master.am_model=this.masterForm.controls.am_model.value;
    this.purchase.pd_status='Asset Approved by Admin';
    this.service.updatePurchase(this.purchase.pd_id, this.purchase).subscribe();
    this.service.postAsset(this.master).subscribe(x=>{
      this.toastr.success('Asset Registered Successfully');
      this.router.navigateByUrl('masterlist');
    })
    

  }

  

}
