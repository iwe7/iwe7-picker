import { Directive, HostBinding, Input, ElementRef, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Directive({
    selector: '[pickerColItem]'
})
export class PickerColItemDirective implements AfterViewInit, OnInit {
    @HostBinding('class.wheel-item') item: boolean = true;
    @Input() pickerColItem: any;

    constructor(public ele: ElementRef) { }
    ngOnInit() {

    }
    ngAfterViewInit() {
        setTimeout(() => {
            if (!this.pickerColItem) {
                const element: HTMLElement = this.ele.nativeElement;
                this.pickerColItem = element.innerText;
            }
        }, 0);
    }
}
