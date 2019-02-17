import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxMaskModule} from 'ngx-mask';
import { GenericMaskDirective } from './directive/generic-mask.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipePipe } from './pipe/currency-pipe.pipe';
import { CurrencyFormatterDirective } from './directive/currency-formatter.directive';
import {HttpClientModule} from '@angular/common/http';
import { CurrencyMaskDirective } from './directive/currency-mask.directive';
import { NumberMaskDirective } from './directive/number-mask.directive';
import { MyCurrencyPipe } from './pipe/my-currency.pipe';
import { NewCurrencyMaskDirective } from './directive/new-currency-mask.directive';
import { CurrencyMaskService } from './service/currency-mask.service';
import { CurrencyMask1Directive } from './directive/currency-mask1.directive';

@NgModule({
  declarations: [
    AppComponent,
    GenericMaskDirective,
    CurrencyPipePipe,
    CurrencyFormatterDirective,
    CurrencyMaskDirective,
    NumberMaskDirective,
    MyCurrencyPipe,
    NewCurrencyMaskDirective,
    CurrencyMask1Directive,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CurrencyPipePipe,CurrencyMaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
