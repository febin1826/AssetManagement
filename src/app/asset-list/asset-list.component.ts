import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetDef } from '../asset-def';
import { AssetDefService } from '../asset-def.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  asset: Observable<AssetDef>;
  assets: Observable<AssetDef[]>;


  constructor(private assetdefService: AssetDefService, private router: Router, private toastr: ToastrService,private authservice:AuthService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.asset = this.assetdefService.getAssetList();
    this.assets = this.assetdefService.getAssetList();

  }
  deleteAsset(id: number) {
    if (confirm('Do you want to delete this record?')) {
      this.assetdefService.deleteAsset(id).subscribe(data => {
        this.toastr.success('Deleted Successfully..!!', 'Success');
        console.log(data);
        this.reloadData();
        this.router.navigateByUrl('/assets')
      })
    }
  }
  search(ad_name: string) {
    if (ad_name == "") {
      this.assets = this.assetdefService.getAssetList();

    }
    else {
      
      this.assets = this.assetdefService.searchAsset(ad_name);
      this.assets.forEach(x=>{
        x.forEach(res=>{
          console.log(res.ad_name);
        })
      })
    }
  }
  Logout(){
    this.authservice.logout();
    this.router.navigateByUrl("login");
  }


}
