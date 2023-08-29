import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['../carousel/carousel.component.css']
})
export class AboutMeComponent implements OnInit {
  persona: any;
  about_me: string = '';
  nombre: string = '';
  apellido: string = '';
  edad: string = '';
  city: string = '';
  email: string = '';

  constructor(private datajsonService: DatajsonService) { }

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
}

