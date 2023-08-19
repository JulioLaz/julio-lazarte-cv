import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['../carousel/carousel.component.css']
})
export class SkillsComponent implements OnInit{
  data_skills: any;
  data_social: any;
  data_idiomas: any;
constructor(private datajsonservice:DatajsonService){}

  ngOnInit(): void {
this.getData()  }

  getData(): void {
    this.datajsonservice.getData().subscribe((data) => {
      this.data_skills = data.hard_andsskills;
      this.data_social = data.skill_social;
      this.data_idiomas = data.idiomas;

    });
  }

  parsePercentage(porcentajeString: string): number {
    return parseFloat(porcentajeString);
  }
}
