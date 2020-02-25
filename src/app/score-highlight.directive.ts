import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScoreHighlight]'
})
export class ScoreHighlightDirective implements OnChanges {
  @Input() score : number;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    let customColor: string;

    if (this.score > 75) {
      customColor = 'green';
    } else if (this.score >= 50) {
      customColor = 'blue';
    } else {
      customColor = 'red';
    }
    
    this.renderer.setStyle(this.elRef.nativeElement, 'color', customColor);
  }

}
