import { Directive, HostListener, ElementRef, OnInit , Pipe, PipeTransform  } from '@angular/core';
import { CurrencyPipePipe } from '../pipe/currency-pipe.pipe';
import { async } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const padding = "000000";
@Directive({
  selector: '[appCurrencyMask1]'
})
export class CurrencyMask1Directive implements OnInit, PipeTransform {
  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef, private currecnyPipe: CurrencyPipePipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.transform(this.el.value);
  }

  @HostListener('focus', ['$event.target.value'])
  @HostListener('input', ['$event.target.value'])
  onInput(value) {
     this.el.value = this.transform(value);
  }
  transform(value: number | string): string {

    if(value !== '' && value !== null){
      value = value.toString().replace(',', '').replace('$', '');
      value = value.toString().replace(/[^\d\.]/g, '').replace(/\./, 'x').replace(/\./g, '').replace(/x/, '.');
      value = value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      value = '$'+ value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return  value.toString();
  }
}

