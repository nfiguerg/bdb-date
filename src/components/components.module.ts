import { NgModule } from '@angular/core';
import { DateComponent } from './date/date';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [DateComponent],
	imports: [ReactiveFormsModule, BrowserModule, CommonModule],
	exports: [DateComponent, ReactiveFormsModule, FormsModule]
})
export class DateComponentModule {}
