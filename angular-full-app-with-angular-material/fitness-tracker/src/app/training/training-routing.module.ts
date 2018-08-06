import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingComponent } from './training.component';

const routes: Routes = [
  //Empty path as will be appended from the lazily loading app-routing-module to 'training'
  {path: '', component: TrainingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingRoutingModule {

}
