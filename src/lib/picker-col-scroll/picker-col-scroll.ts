import { BetterScrollDirective, BetterManagerService } from 'iwe7-better-scroll';
import { Component, ElementRef, Injector, Optional, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'picker-col-scroll',
    templateUrl: 'picker-col-scroll.html',
    styleUrls: ['./picker-col-scroll.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerColScrollComponent extends BetterScrollDirective {
    constructor(
        ele: ElementRef,
        injector: Injector,
        betterManagerService: BetterManagerService,
    ) {
        super(ele, injector, betterManagerService);
        this.click = true;
        this.scrollY = true;
        this.scrollX = false;
        this.wheel = {} as any;
        this.probeType = 3;
        this.bindToWrapper = false;
        this.startY = 72;
        this.getCyc('betterScrollInited').subscribe(res => {
            this.updateContainerStyle('clientHeight', 'height');
            this.render.addClass(this.ele.nativeElement.parentElement, 'wheel');
            this.updateStyle();
            this.setCyc('betterScrollRended', res, false);
        });
    }

    updateStyle() {
        const element: HTMLElement = this.ele.nativeElement;
        const children = element.children;
        for (let i = 0; i < children.length; i++) {
            children[i].classList.add('wheel-item');
        }
        this._scroll.refresh();
    }
}
