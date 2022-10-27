import { Component, OnInit } from '@angular/core';
import { Actor, ActorsResponse } from 'src/app/interfaces/actors.interface';
import { ActorsService } from 'src/app/services/actors.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {
  actorsList!: Actor[];
  page: number = 1;
  maxPages: number = 10;

  
  constructor(private actorsService: ActorsService) { }

  ngOnInit(): void {
    this.getActors(this.page);
  }

  getActors(page: number){
    this.actorsService.getActors(page).subscribe(resp=>{
      this.actorsList = resp.results;
    })
  }
  
  changePage(nextPage: number){
    this.page = nextPage
    this.getActors(this.page);
  }

  counter() {
    return new Array(this.maxPages);
  }

  getActorImage(actor: Actor){
    return `https://image.tmdb.org/t/p/original${actor.profile_path}`;
  }
  getKnownFor(actor: Actor){
    let pelis ="";
    for(var i =0; i<actor.known_for.length;i++){
      if(actor.known_for[i].name !== undefined){
        pelis = actor.known_for[i].name || '';
      }
    }
    if(pelis != ""){
      return "Conocido por: " + pelis;
    }else{
      return '';
    }
    
  }
}
