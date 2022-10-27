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

  constructor(private actorsService: ActorsService) { }

  ngOnInit(): void {
    this.getActors();
  }

  getActors(){
    this.actorsService.getActors().subscribe(resp=>{
      this.actorsList = resp.results;
    })
  }
}
