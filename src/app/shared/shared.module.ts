import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfFormatPipe } from './cpf-format';
import { PhoneNumberPipe } from './phone-number';
import { ComercialPipe } from './comercial-number';
import { TimeFormatterPipe } from './time-formatter.pipe';

@NgModule({
  declarations: [
    CpfFormatPipe, PhoneNumberPipe, ComercialPipe, TimeFormatterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CpfFormatPipe, PhoneNumberPipe, ComercialPipe, TimeFormatterPipe
  ]
})
export class SharedModule { }
