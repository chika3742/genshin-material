/* eslint-disable */
/* This file was generated. DO NOT edit by hand. */

export interface Characters {
  ingredients: CharacterIngredients;
  entries: Character[];
}
export interface CharacterIngredients {
  purposes: {
    [k: string]: {
      levels: {
        [k: string]: CharacterIngredient[];
      };
    };
  };
}
export interface CharacterIngredient {
  /**
   * 素材の`id`。この値は`ref`と`type`より優先される。
   */
  id?: string;
  /**
   * 素材の種類。`id`も`ref`も`undefined`だった場合に、この値が`materials`のフィールド名に使用される。
   */
  type?: "primary" | "elementalStone" | "secondary" | "local" | "talentPrimary" | "talentSecondary" | "talentBoss";
  /**
   * 素材の数量。
   */
  quantity: number;
  /**
   * 合成可能な素材のランク。素材`id`のハイフン以降にあたる。
   */
  craftLevel?: number;
  /**
   * 素材`id`を参照する`materials`フィールド名。
   */
  ref?: "primary" | "elementalStone" | "secondary" | "local" | "talentPrimary" | "talentSecondary" | "talentBoss";
  /**
   * 素材`id`のキャラクター例外。この値が最優先される。
   */
  special?: {
    [k: string]: string;
  };
}
export interface Character {
  id: string;
  nameJP: string;
  yomi?: string;
  element: "pyro" | "cryo" | "hydro" | "electro" | "anemo" | "geo" | "dendro";
  rarity: 4 | 5;
  weaponType: "u" | "v" | "w" | "x" | "y";
  materials: CharacterMaterialDefinition;
}
export interface CharacterMaterialDefinition {
  primary: string;
  elementalStone?: string;
  secondary: string;
  local: string;
  talentPrimary?: string;
  talentSecondary?: string;
  talentBoss?: string;
}
