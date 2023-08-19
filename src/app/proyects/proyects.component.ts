import { Component } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['../carousel/carousel.component.css']})
export class ProyectsComponent {
  data_proyect: any;
  constructor(private datajsonservice: DatajsonService) {}


  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.datajsonservice.getData().subscribe((data) => {
      this.data_proyect = data.proyectos;
    });
  }
  }
