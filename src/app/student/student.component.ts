import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from '../../interfaces/student.interface';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @Input() student: Student;
  @Input() importancePercentages: any;
  @Output() detailsClicked = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onClickDetails(studentId: string) {
    this.router.navigate(['/students', studentId]);
  }

}
