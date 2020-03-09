import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ImportanceService } from '../importance.service';
import { FirebaseStudentsService } from '../firebase-students.service';
import { Student } from 'src/interfaces/student.interface';
import { StudentsSetvice } from '../students.service';


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
    private route: ActivatedRoute,
    private router: Router,
    private importanceService: ImportanceService,
    private studentsService: StudentsSetvice,
    private firebaseStudentsService: FirebaseStudentsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.existingStudent = true;
      this.firebaseStudentsService.fetchStudent(id).subscribe(student => {
        this.newStudent = student;
      });
    } else {
      this.newStudent = {
        id: '0',
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

  onSaveNewStudent() {
    this.firebaseStudentsService.fetchImportancePercentages().subscribe(percentages => {
      this.newStudent.score = this.studentsService.calculateStudentScore(this.newStudent.grades, percentages);

      if (this.existingStudent) {
        this.firebaseStudentsService.updateStudent(this.newStudent).subscribe(responseData => {
          this.router.navigate(['/students']);
        });
      } else {
        this.firebaseStudentsService.postStudent(this.newStudent).subscribe(responseData => {
          this.firebaseStudentsService.updateStudentId(Object.values(responseData)[0]).subscribe(response => {
            console.log('Student id updated: ', response);
          });
          this.router.navigate(['/students']);
        });
      }
    });
  }

  onCancelNewStudent() {
    this.router.navigate(['/']);
  }

}
