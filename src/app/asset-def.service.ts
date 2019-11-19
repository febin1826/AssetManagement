import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetDef } from './asset-def';

@Injectable({
  providedIn: 'root'
})
export class AssetDefService {
  private baseUrl = 'http://localhost:59259/api';

  constructor(private http: HttpClient) { }
  getAssetList(): Observable<any> {
    return this.http.get(this.baseUrl + '/asset_def');
  }
  deleteAsset(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/asset_def/'+id);
  }
  getAsset(id: number):Observable<any>
  {
    return this.http.get(this.baseUrl+'/asset_def/'+id);
  }
  updateAsset(id: number,asset: AssetDef)
  {
    return this.http.put(this.baseUrl+'/asset_def/'+id,asset);
  }
  addAsset(ast:AssetDef)
  {
    return this.http.post(this.baseUrl+'/asset_def/',ast);
  }
  searchAsset(name:string):Observable<any>
  {
    return this.http.get(this.baseUrl+'/assets?name=/'+name);
  }
}

