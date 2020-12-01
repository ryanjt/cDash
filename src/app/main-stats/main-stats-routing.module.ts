import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainStatsPage } from './main-stats.page';

const routes: Routes = [
  {
    path: '',
    component: MainStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainStatsPageRoutingModule {}
