/* eslint-disable */
/* This file was generated. DO NOT edit by hand. */

export type Materials = MaterialData[];

export interface MaterialData {
  id: string;
  nameJP: string;
  yomi?: string;
  where?: {
    teyvatmapId?: string;
    teyvatmapDimensionId?: string;
    text: string;
  };
  availableDays?: number[];
}
