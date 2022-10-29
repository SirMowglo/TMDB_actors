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
  moviesList: string[]= [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: ActorDialogData) {}

  ngOnInit(): void {
    this.getActorMovies(this.data.actor);
  }
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
  getActorMovies(actor: Actor) {
    for(var i =0;i < actor.known_for.length; i++){
      this.moviesList.push(actor.known_for[i].poster_path); 
    }
  }
}
