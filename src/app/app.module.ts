import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SubjectImportanceComponent } from './subject-importance/subject-importance.component';
import { StudentComponent } from './student/student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ScoreHighlightDirective } from './score-highlight.directive';
import { StudentsComponent } from './students/students.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddStudentComponent } from './add-student/add-student.component';


const appRoutes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'student-details', component: StudentDetailsComponent },
  { path: 'settings', component: SubjectImportanceComponent },
  { path: '',   redirectTo: '/students', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubjectImportanceComponent,
    StudentComponent,
    StudentDetailsComponent,
    ScoreHighlightDirective,
    StudentsComponent,
    PageNotFoundComponent,
    AddStudentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
