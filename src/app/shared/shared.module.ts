import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfFormatPipe } from './cpf-format';
import { PhoneNumberPipe } from './phone-number';
import { ComercialPipe } from './comercial-number';

@NgModule({
  declarations: [
    CpfFormatPipe, PhoneNumberPipe, ComercialPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CpfFormatPipe, PhoneNumberPipe, ComercialPipe
  ]
})
export class SharedModule { }
