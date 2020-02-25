import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SubjectImportanceComponent } from './subject-importance/subject-importance.component';
import { StudentComponent } from './student/student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ScoreHighlightDirective } from './score-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubjectImportanceComponent,
    StudentComponent,
    StudentDetailsComponent,
    ScoreHighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
