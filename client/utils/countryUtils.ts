// Mapping des codes pays vers les noms complets
export const COUNTRY_NAMES: { [key: string]: string } = {
  "AD": "Andorra",
  "AL": "Albania", 
  "AT": "Austria",
  "BA": "Bosnia ed Erzegovina",
  "BE": "Belgio",
  "BG": "Bulgaria",
  "BY": "Bielorussia",
  "CH": "Svizzera",
  "CY": "Cipro",
  "CZ": "Repubblica Ceca",
  "DE": "Germania",
  "DK": "Danimarca",
  "EE": "Estonia",
  "ES": "Spagna",
  "FI": "Finlandia",
  "FR": "Francia",
  "GB": "Regno Unito",
  "GR": "Grecia",
  "HR": "Croazia",
  "HU": "Ungheria",
  "IE": "Irlanda",
  "IS": "Islanda",
  "IT": "Italia",
  "LI": "Liechtenstein",
  "LT": "Lituania",
  "LU": "Lussemburgo",
  "LV": "Lettonia",
  "MC": "Monaco",
  "MD": "Moldavia",
  "ME": "Montenegro",
  "MK": "Macedonia del Nord",
  "MT": "Malta",
  "NL": "Paesi Bassi",
  "NO": "Norvegia",
  "PL": "Polonia",
  "PT": "Portogallo",
  "RO": "Romania",
  "RS": "Serbia",
  "RU": "Russia",
  "SE": "Svezia",
  "SI": "Slovenia",
  "SK": "Slovacchia",
  "SM": "San Marino",
  "UA": "Ucraina",
  "VA": "Città del Vaticano"
};

/**
 * Convertit un code pays en nom complet
 * @param countryCode Code pays (ex: "IT", "FR", "DE")
 * @returns Nom complet du pays (ex: "Italia", "Francia", "Germania")
 */
export function getCountryFullName(countryCode: string): string {
  return COUNTRY_NAMES[countryCode] || countryCode || "Non specificato";
}

/**
 * Vérifie si un code pays est valide
 * @param countryCode Code pays à vérifier
 * @returns true si le code pays existe
 */
export function isValidCountryCode(countryCode: string): boolean {
  return countryCode in COUNTRY_NAMES;
}
