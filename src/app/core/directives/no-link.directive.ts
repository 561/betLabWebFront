import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appNoLink]',
})
export class NoLinkDirective {
  @Input('appNoLink') disableLink: boolean;

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = 'black';
    el.nativeElement.style['text-decoration'] = 'unset';
    if (this.disableLink) {
      el.nativeElement.style['pointer-events'] = 'none';
      el.nativeElement.style.cursor = 'default';
    }
  }
}
