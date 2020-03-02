import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

interface Student {
  name: string,
  photo: string,
  grades: {
    math: number,
    english: number,
    biology: number
  },
  description: string,
  score: number
}

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

  onClickDetails(student: Student) {
    this.router.navigate(
      ['/add-student'],
      {
        queryParams: { currentStudent: JSON.stringify(student) },
        fragment: 'edit'
      }
    );
    this.detailsClicked.emit(student);
  }

}
