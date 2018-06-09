import { PickerService } from './picker.service';
import { Iwe7CoreComponent } from 'iwe7-core';
import { PickerColComponent } from './../picker-col/picker-col';
import { Component, ContentChildren, QueryList, Injector, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'picker-outlet',
    templateUrl: 'picker-outlet.html',
    styleUrls: ['./picker-outlet.scss'],
    providers: [PickerService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerOutletComponent extends Iwe7CoreComponent {
    @ContentChildren(PickerColComponent) cols: QueryList<PickerColComponent>;
    constructor(injector: Injector, public pickerService: PickerService) {
        super(injector);
    }
}
