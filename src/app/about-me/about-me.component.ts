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

  constructor(
    private datajsonService: DatajsonService,
    ) {
      this.calcularEdad();
    }

  ngOnInit(): void {
    this.getPerson();
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

}

