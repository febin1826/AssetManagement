import { DeprecatedDatePipe } from '@angular/common';

export class Purchaseorder {
    pd_id: number;
    pd_order_no: string;
    pd_ad_id: number;
    pd_type_id: number;
    assetname:string;
    assettype: string;
    vendor_name: string;
    pd_qty: number;
    pd_vendor_id: number;
    pd_odate: Date;
    pd_ddate: Date;
    pd_status: string; 
}
