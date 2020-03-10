import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NgxUiLoaderService } from 'ngx-ui-loader';

import { ImportanceService } from '../importance.service';
import { FirebaseStudentsService } from '../firebase-students.service';
import { Student } from 'src/interfaces/student.interface';
import { StudentsSetvice } from '../students.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit, CanComponentDeactivate {
  student: Student = {
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
        this.student = Object.assign({}, { ...student }); // NOT deep copy => grades are passed 'by reference'
        this.isLoading = false;
        this.ngxService.stop();
      });
    } else {
      this.newStudent = {
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
    console.log('can deactivate', this.newStudent.name !== this.student.name, this.newStudent.name, this.student.name);

    if ((
      this.newStudent.name !== this.student.name || this.newStudent.photo !== this.student.photo || this.newStudent.description !== this.student.description
    ) && !this.changesSaved) {
      return confirm('Discard changes and leave page?');
    } else {
      return true;
    }
  }

}
