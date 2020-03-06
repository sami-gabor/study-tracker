import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FirebaseStudentsService } from '../firebase-students.service';
import { Student } from 'src/interfaces/student.interface';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  currentStudent: any; // change to Student

  constructor(
    private firebaseStudentsService: FirebaseStudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.firebaseStudentsService.fetchStudent(id).subscribe(student => {
      this.currentStudent = student;
    });
  }

  onEditDetails(id: string) {
    this.router.navigate(['/students', id, 'edit']);
  }

  onDeleteDetails(id: string) {
    const confirmation: boolean = confirm("Are you sure you want to delete student?");

    if(confirmation) {
      this.firebaseStudentsService.deleteStudent(id).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  onCancelDetails() {
    this.router.navigate(['/students']);
  }

}
