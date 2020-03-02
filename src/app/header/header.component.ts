import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSettings = new EventEmitter<void>();
  navbarOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  onClickSettings() {
    this.toggleSettings.emit();
  }

  onToggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
