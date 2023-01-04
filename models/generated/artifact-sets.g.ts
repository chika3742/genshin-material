/* eslint-disable */
/* This file was generated. DO NOT edit by hand. */

export type ArtifactSets = ArtifactSet[];

export interface ArtifactSet {
  id: string;
  nameJP: string;
  highestQuality: number;
  pieces: Artifact[];
}
export interface Artifact {
  id: string;
  nameJP: string;
  type: "flower" | "plume" | "sands" | "goblet" | "circlet";
}
