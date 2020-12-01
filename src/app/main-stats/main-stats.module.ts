import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainStatsPageRoutingModule } from './main-stats-routing.module';

import { MainStatsPage } from './main-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainStatsPageRoutingModule
  ],
  declarations: [MainStatsPage]
})
export class MainStatsPageModule {}
