import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actor } from 'src/app/interfaces/actors.interface';
import { ActorsDetailResponse } from 'src/app/interfaces/actorsDetails.interface';
import { ActorDialogData } from 'src/app/interfaces/actorsDiagData.interface';

@Component({
  selector: 'app-actor-details-diag',
  templateUrl: './actor-details-diag.component.html',
  styleUrls: ['./actor-details-diag.component.css'],
})
export class ActorDetailsDiagComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ActorDialogData) {}

  ngOnInit(): void {}
  getActorImage(actor: Actor) {
    let url = '';
    if (actor.profile_path != null) {
      url = `https://image.tmdb.org/t/p/original${actor.profile_path}`;
    }
    return url;
  }
  truncNumber(num: number) {
    let truncado: number;

    truncado = Math.trunc(num);
    return truncado;
  }
}
