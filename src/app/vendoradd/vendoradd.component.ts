import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from '../vendor.service';
import { Observable } from 'rxjs';
import { Vendor } from '../vendor';
import { AssetType } from '../asset-type';

@Component({
  selector: 'app-vendoradd',
  templateUrl: './vendoradd.component.html',
  styleUrls: ['./vendoradd.component.scss']
})
export class VendoraddComponent implements OnInit {
  vendorForm: FormGroup;
  vendor: Vendor = new Vendor();
  id: number;
  assettypes:Observable<AssetType[]>;

  
constructor(private formBuilder: FormBuilder,private router: Router, private toastr: ToastrService,private vendorService:VendorService) { }

ngOnInit() {

  this.vendorForm = this.formBuilder.group({
    vd_name: ['', Validators.compose([Validators.required])],
    vd_type: 'Supplier',
    vd_atype_id: ['', Validators.compose([Validators.required])],
    vd_from: ['', Validators.compose([Validators.required])],
    vd_to: ['', Validators.compose([Validators.required])],
    vd_addr: ['', Validators.compose([Validators.required])],

  });
  this.assettypes=this.vendorService.getAssetTypes();
}
reloadData() {
  
}
addVendor(){
  this.vendor.vd_name = this.vendorForm.controls.vd_name.value;
  this.vendor.vd_type = this.vendorForm.controls.vd_type.value;
  this.vendor.vd_atype_id = this.vendorForm.controls.vd_atype_id.value;
  this.vendor.vd_from = this.vendorForm.controls.vd_from.value;
  this.vendor.vd_to = this.vendorForm.controls.vd_to.value;
  this.vendor.vd_addr = this.vendorForm.controls.vd_addr.value;


  this.vendorService.addVendor(this.vendor).subscribe(res=>{
    if(res==1)
    {
      this.toastr.success('Success ', 'Added Successfully');
      this.router.navigateByUrl('/vendorlist')

    }
    else
    {
      this.toastr.error("Vendor already exist");
    }
  });

  this.ngOnInit();

}

}
