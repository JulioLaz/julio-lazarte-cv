// import { DatajsonService } from '../shared/datajson.service';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { trigger, transition, style, animate } from '@angular/animations';

// @Component({
//   selector: 'app-about',
//   templateUrl: './about.component.html',
//   styleUrls: ['./about.component.css'],
//   animations: [
//     trigger('fadeIn', [
//       transition(':enter', [
//         style({ opacity: 0 }),
//         animate('1s', style({ opacity: 1 }))
//       ])
//     ])
//   ]
// })
// export class AboutComponent implements OnInit, OnDestroy {
//   // CARGA CV
//   url_cv: string = 'https://drive.google.com/file/d/1IdNUfOE-ckN5V6ppPm4g5ehIkmKLyzXD/view?usp=sharing' //CARGAR URL DEL CV
//   // url_cv: string = 'https://drive.google.com/file/d/1VkTsIZTLryoLo8zPcPhYfbSIhMg4_CdQ/view?usp=sharing' //CARGAR URL DEL CV
//   about: any;
//   frase: any;
//   subtitles = ['Data Analyst', 'Machine Learning', 'Data Visualization', 'Business intelligence'];
//   qualities = ['Empatico', 'Integro', 'Proactivo', 'Comunicador', 'Motivador', 'Colaborador', 'Adaptable', 'Lider']
//   about_mee: string = 'Hola; soy Julio Lazarte. Científico de datos; especializado en el análisis, visualización, machine learning, business intelligence.';
//   text_02:string='Mi objetivo es lograr insight que aporten valor a las necesidades de empresas, para optimizar recursos, reducir gastos, prevenir pérdidas, generar mayores ingresos económicos.'
//   voices: SpeechSynthesisVoice[] = [];
//   text:string | undefined;
//   currentIndex = 1;
//   count: number = 1;
//   speak: boolean = false;
//   private intervalId: any;

//   constructor(private datajsonService: DatajsonService) { }
//   ngOnInit(): void {
//     this.startCarousel();
//     this.datajsonService.getData().subscribe(data => {
//       this.about = data.persona,
//         this.frase = data.frases
//     });
//     this.startCounter();
//     if ('speechSynthesis' in window) {
//       // Asegurarse de que las voces estén disponibles
//       window.speechSynthesis.onvoiceschanged = () => {
//         this.voices = window.speechSynthesis.getVoices();
//       };
//       // Obtener las voces inmediatamente si ya están disponibles
//       this.voices = window.speechSynthesis.getVoices();
//     };
//     // setTimeout(() => {
//     //   this.speakText();
//     // }, 3000);
//   }

//   downloadPDF() {
//     const link = document.createElement('a');
//     link.href = this.url_cv;
//     link.target = '_blank';
//     link.click();
//   }
//   startCarousel() {
//     setInterval(() => {
//       this.currentIndex = (this.currentIndex + 1) % this.subtitles.length;
//     }, 1500);
//   }

//   ngOnDestroy(): void {
//     if (this.intervalId) {
//       clearInterval(this.intervalId);
//     }
//   }

//   startCounter(): void {
//     this.intervalId = setInterval(() => {
//       if (this.count < 6) {
//         this.count++;
//       } else {
//         this.count = 1;
//       };
//       // if (this.count == 2 ) {
//       if (this.count == 2 && this.speak == false) {
//         this.speakText(this.about_mee);
//         this.speak=true
//       }

//     }, 3000);
//   }


//   speakText(text:any): void {
//     if ('speechSynthesis' in window) {
//       const speech = new SpeechSynthesisUtterance(text);
//       speech.lang = 'es-ES'; // Ajusta el idioma según tus necesidades
//       speech.rate = 1.3;
//       // Selecciona una voz específica (opcional)
//       const selectedVoice = this.voices.find(voice => voice.lang === 'es-ES');
//       if (selectedVoice) {
//         speech.voice = selectedVoice;
//       }

