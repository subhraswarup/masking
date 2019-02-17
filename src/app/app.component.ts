import { Component } from '@angular/core';
import { MaskUtil } from './directive/my-mask.util';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public phoneMask01 = MaskUtil.PHONE_MASK_GENERATOR;
    public date = MaskUtil.DATE_MASK_GENERATOR;
    public zip = MaskUtil.ZIP_MASK_GENERATOR;

    constructor() {

    }
    profileForm = new FormGroup({
      phoneNumber: new FormControl(''),
      date: new FormControl(''),
      zip: new FormControl(''),
      currency: new FormControl('')
    });
    onSubmit() {
      console.log(this.profileForm.controls.currency.value);
    }
}
