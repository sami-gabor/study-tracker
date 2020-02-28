import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentsSetvice } from '../students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  @Output() details = new EventEmitter<any>();

  constructor(private studentsService: StudentsSetvice) { }

  ngOnInit(): void { 
    this.studentsService.updateStudentsScore();
   }

  students = this.studentsService.students;
  currentStudent = null;

  onDetailsClicked(student) {
    this.details.emit(student);
  }

}
