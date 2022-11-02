import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDetailsDiagComponent } from 'src/app/dialogs/actor-details-diag/actor-details-diag.component';
import { CreateSessionDto } from 'src/app/dto/create-session.dto';
import { DeleteSessionDto } from 'src/app/dto/delete-session.dto';
import { Actor, ActorsResponse } from 'src/app/interfaces/actors.interface';
import { ActorsDetailResponse } from 'src/app/interfaces/actorsDetails.interface';
import { ActorsService } from 'src/app/services/actors.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
})
export class ActorsComponent implements OnInit {
  approved = false;
  actorsList!: Actor[];
  page: number = 1;
  maxPages: number = 10;
  actorDetails!: ActorsDetailResponse;

  constructor(private actorsService: ActorsService, public dialog: MatDialog, private router:Router, private aroute:ActivatedRoute,private authService: AuthService) {}

  ngOnInit(): void {
    this.createSession()
    this.getActors(this.page);
  }

  createSession(){
    this.aroute.queryParams.subscribe((qParams) => {
      const ap = qParams['approved'];
      const rToken = qParams['request_token'];
      this.approved = ap == 'true' ? true : false;

      if (this.approved) {
        let session = new CreateSessionDto();
        session.request_token = rToken;
        this.authService.createSession(session).subscribe((resp) => {
          localStorage.setItem('session_id', resp.session_id);
          console.log('Session id: ' + resp.session_id);
        });
      } else {
        if (localStorage.getItem('session_id') != null) {
          console.log('Session id: ' + localStorage.getItem('session_id'));
          this.approved = true;
        }
        this.router.navigate(['/login']);
      }
    });
  }
  logout() {
    let deleteSessionDto = new DeleteSessionDto();
    if (localStorage.getItem('session_id') != null) {
      deleteSessionDto.session_id = localStorage.getItem('session_id')!;
      this.authService.deleteSession(deleteSessionDto).subscribe((resp) => {
        if (resp.success) {
          localStorage.removeItem('session_id');
          this.router.navigate(['/login']);
          this.approved = false;
        }
      });
    }
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
          actor: actor
        }
      })
    })
  }
}
