import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.css']
})
export class CircleProgressComponent {
  @Input() percentage: number = 0;
  @Input() name: string = '';
  @Input() imgurl: string = '';

}
