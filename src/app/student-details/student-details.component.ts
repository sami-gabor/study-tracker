import { Component, OnInit } from '@angular/core';
import { StudentsSetvice } from '../students.service';

import { Student } from '../../interfaces/student.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseStudentsService } from '../firebase-students.service';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  currentStudent: any; // change to Student
  // currentStudentGrades = [];

  constructor(
    private studentsService: StudentsSetvice,
    private firebaseStudentsService: FirebaseStudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');

    this.firebaseStudentsService.fetchStudent(studentId).subscribe(student => {
      this.currentStudent = student;
    });
    // this.currentStudent = this.studentsService.getStudent(studentId);
    // this.currentStudentGrades = Object.entries(this.currentStudent.grades);
  }

  onEditDetails(id: string) {
    this.router.navigate(['/students', id, 'edit']);
  }

  onCancelDetails() {
    this.router.navigate(['/students']);
  }

}
