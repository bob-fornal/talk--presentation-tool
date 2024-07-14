import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { CoursesComponent } from './pages/courses/courses.component';

import { EditComponent } from './pages/edit/edit.component';
import { TalkComponent } from './pages/talk/talk.component';

const routes: Routes = [
  { path: 'talk/:folder/:slideKey', component: TalkComponent, data: { type: 'talk-slide' } },
  { path: 'edit/:folder', component: EditComponent, data: { type: 'edit-talk' } },
  { path: 'edit/:folder/:slideKey', component: EditComponent, data: { type: 'edit-slide'} },

  { path: 'control-panel/:folder/:slideKey', component: ControlPanelComponent },
  { path: 'courses', component: CoursesComponent },

  { path: '', redirectTo: '/courses', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
