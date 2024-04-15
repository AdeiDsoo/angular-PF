import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHeaders]',
})
export class HeadersDirective implements OnChanges {
  @Input()
  fontSize = '20px';

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.fontSize = this.fontSize;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fontSize']) {
      this.elementRef.nativeElement.style.fontSize =
        changes['fontSize'].currentValue;
    }
  }
}

