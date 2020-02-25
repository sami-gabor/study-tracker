import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @Input() student: { name: string, photo: string, grades: { math: number, english: number, biology: number }, score: number};
  @Input() importancePercentages: any;
  @Output() detailsClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {} 

  onClickDetails(student) {
    this.detailsClicked.emit(student);
  }

}
