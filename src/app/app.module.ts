import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NuMonacoEditorModule } from '@ng-util/monaco-editor';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { CoursesComponent } from './pages/courses/courses.component';
import { TalkComponent } from './pages/talk/talk.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { Cover01Component } from './slides/cover-01/cover.component';
import { Cover02Component } from './slides/cover-02/cover.component';
import { TextImageComponent } from './slides/text-image/text-image.component';
import { PanelSingleComponent } from './slides/panel-single/panel-single.component';
import { ImageOnlyComponent } from './slides/image-only/image-only.component';
import { PanelDoubleComponent } from './slides/panel-double/panel-double.component';
import { CodeEditorComponent } from './slides/code-editor/code-editor.component';

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
    PanelDoubleComponent,
    CodeEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NuMonacoEditorModule.forRoot(),

    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
