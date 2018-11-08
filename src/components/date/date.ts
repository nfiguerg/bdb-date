import { Component, Input, OnInit, Output, EventEmitter, HostListener, Host } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import moment_, { Moment } from 'moment';
/**
 * Generated class for the DateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'date',
  templateUrl: 'date.html'
})
export class DateComponent {
  configDates = [
    {
      class: 'day',
      label: 'Día',
      placeholder: 'DD',
      maxlength: '2',
      index: 1,
      id: 'DD',
      formControlName: 'day'
    },
    {
      class: 'month',
      label: 'Mes',
      placeholder: 'MM',
      maxlength: '2',
      index: 2,
      id: 'MM',
      formControlName: 'month'
    },
    {
      class: 'year',
      label: 'Año',
      placeholder: 'AAAA',
      maxlength: '4',
      index: 3,
      id: 'AAAA',
      formControlName: 'year'
    }
  ]
  day: number;
  month: number;
  year: number;
  formDate: FormGroup = this.formBuilder.group({
    day: [[], (control: AbstractControl) => {
      if (isNaN(control.value)){
        return 'Must be a number';
      }
      if (Number(control.value) > 31 || Number(control.value) < 1) {
        return 'Must be between 1 and 31';
      }
      return null;
    }],
    month: [[], (control: AbstractControl) => {
      if (isNaN(control.value)){
        return 'Must be a number';
      }
      if (Number(control.value) > 12|| Number(control.value) < 1) {
        return 'Must be between 1 and 12';
      }
      return null;
    }],
    year: [[], (control: AbstractControl) => {
      if (isNaN(control.value)){
        return 'Must be a number';
      }
      if (Number(control.value) > Number(new Date().getFullYear()) || Number(control.value) < 1900) {
        return 'Must be between 1901 and the current year';
      }
      return null;
    }]
  })
  @Output() date = new EventEmitter<any>();
  @Output() validForm = new  EventEmitter<boolean>();
  @Input() callBackFormat: string;  // Have to be moment format read DOCS https://momentjs.com/
  @Input() // e.g. 'DDMMAAAA' 'AAAAMMDD' 'MMDDAAAA' 'MMAAAADD'
  set format(formatDate: string){
    if (formatDate.length < 8 || formatDate.length > 8) {
      throw Error('The formatDate`s length param has to be 8 try DDMMAAAA, AAAAMMDD, MMDDAAAA, MMAAAADD');
    } 
    let day, month, year;
    year = formatDate.indexOf('AAAA');
    month = formatDate.indexOf('MM');
    day = formatDate.indexOf('DD');
    this.configDates.forEach((item) => { 
      if (item.id === 'DD') {
        item.index = day
      }
      if (item.id === 'MM') {
        item.index = month
      }
      if (item.id === 'AAAA') {
        item.index = year
      }
    })
    this.configDates.sort((a, b) => {
      let a1 = a.index, b1 = b.index;
      if (a1 === b1){
        return 0;
      } else {
        return a1 > b1 ? 1: -1;
      }
    })
  }
  constructor(private formBuilder: FormBuilder) {
  }
  /**
   * 
   * @param idInput Id from the input in the html
   * @param limitCh Limit of characters defined in the config json
   * @param formControl Name in the form control.
   */
  setFocus(idInput, limitCh, formControl){
    let documents = document.getElementsByTagName('input');
    for (let index = 0; index < documents.length; index++) {
      if (documents[index].id === idInput && Number(limitCh) === Number(documents[index].value.length) && index < (documents.length - 1) && this.formDate.get(formControl).valid) {
          document.getElementById(documents[index + 1].id).focus();
          this.validForm.emit(this.formDate.valid)
          return;
      }
    }
    if (this.formDate.valid){
      let typedDate = moment_(`${this.formDate.get('month').value}/${this.formDate.get('day').value}/${this.formDate.get('year').value}`, 'l');
      this.date.emit({validDate: typedDate.isValid() ,date: this.formDate.value, dateFormatted: moment_(typedDate).format(this.callBackFormat)  });
    }
  
  }
}
