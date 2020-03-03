import { Injectable, OnInit } from "@angular/core";
import { ImportanceService } from './importance.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StudentsSetvice implements OnInit {

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
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      score: 0
    },
    {
      id: '1',
      name: 'Bob',
      photo: 'https://i.dlpng.com/static/png/6735047_preview.png',
      grades: {
        math: 8,
        english: 10,
        biology: 10
      },
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      score: 0
    },
    {
      id: '2',
      name: 'Chris',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMDN5amwkCryLQud80Tv44HG330ZazirecmZAfY36CZsJo8I6O',
      grades: {
        math: 10,
        english: 6,
        biology: 7
      },
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      score: 0
    },
    {
      id: '3',
      name: 'Dave',
      photo: 'https://pngimage.net/wp-content/uploads/2018/06/graduate-student-png-2.png',
      grades: {
        math: 9,
        english: 5,
        biology: 3
      },
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      score: 0
    }
  ];

  constructor(
    private importanceService: ImportanceService,
    private router: Router
  ) { }


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
    this.students.push(student);
  }

  updateStudent(updatedStudent) {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].id === updatedStudent.id) {
        updatedStudent.score = this.calculateStudentScore(updatedStudent.grades, this.importanceService.percentages);
        this.students[i] = updatedStudent;
        break;
      }
    }

  }

  getStudent(id: string) {
    return this.students.filter((student) => student.id === id)[0];
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

    // this.router.navigate(['/']); // force rerendering of app-students
  }

  sortStudentsByScore() {
    this.students.sort((studentA, studentB) => studentA.score - studentB.score);
    // this.router.navigate(['/']); // force rerendering of app-students
  }

  ngOnInit() { }
}
