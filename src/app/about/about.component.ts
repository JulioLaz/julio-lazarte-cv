import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  // CARGA CV
  url_cv:string='https://drive.google.com/file/d/1KaI5lxsa4CUAiamM5iG-I7THVByotUQV/view?usp=sharing' //CARGAR URL DEL CV
  // url_cv:string='https://drive.google.com/file/d/1ZMaWm0VuIqoqiS6ZT92wfcp8F3SD7Vy4/view?usp=sharing' //CARGAR URL DEL CV
  about: any;
  subtitles = ['Data Scientist Jr.', 'Full Stack Developer Jr.', 'Philosophy teacher'];
  currentIndex = 0;



  constructor(private datajsonService: DatajsonService) { }
  ngOnInit(): void {
    this.startCarousel();
    this.datajsonService.getData().subscribe(data => {
      this.about = data.persona
    });



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


}
