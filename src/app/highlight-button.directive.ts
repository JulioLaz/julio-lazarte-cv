import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightButton]'
})
export class HighlightButtonDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick(): void {
    const buttons = document.querySelectorAll('.diapositivas_active');
    buttons.forEach(button => this.renderer.removeClass(button, 'active'));

    this.renderer.addClass(this.el.nativeElement, 'active');
  }

}
