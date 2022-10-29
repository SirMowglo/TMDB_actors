import { Actor } from "./actors.interface";
import { ActorsDetailResponse } from "./actorsDetails.interface";

export interface ActorDialogData {
    actorDetails: ActorsDetailResponse;
    actor: Actor
  }