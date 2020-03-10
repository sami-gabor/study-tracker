import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxUiLoaderModule } from  'ngx-ui-loader';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SubjectImportanceComponent } from './subject-importance/subject-importance.component';
import { StudentComponent } from './student/student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ScoreHighlightDirective } from './score-highlight.directive';
import { StudentsComponent } from './students/students.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ReverseStringPipe } from './reverse-string.pipe';
import { SortByPipe } from './sort-by.pipe';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';
import { CanDeactivateGuard } from './add-student/can-deactivate-guard.service';


const appRoutes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'students/:id/edit', component: AddStudentComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'students/:id', component: StudentDetailsComponent },
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
    AddStudentComponent,
    ReverseStringPipe,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgxUiLoaderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    },
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
