import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchaseorder } from './purchaseorder';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl = 'http://localhost:59259/api';

  constructor(private http: HttpClient) { }
  getpurchaseList(): Observable<any> {
    return this.http.get(this.baseUrl + '/Purchase_Order');
  }
  addpurchase(purchase: Purchaseorder) {
    return this.http.post(this.baseUrl + '/Purchase_Order', purchase);

  }
  getAssetTypes(na: string): Observable<any> {
    return this.http.get(this.baseUrl + '/Purchase_Order?name='+na);
  }
  getallAssetTypes(): Observable<any> {
    return this.http.get(this.baseUrl + '/Asset_Type');
  }
  getAsset(name: string): Observable<any> {
    return this.http.get(this.baseUrl + '/asset_def?na=' + name);
  }
  getVendor(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/Purchase_Order/' + id);
  }
  getPurchase(id:number):Observable<any> {
    return this.http.get(this.baseUrl + '/Purchase_Edit/' + id);
  }
  updatePurchase(id:number,purchase:Purchaseorder):Observable<any> {
    return this.http.put(this.baseUrl + '/Purchase_Edit/' + id,purchase);
  }
  cancelPurchase(id:number):Observable<any> {
    return this.http.delete(this.baseUrl + '/Purchase_Edit/' + id);
  }
}

