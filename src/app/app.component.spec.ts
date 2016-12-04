import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';


describe('App', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppComponent
    ]
  }));

});
