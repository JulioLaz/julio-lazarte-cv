import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['../carousel/carousel.component.css']
})
export class AboutMeComponent implements OnInit {
  fechaNacimiento: string = '1978-02-16'; // La fecha de nacimiento en formato 'YYYY-MM-DD'
  edadNew: number | undefined;
  persona: any;
  about_me: string = '';
  nombre: string = '';
  apellido: string = '';
  edad: string = '';
  city: string = '';
  email: string = '';

  // about_mee: string = 'Hola; soy Julio Lazarte. Científico de datos; especializado en el análisis, visualización, machine learning, business intelligence.';
  voices: SpeechSynthesisVoice[] = [];


  constructor(
    private datajsonService: DatajsonService,
    ) {
      this.calcularEdad();
    }

  ngOnInit(): void {
    this.getPerson();

    // if ('speechSynthesis' in window) {
    //   // Asegurarse de que las voces estén disponibles
    //   window.speechSynthesis.onvoiceschanged = () => {
    //     this.voices = window.speechSynthesis.getVoices();
    //   };
    //   // Obtener las voces inmediatamente si ya están disponibles
    //   this.voices = window.speechSynthesis.getVoices();
    // };
    // setTimeout(() => {
    //   const audio = new Audio();
    //   audio.src = 'assets/saludo.mp3'; // Ruta del archivo MP3
    //   audio.load(); // Carga el audio
    //   audio.play();
    // }, 3000);

  }

  getPerson(): void {
    this.datajsonService.getData().subscribe(data => {
      this.persona = data.persona[0];
      this.about_me = this.persona.about_me;
      this.nombre = this.persona.nombre;
      this.apellido = this.persona.apellido;
      this.edad = this.persona.edad;
      this.city = this.persona.city;
      this.email = this.persona.email;
    });
  }

  calcularEdad() {
    const fechaNacimientoDate = new Date(this.fechaNacimiento);
    const hoy = new Date();
    let edadNew = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mesActual = hoy.getMonth() + 1;
    const mesNacimiento = fechaNacimientoDate.getMonth() + 1;
    const diaHoy = hoy.getDate();
    const diaNacimiento = fechaNacimientoDate.getDate();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaHoy < diaNacimiento)) {
      edadNew--; // Restar un año si el cumpleaños aún no ha pasado este año
    }
    this.edadNew = edadNew;
  }

  formatAboutMe(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  // speakText(): void {
  //   if ('speechSynthesis' in window) {
  //     const speech = new SpeechSynthesisUtterance(this.about_mee);
  //     speech.lang = 'es-ES'; // Ajusta el idioma según tus necesidades

  //     // Selecciona una voz específica (opcional)
  //     const selectedVoice = this.voices.find(voice => voice.lang === 'es-ES');
  //     if (selectedVoice) {
  //       speech.voice = selectedVoice;
  //     }

  //     window.speechSynthesis.speak(speech);
  //   } else {
  //     console.log('El navegador no soporta la síntesis de voz.');
  //   }
  // }
}

