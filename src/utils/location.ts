import egyptGovernorates from "../data/egyptGovernorates.json";

/**
 * Common variations and transliterations for Egyptian governorates
 */
const mappedVariations: Record<string, string> = {
  fayyum: "Fayoum",
  fayum: "Fayoum",
  qahirah: "Cairo",
  jizah: "Giza",
  jiza: "Giza",
  suhaj: "Sohag",
  qina: "Qena",
  uqsur: "Luxor",
  dumyat: "Damietta",
  suways: "Suez",
  "bur said": "Port Said",
  "isma'iliyah": "Ismailia",
  ismailiyah: "Ismailia",
  daqahliyah: "Dakahlia",
  sharqiyah: "Sharqia",
  buhayrah: "Beheira",
  gharbiyah: "Gharbia",
  minufiyah: "Monufia",
  qalyubiyah: "Qalyubia",
  "kafr ash shaykh": "Kafr El Sheikh",
  "bani suwayf": "Beni Suef",
  "shimal sina": "North Sinai",
  "janub sina": "South Sinai",
  "al wadi al jadid": "New Valley",
  "al bahr al ahmar": "Red Sea",
};

/**
 * Normalizes strings for governorate matching
 */
const normalize = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/^(muhaf[a-z]*at|al|el)\s+/gi, "") // Remove common prefixes
    .replace(/\s+/g, " ");
};

/**
 * Utility to detect the user's Egyptian governorate using IP-based detection
 * with a fallback to the browser's Geolocation API.
 */
export const detectUserGovernorate = async (): Promise<{
  state: string | null;
  area: string | null;
} | null> => {
  /**
   * Internal helper to normalize and match a name against Egypt governorates
   */
  const findMatch = (rawName: string): string | null => {
    const normalizedName = normalize(rawName);

    // 1. Exact match
    const match = egyptGovernorates.find(
      (gov) => normalize(gov) === normalizedName,
    );
    if (match) return match;

    // 2. Manual variations
    for (const [variation, canonical] of Object.entries(mappedVariations)) {
      if (normalizedName.includes(variation)) return canonical;
    }

    // 3. Fuzzy match
    return (
      egyptGovernorates.find(
        (gov) =>
          normalizedName.includes(normalize(gov)) ||
          normalize(gov).includes(normalizedName),
      ) || null
    );
  };

  // --- Step 1: IP-based Geolocation (No permission prompt) ---
  // We try multiple APIs since some might be rate-limited or blocked by adblockers
  const apis = [
    {
      url: "https://api.bigdatacloud.net/data/reverse-geocode-client",
      getNames: (data: any) => {
        if (data && data.countryName === "Egypt") {
          return [data.principalSubdivision, data.city, data.locality];
        }
        return [];
      },
    },
    {
      url: "https://freeipapi.com/api/json",
      getNames: (data: any) => {
        if (data && data.countryName === "Egypt") {
          return [data.regionName, data.cityName];
        }
        return [];
      },
    },
    {
      url: "https://ipapi.co/json/",
      getNames: (data: any) => {
        if (data && data.country_name === "Egypt") {
          return [data.region, data.city];
        }
        return [];
      },
    }
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api.url);
      if (!response.ok) continue;
      
      const data = await response.json();
      const potentialNames = api.getNames(data);
      
      for (const name of potentialNames) {
        if (!name) continue;
        const matched = findMatch(name);
        if (matched) {
          console.log(`[Location] Detected via IP API (${api.url}): ${matched}`);
          
          let area = null;
          const locality = data.city || data.cityName || data.locality;
          if (locality && !normalize(locality).includes(normalize(matched))) {
            area = locality;
          }
          
          return {
            state: matched,
            area: area,
          };
        }
      }
    } catch (error) {
      console.warn(`[Location] IP Geolocation failed for ${api.url}`);
    }
  }

  return null;
};
