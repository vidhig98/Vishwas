import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Position } from '../pages/production/product/product';

@Injectable({
    providedIn: "root"
})
export class ProductionService {
    constructor(private http: HttpClient) { }

    getProduction(productionID: string) {
        return this.http.get(`${environment.API_URL}/productions/${productionID}`);
    }

    getProductions() {
        return this.http.get(`${environment.API_URL}/productions`);
    }

    addProduction(production: any) {
        return this.http.post(`${environment.API_URL}/productions`, production);
    }

    updateProduction(productionID: string, production: Position) {
        return this.http.put(`${environment.API_URL}/productions/${productionID}`, production);
    }
}
