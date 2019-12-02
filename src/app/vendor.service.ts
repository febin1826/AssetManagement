import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Vendor } from './vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private baseUrl = 'http://localhost:59259/api';

  constructor(private http: HttpClient) { }
  getvendorList(): Observable<any> {
    return this.http.get(this.baseUrl + '/Vendor_Creation');
  }
  addVendor(ven: Vendor) {
    return this.http.post(this.baseUrl + '/Vendor_Creation/', ven);
  }
  deleteVendor(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/Vendor_Creation/'+id);
  }
  updateVendor(id: number,vendor: Vendor)
  {
    return this.http.put(this.baseUrl+'/Vendor_Creation/'+id,vendor);
  }
  getAssetTypes():Observable<any>{
    return this.http.get(this.baseUrl+'/Asset_type');
  }
  getAssetType(id:number):Observable<any>{
    return this.http.get(this.baseUrl+'/Asset_type'+id);
  }
  getVendor(id: number):Observable<any>
  {
    return this.http.get(this.baseUrl+'/Vendor_Creation/'+id);
  }
  putVendor(id:number,Vendor:Vendor):Observable<any>{
    return this.http.put(this.baseUrl+'/Vendor_Creation/'+id,Vendor);
  }
 

}
