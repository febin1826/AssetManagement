import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchaseorder } from './purchaseorder';
import { Assetmaster } from './assetmaster';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetmasterService {
  private baseUrl = 'http://localhost:59259/api';

  constructor(private http: HttpClient) { }
  getAssetOrders(): Observable<any>{
    return this.http.get(this.baseUrl+'/Asset_MasterOrder');
  }

  getAssetOrder(id:string): Observable<any>{
    return this.http.get(this.baseUrl+'/Asset_MasterOrder?ordno='+id);
  }

  postAsset(asset: Assetmaster){
    return this.http.post(this.baseUrl+'/Asset_Master',asset);
  }

  updatePurchase(id:number, purchase: Purchaseorder): Observable<any>{
    return this.http.put(this.baseUrl+'/Asset_Master/'+ id, purchase);
  }

  getMasterList(): Observable<any>{
    return this.http.get(this.baseUrl+'/Asset_Master');
  }
  
  
  
  
}

