import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class UIService {

  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {
  }

  showSnackbar(message, action = null, duration = 3000) {
    this.snackbar.open(message, action, {duration: duration})
  }

}
