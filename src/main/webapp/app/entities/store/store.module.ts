import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EquipmentManagementSharedModule } from 'app/shared/shared.module';
import { StoreComponent } from './store.component';
import { StoreDetailComponent } from './store-detail.component';
import { StoreUpdateComponent } from './store-update.component';
import { StoreDeleteDialogComponent } from './store-delete-dialog.component';
import { StoreRoute, storeRoute } from './store.route';
import { EquipmentManagementStoreEquipmentModule } from '../store-equipment/store-equipment.module';
import { StoreEquipmentComponent } from '../store-equipment/store-equipment.component';

@NgModule({
  imports: [StoreRoute, EquipmentManagementStoreEquipmentModule, EquipmentManagementSharedModule],
  declarations: [StoreComponent, StoreDetailComponent, StoreUpdateComponent, StoreDeleteDialogComponent],
  entryComponents: [StoreDeleteDialogComponent],
})
export class EquipmentManagementStoreModule {}
