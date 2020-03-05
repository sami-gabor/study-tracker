import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Student } from 'src/interfaces/student.interface';


@Injectable({ providedIn: 'root' })
export class FirebaseStudentsService {

  constructor(private http: HttpClient) { }

  postStudent(student: Student) {
    this.http.post(
      'https://study-tracker-70e8b.firebaseio.com/students.json',
      student
    ).subscribe(responseData => {
      console.log('Student added: ', responseData);
    });
  }

}
