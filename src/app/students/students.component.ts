import { Component, OnInit } from '@angular/core';

import { StudentsSetvice } from '../students.service';

import { Student } from 'src/interfaces/student.interface';
import { FirebaseStudentsService } from '../firebase-students.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];
  isLoading: boolean;

  constructor(
    private ngxService: NgxUiLoaderService,
    private studentsService: StudentsSetvice,
    private firebaseStudentsService: FirebaseStudentsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.ngxService.start();

    this.firebaseStudentsService.fetchStudents().subscribe(students => {
      this.students = students;
      this.studentsService.students = students;
      this.studentsService.sortStudents();

      this.isLoading = false;
      this.ngxService.stop();
    });
  }

}
