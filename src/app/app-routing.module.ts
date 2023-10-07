import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './pages/courses/courses.component';
import { EditComponent } from './pages/edit/edit.component';
import { TalkComponent } from './pages/talk/talk.component';

const routes: Routes = [
  { path: 'talk/:folder', component: TalkComponent },
  { path: 'edit/:folder', component: EditComponent },
  
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
