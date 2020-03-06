import { Injectable, OnInit, EventEmitter } from "@angular/core";

import { ImportanceService } from './importance.service';
import { FirebaseStudentsService } from './firebase-students.service';

@Injectable({ providedIn: 'root' })
export class StudentsSetvice implements OnInit {
  sortedBy = new EventEmitter<string>();
  sortBy: string;

  students = [
    {
      id: '0',
      name: 'Alice',
      photo: 'https://cdn4.vectorstock.com/i/1000x1000/25/88/pop-art-excited-girl-graduate-student-in-a-vector-13722588.jpg',
      grades: {
        math: 2,
        english: 6,
        biology: 7
      },
      description: 'Alice description goes here...',
      score: 0
    }
  ];

  constructor(
    private importanceService: ImportanceService,
    private firebaseStudentsService: FirebaseStudentsService
  ) {
    this.sortedBy.subscribe((type: string) => this.sortBy = type);
  }


  saveStudentDetails(updatedStudent) {
    this.students.forEach((student) => {
      if (student.id === updatedStudent.id) {
        student = updatedStudent;
      }
    });
  }

  private calculateStudentScore(grades, percentages) {
    return (grades.math * percentages.math + grades.english * percentages.english + grades.biology * percentages.biology) / 10;
  }

  updateStudentsScore() {
    this.students.forEach((student) => {
      student.score = this.calculateStudentScore(student.grades, this.importanceService.percentages);
    });
  }

  addStudent(student) {
    student.score = this.calculateStudentScore(student.grades, this.importanceService.percentages);
    this.firebaseStudentsService.postStudent(student);
    // this.sortStudents();
  }

  updateStudent(updatedStudent) {
    // for (let i = 0; i < this.students.length; i++) {
    //   if (this.students[i].id === updatedStudent.id) {
    //     updatedStudent.score = this.calculateStudentScore(updatedStudent.grades, this.importanceService.percentages);
    //     this.students[i] = updatedStudent;
    //     break;
    //   }
    // }

    // this.sortStudents();
    updatedStudent.score = this.calculateStudentScore(updatedStudent.grades, this.importanceService.percentages);
    this.firebaseStudentsService.updateStudent(updatedStudent);
  }

  getStudent(id: string) {
    return this.students.filter((student) => student.id === id)[0];
  }

  sortStudents() {
    if (this.sortBy === 'name') {
      this.sortStudentsByName();
    }
    if (this.sortBy === 'score') {
      this.sortStudentsByScore();
    }
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
  }

  sortStudentsByScore() {
    this.students.sort((studentA, studentB) => studentA.score - studentB.score);
  }

  ngOnInit() { }
}
