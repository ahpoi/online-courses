import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];

  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
