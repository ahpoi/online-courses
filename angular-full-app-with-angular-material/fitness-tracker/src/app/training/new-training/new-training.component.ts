import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Rx';
import { UIService } from '../../shared/ui.service';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromRoot from '../../app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  // isLoading: Boolean = false;
  isLoading$: Observable<boolean>;

  private exerciseSubscription: Subscription;
  // private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exerciseSubscription = this.trainingService.exercisesChanged
      .subscribe(exercises => {
        this.exercises = exercises
      });
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    // if (this.loadingSubscription) {
    //   this.loadingSubscription.unsubscribe();
    // }
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
