export interface CardObject {
  id: string;
  name: string;
  supertype: string;
  subtypes: Array<string>;
  level: string;
  hp: string;
  types: Array<string>;
  evolvesFrom: string;
  evolvesTo: string;
  rules: Array<string>;
  ancientTrait: {
    name: string;
    text: string;
  };
  abilities: Array<{
    name: string;
    text: string;
    type: string;
  }>;
  attacks: Array<{
    cost: Array<string>;
    name: string;
    text: string;
    damage: string;
    convertedEnergyCost: number;
  }>;
  weaknesses: Array<{
    type: string;
    value: string;
  }>;
  resistances: Array<{
    type: string;
    value: string;
  }>;
  retreatCost: Array<string>;
  convertedRetreatCost: number;
  set: Array<SetObject>;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: Array<number>;
  legalities: Array<{
    standard: string;
    expanded: string;
    unlimited: string;
  }>;
  regulationMark: string;
  images: {
    small: string;
    large: string;
  };
  tcgplayer: Array<{
    url: string;
    updatedAt: string;
    prices: Array<{
      low: number;
      mid: number;
      high: number;
      market: number;
      directLow: number;
    }>;
  }>;
  cardmarket: Array<{
    url: string;
    updatedAt: string;
    prices: Array<{
      averageSellPrices: number;
      lowPrice: number;
      trendPrice: number;
      germanProLow: number;
      suggestPrice: number;
      reverseHoloSell: number;
      reverseHoloLow: number;
      reverseHoloTrend: number;
      lowProceExPlus: number;
      avg1: number;
      avg7: number;
      avg30: number;
      reverseHoloAvg1: number;
      reverseHoloAvg7: number;
      reverseHoloAvg30: number;
    }>;
  }>;
}

export interface SetObject {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Array<{
    standard: string;
    expanded: string;
    unlimited: string;
  }>;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: Array<{
    symbol: string;
    logo: string;
  }>;
}
