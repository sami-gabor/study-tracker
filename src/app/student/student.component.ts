import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/interfaces/student.interface';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @Input() student: Student;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onClickDetails(id: string) {
    this.router.navigate(['/students', id]);
  }
}
