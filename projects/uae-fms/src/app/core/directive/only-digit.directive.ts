import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[type=number], [numbersOnly]'
})
export class OnlyDigitsDirective {

  constructor(private elRef: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }

}