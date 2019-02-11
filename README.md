# SentryRecursionDemo

A very simple demo, demonstrating how [Sentry's](https://github.com/getsentry/sentry-javascript) breadcrumbs and [Angular's](https://github.com/angular/angular) change detection both work together to cause endless recursion. 

Sentry's breadcrumbs feature records whenever something is logged using `console.log()`. Put simply, a call to `console.log()` will trigger a small bit of Sentry code to add a breadcrumb. After Sentry code finishes, zone.js triggers Angular's change detection (the reason why and how zone.js does this is unclear to me). When angular's change detection runs, it re-runs any functions bound to a property on the view model.

What this all boils down to, is that if `console.log()` is called on a function bound to the view model, it will cause the page to fall into a recursive loop. The page will not freeze, but it _is_ recursion. This can be confirmed by looking at the callstack in devtools, or by adding a simple counter to the view.

To summarize the loop:
`Change detection -> function -> console.log -> Sentry breadcrumb -> Change detection.`

The issue can be avoided if the call to `console.log()` is wrapped to run outside of Angular. But that seems impractical.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

