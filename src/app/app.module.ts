import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { SubjectComponent } from './00-subject/subject.component';
import { ForkjoinMergemapConcatmapComponent } from './99_forkjoin-mergemap-concatmap/forkjoin-mergemap-concatmap.component';
import { CreateObserversComponent } from './01_create-observers/create-observers.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    SubjectComponent,
    CreateObserversComponent,
    ForkjoinMergemapConcatmapComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
