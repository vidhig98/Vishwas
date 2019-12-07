import { Component, OnInit } from "@angular/core";
import { InventoryService } from "src/app/services/inventory.service";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"]
})
export class InventoryComponent implements OnInit {
  positions = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getInventorys().subscribe((res: any) => {
      // console.log(res);
      this.positions = res;
    });
  }
}