//       window.speechSynthesis.speak(speech);
//     } else {
//       console.log('El navegador no soporta la síntesis de voz.');
//     }
//   }
// }



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
  // ============================================
  // CONFIGURACIÓN Y DATOS
  // ============================================
  url_cv: string = 'https://drive.google.com/file/d/1IdNUfOE-ckN5V6ppPm4g5ehIkmKLyzXD/view?usp=sharing';

  about: any;
  frase: any;
  subtitles = ['Data Analyst', 'Machine Learning', 'Data Visualization', 'Business Intelligence'];
  qualities = ['Empático', 'Íntegro', 'Proactivo', 'Comunicador', 'Motivador', 'Colaborador', 'Adaptable', 'Líder'];

  // Textos para síntesis de voz
  about_me: string = 'Hola, soy Julio Lazarte. Mi especialidad es transformar datos complejos en decisiones estratégicas que impulsan el crecimiento y la rentabilidad. Como Data Scientist, he ayudado a empresas a optimizar presupuestos, mejorar la gestión de stock, realizar compras inteligentes y reducir costos, descubriendo a la vez valiosas oportunidades de negocio. Mi diferencial: combino el rigor científico con una visión estratégica, haciendo que el impacto sea tangible a través de dashboards interactivos que convierten los datos en resultados visibles.';
  // about_me: string = 'Hola, soy Julio Lazarte. Científico de datos especializado en análisis, visualización, machine learning y business intelligence.';
  text_02: string = 'Mi objetivo es lograr insights que aporten valor a las necesidades de empresas, para optimizar recursos, reducir gastos, prevenir pérdidas y generar mayores ingresos económicos.';

  // ============================================
  // CONTROL DE ESTADOS
  // ============================================
  currentIndex = 1;
  count: number = 1;
  private intervalId: any;
  private carouselIntervalId: any;

  // ============================================
  // SISTEMA DE VOZ MEJORADO
  // ============================================
  voices: SpeechSynthesisVoice[] = [];
  isSpeaking: boolean = false;
  speechHasPlayed: boolean = false;
  speechUtterance: SpeechSynthesisUtterance | null = null;
  preferredVoices: string[] = ['Google español', 'Microsoft Helena', 'Paloma', 'Monica'];

  constructor(private datajsonService: DatajsonService) {}

  ngOnInit(): void {
    console.log('🚀 Iniciando componente About...');

    this.initializeVoiceSystem();
    this.loadData();
    this.startCarousel();
    this.startCounter();
  }

  ngOnDestroy(): void {
    console.log('🛑 Destruyendo componente About...');
    this.stopAllSpeech();
    this.clearIntervals();
  }

  // ============================================
  // SISTEMA DE VOZ MEJORADO
  // ============================================

  /**
   * Inicializa el sistema de síntesis de voz
   */
  private initializeVoiceSystem(): void {
    if (!('speechSynthesis' in window)) {
      console.warn('⚠️ El navegador no soporta síntesis de voz');
      return;
    }

    // Cargar voces disponibles
    this.loadVoices();

    // Listener para cuando las voces estén disponibles
    window.speechSynthesis.onvoiceschanged = () => {
      this.loadVoices();
    };
  }

  /**
   * Carga y filtra las voces disponibles
   */
  private loadVoices(): void {
    const allVoices = window.speechSynthesis.getVoices();
    this.voices = allVoices.filter(voice =>
      voice.lang.startsWith('es') || voice.lang.includes('ES')
    );

    console.log('🎤 Voces en español disponibles:', this.voices.length);
    this.voices.forEach(voice => {
      console.log(`   - ${voice.name} (${voice.lang})`);
    });
  }

  /**
   * Selecciona la mejor voz disponible
   */
  private selectBestVoice(): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) return null;

    // Buscar voces preferidas
    for (const preferredName of this.preferredVoices) {
      const voice = this.voices.find(v =>
        v.name.toLowerCase().includes(preferredName.toLowerCase())
      );
      if (voice) {
        console.log(`✅ Voz seleccionada: ${voice.name}`);
        return voice;
      }
    }

    // Si no encuentra preferidas, usar la primera voz femenina
    const femaleVoice = this.voices.find(v =>
      v.name.toLowerCase().includes('female') ||
      v.name.toLowerCase().includes('mujer') ||
      v.name.toLowerCase().includes('helena') ||
      v.name.toLowerCase().includes('monica') ||
      v.name.toLowerCase().includes('paloma')
    );

    if (femaleVoice) {
      console.log(`✅ Voz femenina seleccionada: ${femaleVoice.name}`);
      return femaleVoice;
    }

    // Como último recurso, usar la primera disponible
    console.log(`✅ Voz por defecto: ${this.voices[0].name}`);
    return this.voices[0];
  }

  /**
   * Reproduce texto con síntesis de voz mejorada
   */
  speakText(text: string): void {
    if (!text || !('speechSynthesis' in window)) return;

    // Si ya está hablando, detener primero
    if (this.isSpeaking) {
      this.stopSpeech();
      return;
    }

    console.log('🎙️ Iniciando síntesis de voz...');

    // Crear nueva instancia de síntesis
    this.speechUtterance = new SpeechSynthesisUtterance(text);

    // Configurar parámetros de voz
    this.speechUtterance.lang = 'es-ES';
    this.speechUtterance.rate = 1.1;        // Velocidad natural
    this.speechUtterance.pitch = 1.0;       // Tono natural
    this.speechUtterance.volume = 0.8;      // Volumen moderado

    // Seleccionar la mejor voz
    const selectedVoice = this.selectBestVoice();
    if (selectedVoice) {
      this.speechUtterance.voice = selectedVoice;
    }

    // Configurar eventos
    this.speechUtterance.onstart = () => {
      this.isSpeaking = true;
      this.speechHasPlayed = true;
      console.log('🎤 Reproducción iniciada');
    };

    this.speechUtterance.onend = () => {
      this.isSpeaking = false;
      console.log('🎤 Reproducción finalizada');
    };

    this.speechUtterance.onerror = (event) => {
      this.isSpeaking = false;
      console.error('❌ Error en síntesis de voz:', event);
    };

    // Reproducir
    window.speechSynthesis.speak(this.speechUtterance);
  }

  /**
   * Detiene la síntesis de voz
   */
  stopSpeech(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      console.log('🛑 Síntesis de voz detenida');
    }
  }

  /**
   * Detiene toda actividad de voz
   */
  private stopAllSpeech(): void {
    this.stopSpeech();
    this.speechUtterance = null;
  }

  /**
   * Toggle para reproducir/pausar voz
   */
  toggleSpeech(): void {
    if (this.isSpeaking) {
      this.stopSpeech();
    } else {
      this.speakText(this.about_me);
    }
  }

  // ============================================
  // CONTROL DE CARRUSEL Y CONTADOR
  // ============================================

  private startCarousel(): void {
    this.carouselIntervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.subtitles.length;
    }, 1500);
  }

  private startCounter(): void {
    this.intervalId = setInterval(() => {
      if (this.count < 6) {
        this.count++;
      } else {
        this.count = 1;
      }

      // Reproducir voz automáticamente solo una vez cuando count llega a 2
      if (this.count === 2 && !this.speechHasPlayed) {
        setTimeout(() => {
          this.speakText(this.about_me);
        }, 1000); // Delay de 1 segundo para mejor experiencia
      }
    }, 3000);
  }

  private clearIntervals(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
    }
  }

  // ============================================
  // CARGA DE DATOS
  // ============================================

  private loadData(): void {
    this.datajsonService.getData().subscribe({
      next: (data) => {
        this.about = data.persona;
        this.frase = data.frases;
        console.log('📊 Datos cargados correctamente');
      },
      error: (error) => {
        console.error('❌ Error cargando datos:', error);
      }
    });
  }

  // ============================================
  // UTILIDADES
  // ============================================

  downloadPDF(): void {
    console.log('📄 Descargando CV...');
    const link = document.createElement('a');
    link.href = this.url_cv;
    link.target = '_blank';
    link.click();
  }

  /**
   * Obtiene el estado actual del botón de voz
   */
  getSpeechButtonState(): { icon: string, tooltip: string, class: string } {
    if (this.isSpeaking) {
      return {
        icon: 'fa-volume-up',
        tooltip: 'Detener narración',
        class: 'speaking'
      };
    } else {
      return {
        icon: 'fa-volume-mute',
        tooltip: 'Reproducir presentación',
        class: 'muted'
      };
    }
  }
}
