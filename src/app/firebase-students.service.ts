import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Student } from 'src/interfaces/student.interface';


@Injectable({ providedIn: 'root' })
export class FirebaseStudentsService {

  constructor(private http: HttpClient) { }

  fetchStudents() {
    return this.http
      .get('https://study-tracker-70e8b.firebaseio.com/students.json')
      .pipe(
        map(studentsData => {
          const studentsArray: Student[] = [];
          
          for (let key in studentsData) {
            if (studentsData.hasOwnProperty(key)) {
              studentsArray.push({ ...studentsData[key], id: key });
            }
          }

          return studentsArray;
        })
      );
  }

  fetchStudent(studentId: string) {
    return this.http
      .get(`https://study-tracker-70e8b.firebaseio.com/students/${studentId}.json`)
      .pipe(
        map(studentData => {
          const student = { ...studentData, id: studentId };
          return student;
        })
      );
  }

  postStudent(student: Student) {
    this.http.post(
      'https://study-tracker-70e8b.firebaseio.com/students.json',
      student
    ).subscribe(responseData => {
      console.log('Student added: ', responseData);
    });
  }

  updateStudent(student: Student) {
    this.http.put(
      `https://study-tracker-70e8b.firebaseio.com/students/${student.id}.json`,
      student
    ).subscribe(responseData => {
      console.log('Student updated: ', responseData);
    });
  }

}
