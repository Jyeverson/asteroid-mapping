import { NearEarthObject } from "./NearEarthObject";

export interface ApiResponse {
  near_earth_objects: {
    [date: string]: NearEarthObject[];
  };
}
