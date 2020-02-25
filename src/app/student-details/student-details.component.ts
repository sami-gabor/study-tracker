import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  @Output() saveDetails = new EventEmitter<any>();
  @Output() cancelDetails = new EventEmitter<void>();
  @Input() currentStudent: any;
  currentStudentGrades = [];

  constructor() { }

  ngOnInit(): void {
    this.currentStudentGrades = Object.entries(this.currentStudent.grades);
  }

  onClickSaveDetails() {
    this.saveDetails.emit(this.currentStudent);
  }

  onClickCancelDetails() {
    this.cancelDetails.emit();
  }

}

