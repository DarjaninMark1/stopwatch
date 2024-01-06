import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopWatchFrameComponent } from './stop-watch-frame/stop-watch-frame.component';

const routes: Routes = [
  { path: '', component: StopWatchFrameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
