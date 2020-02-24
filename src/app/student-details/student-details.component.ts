import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  @Output() cancelDetails = new EventEmitter<void>();
  @Input() currentStudent: any;
  constructor() { }

  ngOnInit(): void {
    console.log(123, this.currentStudent);
    
  }

  onClickSaveDetails() {
    console.log('emit save details');
    
    // TODO: save details to db
  }

  onClickCancelDetails() {
    console.log('emit cancel details');
    
    this.cancelDetails.emit();
  }

}

