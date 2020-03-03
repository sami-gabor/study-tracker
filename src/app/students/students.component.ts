import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentsSetvice } from '../students.service';

import { Student } from '../../interfaces/student.interface';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];
  
  constructor(private studentsService: StudentsSetvice) { }

  ngOnInit(): void {
    this.students = this.studentsService.students;
    this.studentsService.updateStudentsScore();
  }

}
