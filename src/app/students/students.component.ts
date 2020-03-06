import { Component, OnInit } from '@angular/core';
import { StudentsSetvice } from '../students.service';

import { Student } from '../../interfaces/student.interface';
import { FirebaseStudentsService } from '../firebase-students.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];

  constructor(
    private studentsService: StudentsSetvice,
    private firebaseStudentsService: FirebaseStudentsService
  ) { }

  ngOnInit(): void {
    this.firebaseStudentsService.fetchStudents().subscribe(students => {
      this.students = students;
      // TODO: | async , getter
    });

    this.studentsService.updateStudentsScore();
  }

}
