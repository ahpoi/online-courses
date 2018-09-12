import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer'
import { Exercise } from '../exercise.model';
import * as fromTraining from '../training.reducer'
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  // isLoading: Boolean = false;
  // private exerciseSubscription: Subscription;
  // private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    // this.exerciseSubscription = this.trainingService.exercisesChanged
    //   .subscribe(exercises => {
    //     this.exercises = exercises
    //   });
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }

  // ngOnDestroy(): void {
    // if (this.exerciseSubscription) {
    //   this.exerciseSubscription.unsubscribe();
    // }
    // if (this.loadingSubscription) {
    //   this.loadingSubscription.unsubscribe();
    // }
  // }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
