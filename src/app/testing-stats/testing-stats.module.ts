import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestingStatsPageRoutingModule } from './testing-stats-routing.module';

import { TestingStatsPage } from './testing-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestingStatsPageRoutingModule
  ],
  declarations: [TestingStatsPage]
})
export class TestingStatsPageModule {}
