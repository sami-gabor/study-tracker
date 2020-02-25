import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appScoreHighlight]'
})
export class ScoreHighlightDirective implements OnChanges {
  @Input() score : number;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    let customColor: string;

    if (this.score > 75) {
      customColor = 'green';
    } else if (this.score >= 50) {
      customColor = 'blue';
    } else {
      customColor = 'red';
    }
    
    this.el.nativeElement.style.color = customColor;
  }

}
