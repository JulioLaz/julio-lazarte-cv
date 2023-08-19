import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['../carousel/carousel.component.css']
})
export class CertificadosComponent implements OnInit {
  data_cursos: any;

constructor(private datajsonservice:DatajsonService){}

  ngOnInit(): void {
this.getData()  }


  getData(): void {
    this.datajsonservice.getData().subscribe((data) => {
      this.data_cursos = data.cursos;
    });
}
}
