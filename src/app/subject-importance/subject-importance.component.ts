import { Component, OnInit, OnDestroy } from '@angular/core';

import { ImportanceService } from '../importance.service';
import { StudentsSetvice } from '../students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-importance',
  templateUrl: './subject-importance.component.html',
  styleUrls: ['./subject-importance.component.css']
})
export class SubjectImportanceComponent implements OnInit, OnDestroy {
  subjects: { name: string, importance: number }[] = [];
  percentages: { math: number, english: number, biology: number };

  constructor(
    private importanceService: ImportanceService, 
    private studentsService: StudentsSetvice,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.percentages = this.importanceService.percentages;
    
    for (let item in this.percentages) {
      this.subjects.push({ name: item, importance: this.percentages[item] })
    }
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
    this.studentsService.updateStudentsScore(this.percentages);
  }

  onImportanceCancel() {
    this.router.navigate(['/']);
  }

}
