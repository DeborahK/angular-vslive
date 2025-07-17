import { Component } from '@angular/core';
import { VehicleList } from "../vehicle-list/vehicle-list";
import { VehicleDetail } from "../vehicle-detail/vehicle-detail";

@Component({
    selector: 'sw-vehicle-shell',
    template: `
  <div class='row'>
    <div class='col-md-4'>
        <sw-vehicle-list></sw-vehicle-list>
    </div>
    <div class='col-md-8'>
        <sw-vehicle-detail></sw-vehicle-detail>
    </div>
</div>
  `,
    imports: [VehicleList, VehicleDetail]
})
export class VehicleShell {

}
