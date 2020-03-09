import { Injectable, EventEmitter } from "@angular/core";

import { Student } from 'src/interfaces/student.interface';
import { FirebaseStudentsService } from './firebase-students.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StudentsSetvice {
  sortedBy = new EventEmitter<string>();
  sortBy: string;

  students: Student[];

  constructor(private firebaseStudentsService: FirebaseStudentsService, private router: Router) {
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

  calculateStudentScore(grades, percentages) {
    return (grades.math * percentages.math + grades.english * percentages.english + grades.biology * percentages.biology) / 10;
  }

  updateStudentsScore(percentages) {
    this.students.forEach((student: Student) => {
      student.score = this.calculateStudentScore(student.grades, percentages);
    });

    this.firebaseStudentsService.updateAllStudents(this.students).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

}
