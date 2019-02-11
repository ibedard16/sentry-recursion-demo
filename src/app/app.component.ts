import { Component, ChangeDetectorRef, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private timesChangeDetectionRun = 0;
  private loggingEnabled = false;
  private consoleLogWrapped = false;
  private originalConsoleLogFunc: (message?: any, ...optionalParams: any[]) => void;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    this.originalConsoleLogFunc = console.log;
  }

  getChangeDetectionRunCount() {
    if (this.loggingEnabled) {
      console.log('function called!');
    }

    return ++this.timesChangeDetectionRun;
  }

  enableLogging() {
    this.loggingEnabled = true;
  }

  disableLogging() {
    this.loggingEnabled = false;
  }

  runChangeDetection() {
    this.cdr.detectChanges();
  }

  wrapConsoleLog() {
    if (this.consoleLogWrapped) {
      return;
    }

    console.log = (message: any, ...optionalParams: any[]) => {
      this.zone.runOutsideAngular(() => this.originalConsoleLogFunc(message, optionalParams));
    };
    this.consoleLogWrapped = true;
  }

  unwrapConsoleLog() {
    if (!this.consoleLogWrapped) {
      return;
    }

    console.log = this.originalConsoleLogFunc;
    this.consoleLogWrapped = false;
  }
}
