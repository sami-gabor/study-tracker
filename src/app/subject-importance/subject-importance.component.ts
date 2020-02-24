import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subject-importance',
  templateUrl: './subject-importance.component.html',
  styleUrls: ['./subject-importance.component.css']
})
export class SubjectImportanceComponent implements OnInit {
  @Output() importanceStats = new EventEmitter<any>();
  subjects = [
    {
      name: 'math',
      importance: 30
    },
    {
      name: 'english',
      importance: 30
    },
    {
      name: 'biology',
      importance: 40
    }
  ];
  

  constructor() { }

  ngOnInit(): void {
    // this.subjects.forEach((subject: {name: string, importance: number}) => {
    //   subject.importance = Math.round(10000 / this.subjects.length) / 100;
    // });
    this.importanceStats.emit(this.subjects);
  }

  onValueChange(name: string, value: number) {
    this.subjects.forEach((subject: {name: string, importance: number}) => {
      if (subject.name === name) {
        subject.importance = value;
      } else {
        subject.importance = Math.round((100 - value) / (this.subjects.length - 1) * 100) / 100;
      }
    })
   this.importanceStats.emit(this.subjects);
  }
  
}
