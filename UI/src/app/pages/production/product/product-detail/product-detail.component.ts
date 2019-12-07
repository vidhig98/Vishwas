import { Component, OnInit } from "@angular/core";
import { ProductionService } from "src/app/services/production.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Position } from "../product";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  position: Position;
  id: string;

  constructor(
    private productionService: ProductionService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
  }

  ngOnInit() {
    this.productionService.getProduction(this.id).subscribe((res: any) => {
      // console.log(res);
      this.position = new Position(res);
    });
  }
}
