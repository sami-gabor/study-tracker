import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject-importance',
  templateUrl: './subject-importance.component.html',
  styleUrls: ['./subject-importance.component.css']
})
export class SubjectImportanceComponent implements OnInit {
  subjectSettingsIsVisible = true;
  subjects = [
    {
      name: 'math',
      value: 33
    },
    {
      name: 'english',
      value: 33
    },
    {
      name: 'biology',
      value: 33
    }
  ];
  

  constructor() { }

  ngOnInit(): void {
    this.subjects.forEach((subject) => {
      subject.value = Math.round(10000 / this.subjects.length) / 100;
    })
  }

  onValueChange(name, value) {
    this.subjects.forEach((subject) => {
      if (subject.name === name) {
        subject.value = value;
      }
    })
  }

  togglePercentageSettings() {
    this.subjectSettingsIsVisible = !this.subjectSettingsIsVisible;
  }

}
