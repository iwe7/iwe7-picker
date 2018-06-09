import { PickerColItemDirective } from './picker-col-item/picker-col-item';
import { PickerColScrollComponent } from './picker-col-scroll/picker-col-scroll';
import { PickerColComponent } from './picker-col/picker-col';
import { CommonModule } from '@angular/common';
import { PickerOutletComponent } from './picker-outlet/picker-outlet';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PickerOutletComponent,
    PickerColComponent,
    PickerColScrollComponent,
    PickerColItemDirective
  ],
  exports: [
    PickerOutletComponent,
    PickerColComponent,
    PickerColScrollComponent,
    PickerColItemDirective
  ]
})
export class Iwe7PickerModule { }
