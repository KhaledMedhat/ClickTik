import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        FooterComponent,
        HeaderComponent,
        ShopComponent,
    ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        Ng2SearchPipeModule,
    ],

    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
