import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActorsDetailResponse } from 'src/app/interfaces/actorsDetails.interface';
import { ActorDialogData } from 'src/app/interfaces/actorsDiagData.interface';

@Component({
  selector: 'app-actor-details-diag',
  templateUrl: './actor-details-diag.component.html',
  styleUrls: ['./actor-details-diag.component.css']
})
export class ActorDetailsDiagComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:ActorDialogData) { }

  ngOnInit(): void {
  }

}
