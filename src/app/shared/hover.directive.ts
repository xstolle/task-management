import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[taskHover]'
})
export class HoverDirectiveDirective {
  constructor(private el: ElementRef, private renderer: Renderer) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setElementStyle(this.el.nativeElement, 'text-decoration', 'underline');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setElementStyle(this.el.nativeElement, 'text-decoration', null);
  }
}
