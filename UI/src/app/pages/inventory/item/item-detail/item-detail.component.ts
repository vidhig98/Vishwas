import { Component, OnInit } from "@angular/core";
import { InventoryService } from "src/app/services/inventory.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Position } from "../item";

@Component({
  selector: "app-item-detail",
  templateUrl: "./item-detail.component.html",
  styleUrls: ["./item-detail.component.scss"]
})
export class ItemDetailComponent implements OnInit {
  position: Position;
  id: string;

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
  }

  ngOnInit() {
    this.inventoryService.getInventory(this.id).subscribe((res: any) => {
      // console.log(res);
      this.position = new Position(res);
    });
  }
}
