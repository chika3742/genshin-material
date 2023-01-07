/* eslint-disable */
/* This file was generated. DO NOT edit by hand. */

export interface Weapons {
  ingredients: WeaponIngredients;
  entries: Weapon[];
}
export interface WeaponIngredients {
  rarities: {
    [k: string]: {
      purposes: {
        [k: string]: {
          levels: {
            [k: string]: WeaponIngredient[];
          };
        };
      };
    };
  };
}
export interface WeaponIngredient {
  /**
   * 素材の`id`。この値は`ref`と`type`より優先される。
   */
  id?: string;
  /**
   * 素材の種類。`id`も`ref`も`undefined`だった場合に、この値が`materials`のフィールド名に使用される。
   */
  type?: "primary" | "secondary" | "common";
  /**
   * 素材の数量。
   */
  quantity: number;
  /**
   * 合成可能な素材のランク。素材`id`のハイフン以降にあたる。
   */
  craftLevel?: number;
}
export interface Weapon {
  id: string;
  nameJP: string;
  yomi?: string;
  rarity: number;
  where?: {
    text?: string;
  };
  subStat?: "em" | "recharge" | "critRate" | "critDmg" | "hpPercent" | "atkPercent" | "defPercent" | "physicalDmgBonus";
  descExists?: boolean;
  materials: WeaponMaterialDefinition;
}
export interface WeaponMaterialDefinition {
  primary: string;
  secondary: string;
  common: string;
}
