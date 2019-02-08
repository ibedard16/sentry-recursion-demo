import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private timesCalled = 0;
  private loggingEnabled = false;

  constructor(private cdr: ChangeDetectorRef) {}

  getTimesFunctionWasCalled() {
    if (this.loggingEnabled) {
      console.log('function called!');
    }
    return ++this.timesCalled;
  }

  toggleLogging() {
    this.loggingEnabled = !this.loggingEnabled;
  }

  runChangeDetection() {
    this.cdr.detectChanges();
  }
}
