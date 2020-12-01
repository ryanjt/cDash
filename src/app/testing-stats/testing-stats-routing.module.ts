import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestingStatsPage } from './testing-stats.page';

const routes: Routes = [
  {
    path: '',
    component: TestingStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestingStatsPageRoutingModule {}
