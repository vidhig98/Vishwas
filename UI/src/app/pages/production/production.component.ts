import { Component, OnInit } from "@angular/core";
import { ProductionService } from "src/app/services/production.service";

@Component({
  selector: "app-production",
  templateUrl: "./production.component.html",
  styleUrls: ["./production.component.scss"]
})
export class ProductionComponent implements OnInit {
  positions = [];

  constructor(private productionService: ProductionService) {}

  ngOnInit() {
    this.productionService.getProductions().subscribe((res: any) => {
      // console.log(res);
      this.positions = res;
    });
  }
}
