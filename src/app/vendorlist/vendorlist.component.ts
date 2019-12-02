import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendorlist',
  templateUrl: './vendorlist.component.html',
  styleUrls: ['./vendorlist.component.scss']
})
export class VendorlistComponent implements OnInit {

  vendor: Observable<Vendor>;
  vendors: Observable<Vendor[]>;
 

  constructor(private vendordefService: VendorService,private router: Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.vendor = this.vendordefService.getvendorList();
    this.vendors = this.vendordefService.getvendorList();

}
deleteVendor(id:number){
  if(confirm('Do you want to delete this record?'))
  {
    this.vendordefService.deleteVendor(id).subscribe(data=>{
      this.toastr.success('Deleted Successfully..!!', 'Success!!');
      console.log(data);
      this.reloadData();
      this.router.navigateByUrl('/vendorlist')
    })
  }
}
/*search(productname:string)
{
  //this.vendor=this.vendordefService.searchvendor(productname);
  if(productname="")
  {
    this.vendor=this.vendordefService.getvendorList();
  }
}*/


}
