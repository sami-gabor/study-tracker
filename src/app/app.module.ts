import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SubjectImportanceComponent } from './subject-importance/subject-importance.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubjectImportanceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
