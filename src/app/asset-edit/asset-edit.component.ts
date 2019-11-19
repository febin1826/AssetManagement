import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetDef } from '../asset-def';
import { ToastrService } from 'ngx-toastr';
import { AssetDefService } from '../asset-def.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.scss']
})
export class AssetEditComponent implements OnInit {
  assetForm: FormGroup;
  asset: AssetDef = new AssetDef();
  ad_id: number;
  constructor(private formBuilder: FormBuilder, private service: AssetDefService,private route:ActivatedRoute,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.assetForm=this.formBuilder.group({
      ad_name: ['', Validators.compose([Validators.required])],
      ad_type_id: ['', Validators.compose([Validators.required])],
      ad_class: ['', Validators.compose([Validators.required])],
  });
  this.ad_id=this.route.snapshot.params["id"];
    console.log(this.ad_id)

  this.service.getAsset(this.ad_id).subscribe(x=>{
    console.log(x);
      this.asset=x;
      //console.log(this.asset);
     
  },
  error => console.log(error));
}

get formControls()
{
  return this.assetForm.controls;
}
updateAsset()
  {
    this.asset.ad_id=this.assetForm.controls.ad_id.value;
    this.asset.ad_name=this.assetForm.controls.ad_name.value;
    this.asset.ad_type_id=this.assetForm.controls.ad_type_id.value;
    this.asset.ad_class=this.assetForm.controls.ad_class.value;
    
    this.service.updateAsset(this.ad_id,this.asset).subscribe(res=>{
      this.toastr.success('Updated Successfully..!!', 'Success');
      this.ngOnInit();
    });
  }



}
