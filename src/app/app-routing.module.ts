import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CarouselComponent } from './carousel/carousel.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'carousel', component: CarouselComponent },
  // Otras rutas si las tienes
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
