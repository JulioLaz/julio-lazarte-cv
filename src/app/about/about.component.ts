import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  url_cv:string='https://drive.google.com/file/d/1GhzX-xTdkEyp2ibiEqp1ui9pkoQut9by/view?usp=sharing'
  about: any;
  subtitles = ['Data Scientist Jr.', 'Full Stack Developer Jr.', 'Philosophy teacher'];
  currentIndex = 0;

  constructor(private datajsonService: DatajsonService) { }
  ngOnInit(): void {
    this.startCarousel();
    this.datajsonService.getData().subscribe(data => {
      this.about = data.persona
    })

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
