import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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

  fetchStudents() {
    return this.http
      .get('https://study-tracker-70e8b.firebaseio.com/students.json')
      .pipe(
        map(studentsData => {
          const studentsArray: Student[] = [];

          for (let key in studentsData) {
            if (studentsData.hasOwnProperty(key)) {
              studentsArray.push({ ...studentsData[key], id: key })
            }
          }

          return studentsArray;
        })
      );
  }

}
