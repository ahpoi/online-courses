import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Rx';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();

  private availableExercise: Exercise[];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {
  }

  fetchAvailableExercises() {
    this.db.collection('availableExercises')
      .snapshotChanges()
      .map(docArray => docArray.map(doc => ({
        id: doc.payload.doc.id,
        name: doc.payload.doc.data().name,
        duration: doc.payload.doc.data().duration,
        calories: doc.payload.doc.data().calories,
      }))).subscribe((exercises: Exercise[]) => {
      this.availableExercise = exercises;
      this.exercisesChanged.next([...this.availableExercise])
    })
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise})
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null)
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null)
  }

  getRunningExercise() {
    return {...this.runningExercise}
  }

  getCompletedOrCancelledExercises(): Exercise[] {
    return this.exercises.slice();
  }

}
