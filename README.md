# CipresUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## important package to import


to import @auth0/angular-jwt type this command:
npm install @auth0/angular-jwt

//to import graphs
//https://swimlane.gitbook.io/ngx-charts/installing  ==> documentation
//https://swimlane.github.io/ngx-charts/#/ngx-charts/bar-vertical  ==> demo
npm install @swimlane/ngx-charts --save

to make pagination use this command:
npm install ngx-pagination --save


To make widzard angular5+ :
npm install --save angular-archwizard   ......................https://www.npmjs.com/package/angular-archwizard

import { ArchwizardModule } from 'angular-archwizard';
 
@NgModule({
  imports: [
    ArchwizardModule
  ],
})
