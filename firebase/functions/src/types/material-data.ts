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
