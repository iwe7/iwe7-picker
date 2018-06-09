import { switchMap, tap, map, pluck, filter } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { PickerColScrollComponent } from './../picker-col-scroll/picker-col-scroll';
import { PickerColItemDirective } from './../picker-col-item/picker-col-item';
import { BetterScrollCore } from 'iwe7-better-scroll';
import { PickerService } from './../picker-outlet/picker.service';
import { Iwe7CoreControlValueAccessor } from 'iwe7-core';
import {
    Component, Injector, SkipSelf, Optional, forwardRef,
    ContentChildren, QueryList, ViewChild, ChangeDetectionStrategy,
    Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
    selector: 'picker-col',
    templateUrl: 'picker-col.html',
    styleUrls: ['./picker-col.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PickerColComponent),
        multi: true
    }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerColComponent extends Iwe7CoreControlValueAccessor {
    @ContentChildren(PickerColItemDirective) items: QueryList<PickerColItemDirective>;
    @ViewChild(PickerColScrollComponent) scroll: PickerColScrollComponent;
    @Input() key: string = 'value';
    currentIndex: number = 0;
    activeItem: any;
    height: number = 36;
    scrollInstance: BetterScrollCore;
    constructor(
        injector: Injector,
        @SkipSelf()
        @Optional()
        public pickerService: PickerService
    ) {
        super(injector);
        this.getCyc('betterScrollInited').pipe(
            tap((scroll: BetterScrollCore) => {
                scroll.on('scrollEnd', (res) => {
                    const y = res.y;
                    const col = Math.abs(y) / this.height;
                    this.currentIndex = Math.floor(col);
                    const nowIndex = scroll.getSelectedIndex();
                    if (nowIndex !== this.currentIndex) {
                        scroll.wheelTo(this.currentIndex);
                    }
                    // 找到值
                    this.items.filter((item, index) => {
                        if (index === this.currentIndex) {
                            this.activeItem = item.pickerColItem;
                        }
                        return index === this.currentIndex;
                    });
                    this._onChange(this.activeItem);
                });
            })
        ).subscribe();
        this.getCyc('ngAfterContentInit').pipe(
            tap(res => {
                this.scroll.getCyc('betterScrollInited').subscribe(res => {
                    this.scrollInstance = res;
                    this.setCyc('betterScrollInited', res);
                });
            }),
            switchMap(value => {
                return this.getCyc('ngWriteValue').pipe(
                    pluck(this.key),
                    switchMap(value => {
                        return this.items.changes.pipe(
                            map((changes: QueryList<PickerColItemDirective>) => {
                                const items = [];
                                changes.forEach((item, index) => {
                                    items.push({
                                        item: item,
                                        index: index
                                    });
                                });
                                return items;
                            }),
                            switchMap(items => from(items)),
                            switchMap(item => {
                                return of(item).pipe(
                                    pluck('item'),
                                    pluck('pickerColItem'),
                                    pluck(this.key),
                                    filter(res => res === value),
                                    map(res => item),
                                    tap(res => {
                                        const activeItem = item.item.pickerColItem;
                                        const currentIndex = item.index;
                                        if (currentIndex !== this.currentIndex) {
                                            setTimeout(() => {
                                                this.scrollInstance.wheelTo(currentIndex);
                                            }, 300);
                                        }
                                        this.currentIndex = currentIndex;
                                        this.activeItem = activeItem;
                                    })
                                );
                            }),
                        );
                    }),
                );
            })
        ).subscribe();
    }
}
