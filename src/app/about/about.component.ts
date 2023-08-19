import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  about: any;
  constructor(private datajsonService: DatajsonService) { } // Inyecta el servicio NgbModal
  ngOnInit(): void {
    this.datajsonService.getData().subscribe(data => {
      this.about = data.persona
    })

  }


}
