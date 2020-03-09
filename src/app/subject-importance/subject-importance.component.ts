import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ImportanceService } from '../importance.service';
import { StudentsSetvice } from '../students.service';
import { FirebaseStudentsService } from '../firebase-students.service';

@Component({
  selector: 'app-subject-importance',
  templateUrl: './subject-importance.component.html',
  styleUrls: ['./subject-importance.component.css']
})
export class SubjectImportanceComponent implements OnInit, OnDestroy {
  subjects: { name: string, importance: number }[] = [];
  percentages: { math: number, english: number, biology: number };

  constructor(
    private firebaseStudentsService: FirebaseStudentsService,
    private importanceService: ImportanceService,
    private studentsService: StudentsSetvice,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.firebaseStudentsService.fetchImportancePercentages().subscribe(percentages => {
      this.percentages = percentages;

      for (let item in this.percentages) {
        this.subjects.push({ name: item, importance: this.percentages[item] });

      }
    });
  }

  ngOnDestroy() {
  }

  onChangeImportancePercentage(name: string, value: number) {
    this.subjects.forEach((subject) => {
      if (subject.name === name) {
        subject.importance = value;
      } else {
        subject.importance = (100 - value) / (Object.keys(this.percentages).length - 1);
      }
    });

    this.importanceService.updateImportance(name, value);
  }

  onImportanceSave() {
    this.studentsService.updateStudentsScore(this.importanceService.percentages);

    this.firebaseStudentsService.updateImportancePercentages(this.importanceService.percentages).subscribe(responseData => {
      // console.log('Importance percentages updated: ', responseData);
    });
  }

  onImportanceCancel() {
    this.router.navigate(['/']);
  }

}
