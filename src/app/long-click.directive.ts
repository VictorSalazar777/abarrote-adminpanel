import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { Subscription, filter, fromEvent, map, merge, of, switchMap, timer } from 'rxjs';

@Directive({
  selector: '[longClick]'
})
export class LongClickDirective {

  private eventSubscribe: Subscription;
  threshold = 500;

  @Output()
  mouseLongPress = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    
    const mousedown = fromEvent<MouseEvent>(elementRef.nativeElement, 'mousedown').pipe(
      filter((event) => event.button == 0), // Only allow left button (Primary button)
      map((event) => true) // turn on threshold counter
    );
    const touchstart = fromEvent(elementRef.nativeElement, 'touchstart').pipe(
      map(() => true)
    );
    const touchEnd = fromEvent(elementRef.nativeElement, 'touchend').pipe(
      map(() => false)
    );
    const mouseup = fromEvent<MouseEvent>(window, 'mouseup').pipe(
      filter((event) => event.button == 0), // Only allow left button (Primary button)
      map(() => false) // reset threshold counter
    );
    this.eventSubscribe = merge(mousedown, mouseup, touchstart, touchEnd)
      .pipe(
        map((state) => (state ? timer(this.threshold, 100) : of(null)))
      )
      .subscribe(() => this.mouseLongPress.emit());
  }

  ngOnDestroy(): void {
    if (this.eventSubscribe) {
      this.eventSubscribe.unsubscribe();
    }
  }

}
