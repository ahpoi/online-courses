import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Rx';
import * as fromTraining from './training.reducer';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining$ : Observable<boolean>;
  // exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State> ) {
  }

  ngOnInit() {
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
    //   this.ongoingTraining = exercise ? true : false;
    // })
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }

  // ngOnDestroy(): void {
  //   if (this.exerciseSubscription) {
  //     this.exerciseSubscription.unsubscribe();
  //   }
  // }

}
