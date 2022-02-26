import { Directive, HostListener, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  manageDropdown : boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2)   {

  }

  @HostListener('click') openDropdown(eventData: Event) {
    if(!this.manageDropdown) {
      this.renderer.addClass(this.elementRef.nativeElement.nextSibling,'show');
      this.manageDropdown = !this.manageDropdown;
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement.nextSibling, 'show');
      this.manageDropdown = !this.manageDropdown;
    }
  }
  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
        return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.manageDropdown) {
        this.renderer.removeClass(this.elementRef.nativeElement.nextSibling, 'show');
        this.manageDropdown = !this.manageDropdown;
    }
}
}