import { DatajsonService } from '../shared/datajson.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit, OnDestroy  {
  // CARGA CV
  url_cv:string='https://docs.google.com/document/d/1WT_aBM08pkp3aNYfPmTjxrcojOnu_qFk/edit?usp=sharing&ouid=102564936615803527081&rtpof=true&sd=true' //CARGAR URL DEL CV
  // url_cv:string='https://drive.google.com/file/d/1KaI5lxsa4CUAiamM5iG-I7THVByotUQV/view?usp=sharing' //CARGAR URL DEL CV
  // url_cv:string='https://drive.google.com/file/d/1ZMaWm0VuIqoqiS6ZT92wfcp8F3SD7Vy4/view?usp=sharing' //CARGAR URL DEL CV
  about: any;
  frase: any;
  subtitles = ['Data Analyst', 'Machine Learning', 'Data Visualization','Business intelligence'];
  currentIndex = 1;
  count: number = 1;
  private intervalId: any;

  constructor(private datajsonService: DatajsonService) { }
  ngOnInit(): void {
    this.startCarousel();
    this.datajsonService.getData().subscribe(data => {
      this.about = data.persona,
      this.frase = data.frases
    });
    this.startCounter();

  }
  downloadPDF() {
    const link = document.createElement('a');
    link.href = this.url_cv;
    link.target = '_blank';
    link.click();
  }
  startCarousel() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.subtitles.length;
    }, 1500);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCounter(): void {
    this.intervalId = setInterval(() => {
      if (this.count < 6) {
        this.count++;
      } else {
        this.count = 1;
      }
    }, 3000);
  }

}
