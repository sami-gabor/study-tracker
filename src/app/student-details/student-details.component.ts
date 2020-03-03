import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StudentsSetvice } from '../students.service';

import { Student } from '../../interfaces/student.interface';
import { ImportanceService } from '../importance.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  // @Output() cancelDetails = new EventEmitter<void>();
  currentStudent: Student;
  currentStudentGrades = [];

  // studentSubjects: string[]

  constructor(
    private studentsService: StudentsSetvice, 
    private importanceService: ImportanceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    this.currentStudent = this.studentsService.getStudent(studentId);
    // this.studentSubjects = Object.keys(this.importanceService.percentages);
    this.currentStudentGrades = Object.entries(this.currentStudent.grades);
    console.log('studentId: ', studentId, this.currentStudentGrades);
    
  }

  onClickSaveDetails() {
    // this.studentsService.saveStudentDetails(this.currentStudent);
    // this.studentsService.updateStudentsScore();
    // this.cancelDetails.emit();
  }

  onClickCancelDetails() {
    // this.cancelDetails.emit();
  }

  onEditDetails(id: string) {
    this.router.navigate(['/students', id, 'edit']);
  }

  onCancelDetails() {
    this.router.navigate(['/students']);
  }

}

