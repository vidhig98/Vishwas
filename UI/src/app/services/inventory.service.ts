import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Position } from '../pages/inventory/item/item';

@Injectable({
    providedIn: "root"
})
export class InventoryService {
    constructor(private http: HttpClient) { }

    getInventory(inventoryID: string) {
        return this.http.get(`${environment.API_URL}/inventorys/${inventoryID}`);
    }

    getInventorys() {
        return this.http.get(`${environment.API_URL}/inventorys`);
    }

    addInventory(inventory: any) {
        return this.http.post(`${environment.API_URL}/inventorys`, inventory);
    }

    updateInventory(inventoryID: string, inventory: Position) {
        return this.http.put(`${environment.API_URL}/inventorys/${inventoryID}`, inventory);
    }
}
