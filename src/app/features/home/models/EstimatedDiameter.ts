export interface EstimatedDiameter {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}

export interface Diameter {
  kilometers: EstimatedDiameter;
  meters: EstimatedDiameter;
  miles: EstimatedDiameter;
  feet: EstimatedDiameter;
}
