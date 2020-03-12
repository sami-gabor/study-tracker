import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StudentsSetvice } from '../students.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSettings = new EventEmitter<void>();

  navbarOpen: boolean = false;
  sortDropdownOpen: boolean = false;
  isAuthenticated: boolean = false;
  private userSub: Subscription;

  constructor(private studentsService: StudentsSetvice, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

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

  onLogout() {
    this.isAuthenticated = !this.isAuthenticated;
    this.authService.token = null;
  }
}
