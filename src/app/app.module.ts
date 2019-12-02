import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetDefComponent } from './asset-def/asset-def.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';
import { AdminComponent } from './admin/admin.component';
import { PurchaseManagerComponent } from './purchase-manager/purchase-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { VendoraddComponent } from './vendoradd/vendoradd.component';
import { VendoreditComponent } from './vendoredit/vendoredit.component';
import { VendorlistComponent } from './vendorlist/vendorlist.component';
import { PurchaselistComponent } from './purchaselist/purchaselist.component';
import { PurchaseEditComponent } from './purchaseedit/purchaseedit.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AssetmasterComponent } from './assetmaster/assetmaster.component';
import { AssetmasterlistComponent } from './assetmasterlist/assetmasterlist.component';
import { AssetorderComponent } from './assetorder/assetorder.component';


@NgModule({
  declarations: [
    AppComponent,
    AssetDefComponent,
    AssetListComponent,
    AssetEditComponent,
    AdminComponent,
    PurchaseManagerComponent,
    LoginComponent,
    UserComponent,
    VendoraddComponent,
    VendoreditComponent,
    VendorlistComponent,
    PurchaselistComponent,
    PurchaseEditComponent,
    AssetmasterComponent,
    AssetmasterlistComponent,
    AssetorderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() ,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' 
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
