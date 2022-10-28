import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActorDetailsDiagComponent } from 'src/app/dialogs/actor-details-diag/actor-details-diag.component';
import { Actor, ActorsResponse } from 'src/app/interfaces/actors.interface';
import { ActorsDetailResponse } from 'src/app/interfaces/actorsDetails.interface';
import { ActorsService } from 'src/app/services/actors.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
})
export class ActorsComponent implements OnInit {
  actorsList!: Actor[];
  page: number = 1;
  maxPages: number = 10;
  actorDetails!: ActorsDetailResponse;

  constructor(private actorsService: ActorsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getActors(this.page);
  }

  getActors(page: number) {
    this.actorsService.getActors(page).subscribe((resp) => {
      this.actorsList = resp.results;
    });
  }

  changePage(nextPage: number) {
    this.page = nextPage;
    this.getActors(this.page);
  }

  counter() {
    return new Array(this.maxPages);
  }

  getActorImage(actor: Actor) {
    let url='';
    if(actor.profile_path !=null){
      url= `https://image.tmdb.org/t/p/original${actor.profile_path}`;
    }
    return url;
  }
  getKnownFor(actor: Actor) {
    let pelis = '';
    for (var i = 0; i < actor.known_for.length; i++) {
      if (actor.known_for[i].name !== undefined) {
        pelis = actor.known_for[i].name || '';
      }
    }
    if (pelis != '') {
      pelis= 'Conocido por: ' + pelis;
    } else {
      pelis= '';
    }
    return pelis;
  }
  getActorDetail(actor: Actor){
    this.actorsService.getActorsDetails(actor).subscribe(resp=>{
      this.actorDetails = resp;
      this.dialog.open(ActorDetailsDiagComponent, {
        data: {
          actorDetails: this.actorDetails,
        }
      })
    })
  }
}
