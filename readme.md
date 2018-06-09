```html
<picker-outlet style="background-color: #efefef;" [formGroup]="form">
  <picker-col formControlName="col1">
    <div pickerColItem="a1">A1</div>
    <div pickerColItem="a2">A2</div>
    <div pickerColItem="a3">A3</div>
    <div pickerColItem="a4">A4</div>
    <div pickerColItem="a5">A5</div>
  </picker-col>
  <picker-col formControlName="col2">
    <div pickerColItem *ngFor="let item of ['b1','b2','b3','b4']">{{item}}</div>
  </picker-col>
  <picker-col formControlName="col3">
    <div pickerColItem>C1</div>
    <div pickerColItem>C2</div>
    <div pickerColItem>C3</div>
    <div pickerColItem>C4</div>
    <div pickerColItem>C5</div>
    <div pickerColItem>C6</div>
    <div pickerColItem>C7</div>
  </picker-col>
</picker-outlet>
```
