import { NgModule } from '@angular/core';
import { HashLocationStrategy,LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'
import { HttpClientModule} from '@angular/common/http';
// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MatPaginatorIntlPtBr } from "./_util/paginator-ptbr-i8n";


@NgModule({
  declarations: [
    AppComponent,
    FullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: {MatPaginatorIntl,LocationStrategy}, useClass: MatPaginatorIntlPtBr}],
  bootstrap: [AppComponent]
})
export class AppModule { }
