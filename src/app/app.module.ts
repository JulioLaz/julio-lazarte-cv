import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Importa el módulo de enrutamiento

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { FormsModule } from '@angular/forms';
import { CircleProgressComponent } from './circle-progress/circle-progress.component';
import { EducationComponent } from './education/education.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsComponent } from './skills/skills.component';
import { HighlightButtonDirective } from './highlight-button.directive';
import { CvPdfComponent } from './cv-pdf/cv-pdf.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CarouselComponent,
    CircleProgressComponent,
    EducationComponent,
    ProyectsComponent,
    CertificadosComponent,
    ExperienceComponent,
    SkillsComponent,
    HighlightButtonDirective,
    CvPdfComponent,
    AboutMeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    RoundProgressModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
