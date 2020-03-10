import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FirebaseStudentsService } from '../firebase-students.service';
import { Student } from 'src/interfaces/student.interface';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  currentStudent: Student;
  isLoading: boolean;

  constructor(
    private ngxService: NgxUiLoaderService,
    private firebaseStudentsService: FirebaseStudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.ngxService.start();

    const id = this.route.snapshot.paramMap.get('id');

    this.firebaseStudentsService.fetchStudent(id).subscribe(student => {
      this.currentStudent = student;
      this.isLoading = false;
      this.ngxService.stop();
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
