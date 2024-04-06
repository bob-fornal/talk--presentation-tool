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
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { Cover01Component } from './slides/cover-01/cover.component';
import { Cover02Component } from './slides/cover-02/cover.component';
import { ImageOnlyComponent } from './slides/image-only/image-only.component';
import { PanelSingleComponent } from './slides/panel-single/panel-single.component';
import { PanelDoubleComponent } from './slides/panel-double/panel-double.component';
import { PanelTripleComponent } from './slides/panel-triple/panel-triple.component';
import { TextImageComponent } from './slides/text-image/text-image.component';

import { CodeEditorComponent } from './slides/code-editor/code-editor.component';
import { EditComponent } from './pages/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    TalkComponent,

    Cover01Component,
    Cover02Component,
    ImageOnlyComponent,
    PanelSingleComponent,
    PanelDoubleComponent,
    PanelTripleComponent,
    TextImageComponent,

    CodeEditorComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NuMonacoEditorModule.forRoot(),

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
