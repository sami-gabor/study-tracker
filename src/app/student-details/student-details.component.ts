import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  @Output() cancelDetails = new EventEmitter<void>();
  @Input() currentStudent: any;
  currentStudentGrades = [];

  constructor() { }

  ngOnInit(): void {
    this.currentStudentGrades = Object.entries(this.currentStudent.grades)
  }

  onClickSaveDetails() {
    console.log('emit save details');
    // TODO: save details
  }

  onClickCancelDetails() {
    this.cancelDetails.emit();
  }

}

