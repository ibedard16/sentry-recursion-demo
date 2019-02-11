import { Component, ChangeDetectorRef, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private timesCalled = 0;
  private loggingEnabled = false;
  private consoleLogWrapped = false;
  private originalConsoleLogFunc: (args: any[]) => void;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    this.originalConsoleLogFunc = console.log;
  }

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

  wrapConsoleLog() {
    if (this.consoleLogWrapped) {
      return;
    }

    console.log = (...args) => {
      this.zone.runOutsideAngular(() => this.originalConsoleLogFunc(args));
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
