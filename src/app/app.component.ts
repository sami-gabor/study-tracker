import { Component, Input } from '@angular/core';
import { StudentsSetvice } from './students.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'study-tracker';
  settingsAreVisible: boolean = true;

  constructor(private studentsService: StudentsSetvice) {}
  
  onToggleSettings() {
    this.settingsAreVisible = !this.settingsAreVisible;
  }

}
