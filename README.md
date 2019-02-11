# SentryRecursionDemo

A very simple demo, demonstrating how [Sentry's](https://github.com/getsentry/sentry-javascript) breadcrumbs and [Angular's](https://github.com/angular/angular) change detection both work together to cause endless recursion. 

Sentry's breadcrumbs feature records whenever something is logged using `console.log()`. Put simply, a call to `console.log()` will trigger a small bit of Sentry code to add a breadcrumb. After Sentry code finishes, zone.js triggers Angular's change detection (the reason why and how zone.js does this is unclear to me). When angular's change detection runs, it re-runs any functions bound to a property on the view model.

What this all boils down to, is that if `console.log()` is called on a function bound to the view model, it will cause the page to fall into a recursive loop. The page will not freeze, but it _is_ recursion. This can be confirmed by looking at the callstack in devtools, or by adding a simple counter to the view.

To summarize the loop:
`Change detection -> function -> console.log -> Sentry breadcrumb -> Change detection.`

The issue can be avoided if the call to `console.log()` is wrapped to run outside of Angular. This would prevent any logic in the `console.log()` call from triggering change detection, and break the loop.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3.

## The Demo

Most of the demo is pretty self-explanitory, I've just written it out here so there is no ambiguity about the Demo's behavior.

The number at the top of the screen, following `Number of change detection runs:`, represents how many times change detection has run. Note: because the application displays the number of times change detection was run, dev mode change detection will display errors in the console like `Expression has changed after it was checked`. These are unavoidable, given that dev mode change detection looks for values that change before and after change detection was run.

The buttons `Enable console.log`/`Disable console.log` will toggle whether the function bound to the view calls `console.log`. Enabling it will cause the counter to repeatedly increase, via the behavior outlined above.

The buttons `Wrap console.log call`/`Unwrap console.log call` will toggle whether `console.log()` is run outside of Angular. If it run outside of Angular, change detection will not be called recursively.

`Run change detection` will manually trigger change detection.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

