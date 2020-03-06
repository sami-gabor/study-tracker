import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsSetvice } from '../students.service';
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
    private importanceSercice: ImportanceService,
    private route: ActivatedRoute,
    private router: Router,
    private studentsService: StudentsSetvice,
    private firebaseStudentsService: FirebaseStudentsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if(id) {
      this.existingStudent = true;
      // this.newStudent = this.studentsService.getStudent(id);
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

    this.studentSubjects = Object.keys(this.importanceSercice.percentages);
  }

  onSaveNewStudent() {
    if(this.existingStudent) {
      this.studentsService.updateStudent(this.newStudent);
      console.log('existing...');
      
    } else {
      console.log('not existing...');
      this.studentsService.addStudent(this.newStudent);
    }

    this.router.navigate(['/students']);
  }

  onCancelNewStudent() {
    this.router.navigate(['/']);
  }

}
