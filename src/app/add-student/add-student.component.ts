import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';

import { ImportanceService } from '../importance.service';
import { FirebaseStudentsService } from '../firebase-students.service';
import { Student } from 'src/interfaces/student.interface';
import { StudentsSetvice } from '../students.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  private _newStudent: Student;
  existingStudent: boolean = false;
  studentSubjects: string[];
  isLoading: boolean;

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
    this.isLoading = true;
    this.ngxService.start();
    
    const id = this.route.snapshot.paramMap.get('id');

    this.firebaseStudentsService.fetchStudent(id).subscribe(student => {
      this.newStudent = student;

      this.isLoading = false;
      this.ngxService.stop();
    });

    this.studentSubjects = Object.keys(this.importanceService.percentages);
  }

  onSaveNewStudent() {
    this.firebaseStudentsService.fetchImportancePercentages().subscribe(percentages => {
      this.newStudent.score = this.studentsService.calculateStudentScore(this.newStudent.grades, percentages);

      if (this.existingStudent) {
        this.firebaseStudentsService.updateStudent(this.newStudent).subscribe(responseData => {
          this.router.navigate(['/students']);
        });
      } else {
        this.firebaseStudentsService.postStudent(this.newStudent).subscribe(responseData => {
          this.firebaseStudentsService.updateStudentId(Object.values(responseData)[0]).subscribe(response => {
            console.log('Student id updated: ', response);
          });
          this.router.navigate(['/students']);
        });
      }
    });
  }

  onCancelNewStudent() {
    this.router.navigate(['/']);
  }

}
