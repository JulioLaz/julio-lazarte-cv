import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['../carousel/carousel.component.css']
})
export class ExperienceComponent implements OnInit{
  data_exp: any;

  constructor(private datajsonservice:DatajsonService){}


  ngOnInit(): void {
this.getData()  }

  getData(): void {
    this.datajsonservice.getData().subscribe((data) => {
      this.data_exp = data.experiencia;
    });
  }
}
