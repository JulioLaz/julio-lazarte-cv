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
export class AboutComponent implements OnInit, OnDestroy {
  // CARGA CV
  url_cv: string = 'https://drive.google.com/file/d/1VkTsIZTLryoLo8zPcPhYfbSIhMg4_CdQ/view?usp=sharing' //CARGAR URL DEL CV
  // url_cv: string = 'https://drive.google.com/file/d/1fka1HfzfFNNg4zO1zuDUcxxPf1jnyGhR/view?usp=sharing' //CARGAR URL DEL CV
  // url_cv: string = 'https://docs.google.com/document/d/1WT_aBM08pkp3aNYfPmTjxrcojOnu_qFk/edit?usp=sharing&ouid=102564936615803527081&rtpof=true&sd=true' //CARGAR URL DEL CV
  // url_cv: string = 'https://www.canva.com/design/DAGGR3mZ_l8/U0kg_BqC4KPDorkjAVr6rg/edit?utm_content=DAGGR3mZ_l8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton' //CARGAR URL DEL CV
  // url_cv:string='https://drive.google.com/file/d/1KaI5lxsa4CUAiamM5iG-I7THVByotUQV/view?usp=sharing' //CARGAR URL DEL CV
  // url_cv:string='https://drive.google.com/file/d/1ZMaWm0VuIqoqiS6ZT92wfcp8F3SD7Vy4/view?usp=sharing' //CARGAR URL DEL CV
  about: any;
  frase: any;
  subtitles = ['Data Analyst', 'Machine Learning', 'Data Visualization', 'Business intelligence'];
  qualities = ['Empatico', 'Integro', 'Proactivo', 'Comunicador', 'Motivador', 'Colaborador', 'Adaptable', 'Lider']
  about_mee: string = 'Hola; soy Julio Lazarte. Científico de datos; especializado en el análisis, visualización, machine learning, business intelligence.';
  text_02:string='Mi objetivo es lograr insight que aporten valor a las necesidades de empresas, para optimizar recursos, reducir gastos, prevenir pérdidas, generar mayores ingresos económicos.'
  voices: SpeechSynthesisVoice[] = [];
  text:string | undefined;
  currentIndex = 1;
  count: number = 1;
  speak: boolean = false;
  private intervalId: any;

  constructor(private datajsonService: DatajsonService) { }
  ngOnInit(): void {
    this.startCarousel();
    this.datajsonService.getData().subscribe(data => {
      this.about = data.persona,
        this.frase = data.frases
    });
    this.startCounter();
    if ('speechSynthesis' in window) {
      // Asegurarse de que las voces estén disponibles
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
      // Obtener las voces inmediatamente si ya están disponibles
      this.voices = window.speechSynthesis.getVoices();
    };
    // setTimeout(() => {
    //   this.speakText();
    // }, 3000);
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
      };
      // if (this.count == 2 ) {
      if (this.count == 2 && this.speak == false) {
        this.speakText(this.about_mee);
        this.speak=true
      }

    }, 3000);
  }


  speakText(text:any): void {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'es-ES'; // Ajusta el idioma según tus necesidades
      speech.rate = 1.3;
      // Selecciona una voz específica (opcional)
      const selectedVoice = this.voices.find(voice => voice.lang === 'es-ES');
      if (selectedVoice) {
        speech.voice = selectedVoice;
      }

      window.speechSynthesis.speak(speech);
    } else {
      console.log('El navegador no soporta la síntesis de voz.');
    }
  }



}
