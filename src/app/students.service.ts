import { Injectable, OnInit, EventEmitter } from "@angular/core";

import { Student } from 'src/interfaces/student.interface';

@Injectable({ providedIn: 'root' })
export class StudentsSetvice implements OnInit {
  sortedBy = new EventEmitter<string>();
  sortBy: string;

  students: Student[];

  constructor() {
    this.sortedBy.subscribe((type: string) => this.sortBy = type);
  }

  sortStudentsByName() {
    this.students.sort((studentA, studentB) => {
      const nameA = studentA.name.toUpperCase(); // ignore upper and lowercase
      const nameB = studentB.name.toUpperCase(); // ignore upper and lowercase

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });

    this.sortBy = 'name';
  }

  sortStudentsByScore() {
    this.students.sort((studentA, studentB) => studentA.score - studentB.score);
    this.sortBy = 'score';
  }

  sortStudents() {
    if(this.sortBy === 'name') this.sortStudentsByName();
    if(this.sortBy === 'score') this.sortStudentsByScore();
  }

  ngOnInit() { }
}
