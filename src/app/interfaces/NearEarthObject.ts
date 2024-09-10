import { CloseApproachData } from "./CloseApproachData";
import { Diameter } from "./EstimatedDiameter";
import { Links } from "./links";

export interface NearEarthObject {
  links: Links;
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: Diameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
  is_sentry_object: boolean;
}
