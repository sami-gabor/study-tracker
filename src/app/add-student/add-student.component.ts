import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImportanceService } from '../importance.service';

import { Student } from '../../interfaces/student.interface';
import { FirebaseStudentsService } from '../firebase-students.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  newStudent: any; // change to Student
  existingStudent: boolean = false;
  studentSubjects: string[];

  constructor(
    private importanceService: ImportanceService,
    private route: ActivatedRoute,
    private router: Router,
    private firebaseStudentsService: FirebaseStudentsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if(id) {
      this.existingStudent = true;
      this.firebaseStudentsService.fetchStudent(id).subscribe(student => {
        this.newStudent = student;
      });
    } else {
      this.newStudent = {
        id: 'Enter id',
        name: 'Enter name',
        photo: 'Enter url',
        grades: {
          math: 0,
          english: 0,
          biology: 0
        },
        description: 'Enter description',
        score: 0
      }
    }

    this.studentSubjects = Object.keys(this.importanceService.percentages);
  }

  private calculateStudentScore(grades, percentages) {
    return (grades.math * percentages.math + grades.english * percentages.english + grades.biology * percentages.biology) / 10;
  }

  onSaveNewStudent() {
    this.newStudent.score = this.calculateStudentScore(this.newStudent.grades, this.importanceService.percentages);
    
    if(this.existingStudent) {
      this.firebaseStudentsService.updateStudent(this.newStudent).subscribe(responseData => {
        console.log('Student updated: ', responseData);
        this.router.navigate(['/students']);
      });
    } else {
      this.firebaseStudentsService.postStudent(this.newStudent).subscribe(responseData => {
        console.log('Student added: ', responseData);
        this.router.navigate(['/students']);
      });
    }

    
  }

  onCancelNewStudent() {
    this.router.navigate(['/']);
  }

}
