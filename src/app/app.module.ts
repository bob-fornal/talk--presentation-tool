import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { CoursesComponent } from './pages/courses/courses.component';
import { TalkComponent } from './pages/talk/talk.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';

import { Cover01Component } from './slides/cover-01/cover.component';
import { Cover02Component } from './slides/cover-02/cover.component';
import { TextImageComponent } from './slides/text-image/text-image.component';
import { PanelSingleComponent } from './slides/panel-single/panel-single.component';
import { ImageOnlyComponent } from './slides/image-only/image-only.component';
import { PanelDoubleComponent } from './slides/panel-double/panel-double.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    TalkComponent,

    Cover01Component,
    Cover02Component,
    TextImageComponent,
    PanelSingleComponent,
    ImageOnlyComponent,
    PanelDoubleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
