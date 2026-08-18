import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['../carousel/carousel.component.css']})
export class ProyectsComponent implements OnInit {
  data_proyect: any[] = [];
  featured_types = ['Data Science project', 'Machine Learning project', 'MLOps'];
  featured_proyects: any[] = [];
  archived_proyects: any[] = [];
  showArchived = false;

  constructor(private datajsonservice: DatajsonService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.datajsonservice.getData().subscribe((data) => {
      this.data_proyect = data.proyectos;
      const isFeaturedType = (item: any) => this.featured_types.includes(item.project_type);
      this.featured_proyects = this.data_proyect
        .filter(isFeaturedType)
        .sort((a, b) => (this.isBest(b) ? 1 : 0) - (this.isBest(a) ? 1 : 0));
      this.archived_proyects = this.data_proyect.filter((item) => !isFeaturedType(item));
    });
  }

  isBest(item: any): boolean {
    return item.best_project === 'True';
  }

  toggleArchived(): void {
    this.showArchived = !this.showArchived;
  }
}
