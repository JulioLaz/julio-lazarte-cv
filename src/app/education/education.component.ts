import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['../carousel/carousel.component.css']
})
export class EducationComponent implements OnInit {
  data_edu: any;

  constructor(
    private datajsonservice: DatajsonService
    ) {}


  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.datajsonservice.getData().subscribe((data) => {
      this.data_edu = data.educacion;
    });
  }

  }
