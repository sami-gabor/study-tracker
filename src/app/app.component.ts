import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'study-tracker';
  settingsAreVisible: boolean = true;
  detailsAreVisible: boolean = false;
  importancePercentages = {
    math: 0,
    english: 0,
    biology: 0
  }

  students = [
    {
      name: 'Alice',
      photo: 'https://cdn4.vectorstock.com/i/1000x1000/25/88/pop-art-excited-girl-graduate-student-in-a-vector-13722588.jpg',
      grades: {
        math: 2,
        english: 6,
        biology: 7
      },
      score: 220
    },
    {
      name: 'Bob',
      photo: 'https://i.dlpng.com/static/png/6735047_preview.png',
      grades: {
        math: 8,
        english: 10,
        biology: 10
      },
      score: 200
    },
    {
      name: 'Chris',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMDN5amwkCryLQud80Tv44HG330ZazirecmZAfY36CZsJo8I6O',
      grades: {
        math: 10,
        english: 6,
        biology: 7
      },
      score: 240
    },
    {
      name: 'Dave',
      photo: 'https://pngimage.net/wp-content/uploads/2018/06/graduate-student-png-2.png',
      grades: {
        math: 9,
        english: 5,
        biology: 3
      },
      score: 180
    }
  ];

  currentStudent;
  
  onToggleSettings() {
    this.settingsAreVisible = !this.settingsAreVisible;
  }

  _calculateStudentScore(grades, percentages) {
    const score = (grades.math * percentages.math + grades.english * percentages.english + grades.biology * percentages.biology) / 3
    return Math.round(score);
  }

  onImportanceStats(stats) {
    stats.forEach(({ name, importance }) => {
      this.importancePercentages[name] = importance;
    });

    this.students.forEach((student) => {
      student.score = this._calculateStudentScore(student.grades, this.importancePercentages);
    })
  }

  onDetailsClicked(student) {
    console.log('received: ', student);
    
    this.detailsAreVisible = true;
    this.currentStudent = student;
  }

  onCancelDetails() {
    console.log('cancel details!');
    
    this.detailsAreVisible = false;
  }
}
