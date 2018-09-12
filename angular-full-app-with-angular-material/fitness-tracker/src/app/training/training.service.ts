import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs/Rx';
import { UIService } from '../shared/ui.service';
import { Exercise } from './exercise.model';
import * as UI from '../shared/ui.actions';
import * as fromTraining from '../training/training.reducer'
import { Store } from '@ngrx/store';
import { SetAvailableTrainings, SetFinishedTrainings, StartTraining, StopTraining } from './training.actions';

@Injectable()
export class TrainingService {

  // exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  // private availableExercise: Exercise[];
  // private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore,
              private uiService: UIService,
              private store: Store<fromTraining.State>) {
  }

  fetchAvailableExercises() {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .map(docArray => docArray.map(doc => {
        const data = doc.payload.doc.data() as {name: string, duration: number, calories: number};
        return ({
          id: doc.payload.doc.id,
          name: data.name,
          duration: data.duration,
          calories: data.calories,
        });
      })).subscribe((exercises: Exercise[]) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        // this.availableExercise = exercises;
        // this.exercisesChanged.next([...this.availableExercise])
        this.store.dispatch(new SetAvailableTrainings(exercises))
      }, error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching exercises failed, please try again');
        this.exercisesChanged.next(null)
      }))
  }

  startExercise(selectedId: string) {
    this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    // this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
    // this.exerciseChanged.next({...this.runningExercise})
    this.store.dispatch(new StartTraining(selectedId))
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
      // this.runningExercise = null;
      // this.exerciseChanged.next(null)
      this.store.dispatch(new StopTraining())
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase(({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.duration * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      }));
      // this.runningExercise = null;
      // this.exerciseChanged.next(null)
      this.store.dispatch(new StopTraining())
    })

  }

  // getRunningExercise() {
  //   return {...this.runningExercise};
  // }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      // this.finishedExercisesChanged.next(exercises)
      this.store.dispatch(new SetFinishedTrainings(exercises));
    }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
  }

}
