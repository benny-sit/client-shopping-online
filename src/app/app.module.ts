import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './home/home-layout/home-layout.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { SearchBarComponent } from './home/search-bar/search-bar.component';
import { UserCartComponent } from './home/user-cart/user-cart.component';
import { ItemsComponent } from './home/items/items.component';
import { ItemComponent } from './home/item/item.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ApiService } from './home/services/api-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    NavbarComponent,
    SearchBarComponent,
    UserCartComponent,
    ItemsComponent,
    ItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    AuthModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    EffectsModule.forRoot([]),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
