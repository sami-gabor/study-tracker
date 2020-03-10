import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NgxUiLoaderService } from 'ngx-ui-loader';

import { ImportanceService } from '../importance.service';
import { FirebaseStudentsService } from '../firebase-students.service';
import { Student } from 'src/interfaces/student.interface';
import { StudentsSetvice } from '../students.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';


const studentTemplate: Student = {
  id: '0',
  name: 'Enter name',
  photo: 'Enter url',
  grades: {
    math: 0,
    english: 0,
    biology: 0
  },
  description: 'Enter description',
  score: 0
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit, CanComponentDeactivate {
  student: Student = studentTemplate;
  private _newStudent: Student;
  existingStudent: boolean = false;
  studentSubjects: string[];
  isLoading: boolean;
  changesSaved: boolean = false;

  constructor(
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private importanceService: ImportanceService,
    private studentsService: StudentsSetvice,
    private firebaseStudentsService: FirebaseStudentsService
  ) { }

  get newStudent() {
    return this._newStudent;
  }

  set newStudent(student) {
    this._newStudent = student;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isLoading = true;
      this.ngxService.start();
      this.existingStudent = true;

      this.firebaseStudentsService.fetchStudent(id).subscribe(student => {
        this.newStudent = student;
        this.student = JSON.parse(JSON.stringify(student));
        this.isLoading = false;
        this.ngxService.stop();
      });
    } else {
      this.newStudent = studentTemplate;
    }

    this.studentSubjects = Object.keys(this.importanceService.percentages);
  }

  onSaveNewStudent() {
    this.firebaseStudentsService.fetchImportancePercentages().subscribe(percentages => {
      this.newStudent.score = this.studentsService.calculateStudentScore(this.newStudent.grades, percentages);

      if (this.existingStudent) {
        this.firebaseStudentsService.updateStudent(this.newStudent).subscribe(responseData => {
          console.log('Student updated: ', responseData);
          this.changesSaved = true;
          this.router.navigate(['/students']);
        });
      } else {
        this.firebaseStudentsService.postStudent(this.newStudent).subscribe(responseData => {
          this.firebaseStudentsService.updateStudentId(Object.values(responseData)[0]).subscribe(response => {
            console.log('Student id updated: ', response);
            this.changesSaved = true;
            this.router.navigate(['/students']);
          });
        });
      }
    });
  }

  onCancelNewStudent() {
    this.router.navigate(['/']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isDifferent = (newStudent: Student, student: Student): boolean => {
      return (
        newStudent.name !== student.name ||
        newStudent.photo !== student.photo ||
        newStudent.description !== student.description ||
        newStudent.grades.math !== student.grades.math ||
        newStudent.grades.english !== student.grades.english ||
        newStudent.grades.biology !== student.grades.biology
      );
    }

    if (isDifferent(this.newStudent, this.student) && !this.changesSaved) {
      return confirm('Discard changes and leave page?');
    } else {
      return true;
    }
  }

}
