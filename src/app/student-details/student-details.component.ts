import { Component, OnInit } from '@angular/core';
import { StudentsSetvice } from '../students.service';

import { Student } from '../../interfaces/student.interface';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  currentStudent: Student;
  currentStudentGrades = [];

  constructor(
    private studentsService: StudentsSetvice,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    this.currentStudent = this.studentsService.getStudent(studentId);
    this.currentStudentGrades = Object.entries(this.currentStudent.grades);
  }

  onEditDetails(id: string) {
    this.router.navigate(['/students', id, 'edit']);
  }

  onCancelDetails() {
    this.router.navigate(['/students']);
  }

}

