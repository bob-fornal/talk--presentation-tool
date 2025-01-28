import { Component, Input } from '@angular/core';

import { Speaker } from '../../core/interfaces/events';

@Component({
  selector: 'content-biography',
  templateUrl: './biography.component.html',
  styleUrl: './biography.component.scss',
  standalone: false,
})
export class BiographyComponent {
  @Input() speaker: Speaker = {
    firstName: '',
    lastName: '',
    tagline: '',
    bio: '',
    speakerProfileUrl: '',
    photoUrl: '',
    photoLargeUrl: '',
  };
}
