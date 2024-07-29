import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { RouterLink } from '@angular/router';

import { AppComponent } from './app.component';

import { QrCodeModule } from 'ng-qrcode';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list'

import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { EditComponent } from './pages/edit/edit.component';

import { EditButtonsComponent } from './shared/edit-buttons/edit-buttons.component';
import { EditNotesDialogComponent } from './shared/edit-notes-dialog/edit-notes-dialog.component';
import { RowButtonsComponent } from './shared/row-buttons/row-buttons.component';

import { AddSlideComponent } from './shared/add-slide/add-slide.component';
import { AddSlideDialogComponent } from './shared/add-slide-dialog/add-slide-dialog.component';
import { CeDisplayComponent } from './slides/code-editor/ce-display/ce-display.component';
import { CodeEditorComponent } from './slides/code-editor/code-editor.component';
import { CeEditorComponent } from './slides/code-editor/ce-editor/ce-editor.component';
import { Cover01Component } from './slides/cover-01/cover-01.component';
import { ImageOnlyComponent } from './slides/image-only/image-only.component';
import { ImageTextComponent } from './slides/image-text/image-text.component';
import { PanelDoubleComponent } from './slides/panel-double/panel-double.component';
import { PanelSingleComponent } from './slides/panel-single/panel-single.component';
import { PanelTripleComponent } from './slides/panel-triple/panel-triple.component';
import { TalkComponent } from './pages/talk/talk.component';
import { TrackPollingComponent } from './slides/track-polling/track-polling.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,

    CeDisplayComponent,
    CeEditorComponent,
    CodeEditorComponent,
    ControlPanelComponent,
    Cover01Component,
    EditButtonsComponent,
    EditComponent,
    EditNotesDialogComponent,
    ImageOnlyComponent,
    ImageTextComponent,
    PanelDoubleComponent,
    PanelSingleComponent,
    PanelTripleComponent,
    RowButtonsComponent,
    AddSlideComponent,
    AddSlideDialogComponent,
    TalkComponent,
    TrackPollingComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterLink,
    FormsModule,
    HttpClientModule,

    QrCodeModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,

    MonacoEditorModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
