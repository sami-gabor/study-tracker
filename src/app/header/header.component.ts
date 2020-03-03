import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentsSetvice } from '../students.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSettings = new EventEmitter<void>();

  navbarOpen: boolean = false;
  sortDropdownOpen: boolean = false;

  constructor(private studentsService: StudentsSetvice) { }

  ngOnInit(): void {}

  onClickSettings() {
    this.toggleSettings.emit();
  }

  onToggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onToggleSortStudents() {
    this.sortDropdownOpen = !this.sortDropdownOpen;
  }

  onSortByName() {
    this.studentsService.sortStudentsByName();
    this.studentsService.sortedBy.emit('name');
    this.sortDropdownOpen = !this.sortDropdownOpen;
  }

  onSortByScore() {
    this.studentsService.sortStudentsByScore();
    this.studentsService.sortedBy.emit('score');
    this.sortDropdownOpen = !this.sortDropdownOpen;
  }
}
