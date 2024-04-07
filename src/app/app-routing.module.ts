import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './pages/courses/courses.component';
import { EditComponent } from './pages/edit/edit.component';
import { TalkComponent } from './pages/talk/talk.component';

import { injectSpeedInsights } from '@vercel/speed-insights';
injectSpeedInsights();

const routes: Routes = [
  { path: 'talk/:folder/:slideKey', component: TalkComponent, data: { type: 'talk-slide' } },
  { path: 'edit/:folder', component: EditComponent },
  { path: 'edit/:folder/:slideKey', component: TalkComponent, data: { type: 'edit-slide'} },
  
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
