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
          console.log(studentsData);
          
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

  fetchStudent(id: string) {
    return this.http
      .get(`https://study-tracker-70e8b.firebaseio.com/students/${id}.json`)
      .pipe(
        map(studentData => {
          return { ...studentData, id };
        })
      );
  }

  postStudent(student: Student) {
    return this.http.post(
      'https://study-tracker-70e8b.firebaseio.com/students.json',
      student
    );
  }

  updateStudent(student: Student) {
    return this.http.put(
      `https://study-tracker-70e8b.firebaseio.com/students/${student.id}.json`,
      student
    );
  }

  updateStudentId(studentId: string) {
    return this.http.patch(
      `https://study-tracker-70e8b.firebaseio.com/students/${studentId}/.json`,
      { id: studentId }
    );
  }

  updateAllStudents(students: Student[]) {
    return this.http.put(
      `https://study-tracker-70e8b.firebaseio.com/students.json`,
      students
    );
  }

  deleteStudent(id: string) {
    return this.http.delete(
      `https://study-tracker-70e8b.firebaseio.com/students/${id}.json`
    );
  }

  fetchImportancePercentages() {
    return this.http
      .get('https://study-tracker-70e8b.firebaseio.com/importance-percentages.json')
      .pipe(
        map(percentageData => {
          let percentages: any = {};
          const entries = Object.entries(percentageData);

          for (let entry in entries) {
            const subject = entries[entry][0];
            const grade = entries[entry][1];
            percentages[subject] = grade;
          }
          
          return percentages;
        })
      );
  }

  updateImportancePercentages(percenteges) {
    return this.http.put(
      `https://study-tracker-70e8b.firebaseio.com/importance-percentages.json`,
      percenteges
    );
  }

}
