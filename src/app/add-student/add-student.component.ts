import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsSetvice } from '../students.service';
import { ImportanceService } from '../importance.service';


interface Student {
  id: string,
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
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  studentSubjects: string[]; // add interface
  newStudent: Student;

  constructor(
    private importanceSercice: ImportanceService,
    private route: ActivatedRoute,
    private router: Router,
    private studentsService: StudentsSetvice
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.fragment === 'edit') {
      const student = this.route.snapshot.queryParams.currentStudent;
      this.newStudent = JSON.parse(student);
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

  onSaveDetails() {
    if(this.route.snapshot.fragment === 'edit') {
      this.studentsService.updateStudent(this.newStudent);
    } else {
      this.studentsService.addStudent(this.newStudent);
    }

    this.router.navigate(['/students']);
  }

  onCancelDetails() {
    this.router.navigate(['/']);
  }

}
