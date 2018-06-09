import { switchMap, tap, map } from 'rxjs/operators';
import { PickerColScrollComponent } from './../picker-col-scroll/picker-col-scroll';
import { PickerColItemDirective } from './../picker-col-item/picker-col-item';
import { BetterScrollCore } from 'iwe7-better-scroll';
import { PickerService } from './../picker-outlet/picker.service';
import { Iwe7CoreControlValueAccessor } from 'iwe7-core';
import {
    Component, Injector, SkipSelf, Optional, forwardRef,
    ContentChildren, QueryList, ViewChild, ChangeDetectionStrategy
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
    currentIndex: number = 0;
    activeItem: any;
    height: number = 36;
    constructor(
        injector: Injector,
        @SkipSelf()
        @Optional()
        public pickerService: PickerService
    ) {
        super(injector);
        this.getCyc('ngAfterViewInit').pipe(
            switchMap(res => {
                return this.scroll.getCyc('betterScrollRended').pipe(
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
                );
            })
        ).subscribe();
        this.getCyc('ngAfterViewInit').pipe(
            switchMap(res => {
                return this.getCyc('ngWriteValue').pipe(
                    map(res => {
                        this.items.find((it, index) => {
                            if (it.pickerColItem === res) {
                                this.currentIndex = index;
                                this.activeItem = it.pickerColItem;
                                return true;
                            }
                            return false;
                        });
                        return this.currentIndex;
                    }),
                    switchMap(currentIndex => {
                        return this.scroll.getCyc('betterScrollRended').pipe(
                            tap(res => {
                                res.wheelTo(currentIndex);
                            })
                        );
                    })
                );
            })
        ).subscribe();

    }

    setScroll(scroll: BetterScrollCore) {

    }

    setItem(data: any) {

    }
}
