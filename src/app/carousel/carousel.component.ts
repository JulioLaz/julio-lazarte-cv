import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  slide: boolean = true;
  data_cursos: any;
  interval: any;
  data_proyect: any;
  data_edu: any;
  data_exp: any;
  data_skills: any;
  data_social: any;
  data_idiomas: any;
  slides: number = 0;

  constructor(private datajsonservice: DatajsonService) {}

  ngOnInit(): void {
    this.getData();

    const primerButton = document.querySelector('#primer');

    if (primerButton instanceof HTMLElement) {
      primerButton.addEventListener('click', () => {
        this.stopSlideAuto();
        this.slide = false;
      });
    };
    
  }

  ngOnDestroy(): void {
    this.stopSlideAuto();
  }

  startSlideAuto(): void {
    this.interval = setInterval(() => {
      if (this.slide) {
        const nextButton = document.querySelector('.carousel-control-prev');
        if (nextButton instanceof HTMLElement) {
          nextButton.click();
        }
      }
    }, 5000);
  }

  stopSlideAuto(): void {
    clearInterval(this.interval);
  }

  getData(): void {
    this.datajsonservice.getData().subscribe((data) => {
      this.data_cursos = data.cursos;
      this.data_proyect = data.proyectos;
      this.data_edu = data.educacion;
      this.data_exp = data.experiencia;
      this.data_skills = data.hard_andsskills;
      this.data_social = data.skill_social;
      this.data_idiomas = data.idiomas;
    });
  }
  parsePercentage(porcentajeString: string): number {
    return parseFloat(porcentajeString);
  }

  selectSlide(slideNumber: number): void {
    this.slides = slideNumber;
    this.stopSlideAuto(); // Detén la transición automática del carrusel
  }

}
