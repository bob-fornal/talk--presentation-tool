import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { EditComponent } from './pages/edit/edit.component';
import { EventsComponent } from './pages/events/events.component';
import { TalkComponent } from './pages/talk/talk.component';
import { PollingComponent } from './pages/polling/polling.component';

const routes: Routes = [
  { path: 'polling/:folder/:slideKey', component: PollingComponent, data: { type: 'talk-slide' } },
  { path: 'talk/:folder/:slideKey', component: TalkComponent, data: { type: 'talk-slide' } },
  { path: 'edit/:folder', component: EditComponent, data: { type: 'edit-talk' } },
  { path: 'edit/:folder/:slideKey', component: EditComponent, data: { type: 'edit-slide'} },

  { path: 'control-panel/:folder/:slideKey', component: ControlPanelComponent },
  { path: 'courses', component: CoursesComponent },

  { path: 'events', component: EventsComponent },

  { path: '', redirectTo: '/events', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
