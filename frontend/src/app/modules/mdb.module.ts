import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { WavesModule, ButtonsModule } from 'angular-bootstrap-md';

@NgModule({
    imports: [
      WavesModule,
      ButtonsModule
    ],
    exports: [
      WavesModule,
      ButtonsModule
    ],
    schemas: [
      NO_ERRORS_SCHEMA
    ]
})
export class MDBModule {

}
