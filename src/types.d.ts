export interface ICountry {
  name: string;
  alpha3Code: string;
}

export interface APICountry {
  name: string;
  capital: string;
  region: string;
  population: number;
  borders: string[];
  flag: string;
}
