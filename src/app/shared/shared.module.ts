import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HoverDirectiveDirective } from './hover.directive';
import { PrependTextPipe } from './prepend-text.pipe';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';
import { StringToDatePipe } from './string-to-date.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    HoverDirectiveDirective,
    PrependTextPipe,
    CapitalizeFirstPipe,
    StringToDatePipe
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    HoverDirectiveDirective,
    PrependTextPipe,
    CapitalizeFirstPipe,
    StringToDatePipe
  ]
})
export class SharedModule { }
