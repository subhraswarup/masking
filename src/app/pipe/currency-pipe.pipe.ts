import { PipeTransform, Pipe } from '@angular/core';


const padding = "000000";

@Pipe({
  name: 'mycurrency'
})
export class CurrencyPipePipe implements PipeTransform {
  private prefix: string;
  private decimal_separator:string;
  private thousands_separator:string;
  private suffix:string;

  constructor(){
    this.prefix='$'; // change this line with your country
    this.suffix='';
    this.decimal_separator='.';
    this.thousands_separator = ',';
  }
  transform(value: string, fractionSize:number = 0 ): any {
    setTimeout(() => {
      if(parseFloat(value) % 1 != 0)
      {
        fractionSize = 2;
      }
      let [ integer, fraction = ""] = (parseFloat(value).toString() || "").toString().split(".");

      fraction = fractionSize > 0
        ? this.decimal_separator + (fraction+padding).substring(0, fractionSize) : "";
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousands_separator);
      if(isNaN(parseFloat(integer)))
      {
            integer = "0";
      }
        return  integer + fraction;
    }, 1000);
  }


  }

