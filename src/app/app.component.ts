import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'study-tracker';
  settingsAreVisible: boolean = true;
  currentStudent = null;
  

  onToggleSettings() {
    this.settingsAreVisible = !this.settingsAreVisible;
  }

  onDetailsClicked(student) {
    this.currentStudent = student;
  }

  onCancelDetails() {
    this.currentStudent = null;
  }

  onDetails(student) { // emitted 2 times: app-student --> app-students --> app
    this.currentStudent = student;
  }
}
