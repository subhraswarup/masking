import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

import { MaskGenerator } from 'src/app/directive/mask-generator.interface';

@Directive({
  selector: '[appGenericMask]'
})
export class GenericMaskDirective {

  @Input('maskValue')
  public set maskValue(value: string) {
      if (value !== this.value) {
          this.value = value;
          this.defineValue();
      }
  };

  constructor(private ngControl: NgControl) { }
  private static readonly ALPHA = 'A';
  private static readonly NUMERIC = '0';
  private static readonly ALPHANUMERIC = '?';
  private static readonly REGEX_MAP = new Map([
      [GenericMaskDirective.ALPHA, /\w/],
      [GenericMaskDirective.NUMERIC, /\d/],
      [GenericMaskDirective.ALPHANUMERIC, /\w|\d/],
  ]);

  private value: string = null;
  private displayValue: string = null;

  @Input('appGenericMask')
  public maskGenerator: MaskGenerator;

  // tslint:disable-next-line:no-input-rename
  @Input('keepMask')
  public keepMask: boolean;

  // tslint:disable-next-line:no-output-rename
  @Output('maskValueChange')
  public changeEmitter = new EventEmitter<string>();

  // tslint:disable-next-line:member-ordering
  private static processValue(displayValue: string, mask: string, keepMask: boolean) {
      const value = keepMask ? displayValue : GenericMaskDirective.unmask(displayValue, mask);
      return value;
  }

  // tslint:disable-next-line:member-ordering
  private static mask(value: string, mask: string): string {
      value = value.toString();

      let len = value.length;
      const maskLen = mask.length;
      let pos = 0;
      let newValue = '';

      for (let i = 0; i < Math.min(len, maskLen); i++) {
          const maskChar = mask.charAt(i);
          const newChar = value.charAt(pos);
          const regex: RegExp = GenericMaskDirective.REGEX_MAP.get(maskChar);

          if (regex) {
              pos++;

              if (regex.test(newChar)) {
                  newValue += newChar;
              } else {
                  i--;
                  len--;
              }
          } else {
              if (maskChar === newChar) {
                  pos++;
              } else {
                  len++;
              }

              newValue += maskChar;
          }
      }

      return newValue;
  }

  // tslint:disable-next-line:member-ordering
  private static unmask(maskedValue: string, mask: string): string {
    const maskLen = (mask && mask.length) || 0;
    return maskedValue.split('').filter(
          (currChar, idx) => (idx < maskLen) && GenericMaskDirective.REGEX_MAP.has(mask[idx])
      ).join('');
  }

  private static delay(ms: number = 0): Promise<void> {
      return new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => null);
  }

  @HostListener('input', ['$event'])
  public onInput(event: { target: { value?: string }}): void {
      const target = event.target;
      const value = target.value;
      this.onValueChange(value);
  }

  private updateValue(value: string) {
      this.value = value;
      this.changeEmitter.emit(value);
      GenericMaskDirective.delay().then(
          () => this.ngControl.control.updateValueAndValidity()
      );
  }

  private defineValue() {
      let value: string = this.value;
      let displayValue: string = null;

      if (this.maskGenerator) {
          const mask = this.maskGenerator.generateMask(value);

          if (value != null) {
              displayValue = GenericMaskDirective.mask(value, mask);
              value = GenericMaskDirective.processValue(displayValue, mask, this.keepMask);
          }
      } else {
          displayValue = this.value;
      }

      GenericMaskDirective.delay().then(() => {
          if (this.displayValue !== displayValue) {
              this.displayValue = displayValue;
              this.ngControl.control.setValue(displayValue);
              return GenericMaskDirective.delay();
          }
      }).then(() => {
          if (value !== this.value) {
              return this.updateValue(value);
          }
      });
  }

  private onValueChange(newValue: string) {
      if (newValue !== this.displayValue) {
          let displayValue = newValue;
          let value = newValue;

          if ((newValue == null) || (newValue.trim() === '')) {
              value = null;
          } else if (this.maskGenerator) {
              const mask = this.maskGenerator.generateMask(newValue);
              displayValue = GenericMaskDirective.mask(newValue, mask);
              value = GenericMaskDirective.processValue(displayValue, mask, this.keepMask);
          }

          this.displayValue = displayValue;

          if (newValue !== displayValue) {
              this.ngControl.control.setValue(displayValue);
          }

          if (value !== this.value) {
              this.updateValue(value);
          }
      }
  }

}
