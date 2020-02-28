import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StudentsSetvice } from '../students.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  @Output() cancelDetails = new EventEmitter<void>();
  @Input() currentStudent: any;
  currentStudentGrades = [];

  constructor(private studentsService: StudentsSetvice) { }

  ngOnInit(): void {
    this.currentStudentGrades = Object.entries(this.currentStudent.grades);
  }

  onClickSaveDetails() {
    this.studentsService.saveStudentDetails(this.currentStudent);
    this.studentsService.updateStudentsScore();
    this.cancelDetails.emit();
  }

  onClickCancelDetails() {
    this.cancelDetails.emit();
  }

}

