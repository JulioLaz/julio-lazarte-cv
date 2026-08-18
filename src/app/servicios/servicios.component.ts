import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['../carousel/carousel.component.css']
})
export class ServiciosComponent implements OnInit {
  data_servicios: any;
  persona_email: string = '';
  linkedin_url: string = 'https://www.linkedin.com/in/juliodatascientist';

  constructor(private datajsonservice: DatajsonService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.datajsonservice.getData().subscribe((data) => {
      this.data_servicios = data.servicios;
      this.persona_email = data.persona[0].email;
    });
  }
}
