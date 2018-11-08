import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatePage } from './date';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DatePage,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    BrowserModule,
    CommonModule,
    IonicPageModule.forChild(DatePage)
  ],
})
export class DatePageModule {}
