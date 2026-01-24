import egyptGovernorates from "../data/egyptGovernorates.json";

/**
 * Utility to detect the user's Egyptian governorate using the browser's Geolocation API
 * and reverse geocoding via BigDataCloud.
 */

export const detectUserGovernorate = async (): Promise<{
  state: string | null;
  area: string | null;
} | null> => {
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by this browser.");
    return null;
  }

  // Common variations and transliterations for Egyptian governorates
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

  const normalize = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/^(muhaf[a-z]*at|al|el)\s+/gi, "") // Remove common prefixes
      .replace(/\s+/g, " ");
  };

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          );
          const data = await response.json();

          // Collect all potential names from the API response
          const potentialNames = new Set<string>();
          if (data.principalSubdivision)
            potentialNames.add(data.principalSubdivision);
          if (data.city) potentialNames.add(data.city);
          if (data.locality) potentialNames.add(data.locality);

          if (data.localityInfo?.administrative) {
            data.localityInfo.administrative.forEach(
              (adm: { name: string }) => {
                if (adm.name) potentialNames.add(adm.name);
              },
            );
          }

          let matchedGov: string | null = null;

          for (const rawName of potentialNames) {
            const normalizedName = normalize(rawName);

            // 1. Exact match with normalized version
            matchedGov =
              egyptGovernorates.find(
                (gov) => normalize(gov) === normalizedName,
              ) || null;
            if (matchedGov) break;

            // 2. Check manual variations map
            for (const [variation, canonical] of Object.entries(
              mappedVariations,
            )) {
              if (normalizedName.includes(variation)) {
                matchedGov = canonical;
                break;
              }
            }
            if (matchedGov) break;

            // 3. Fuzzy match (includes)
            matchedGov =
              egyptGovernorates.find(
                (gov) =>
                  normalizedName.includes(normalize(gov)) ||
                  normalize(gov).includes(normalizedName),
              ) || null;
            if (matchedGov) break;
          }

          // Identify suggested area (locality or city if different from governorate)
          let suggestedArea: string | null = null;
          const locality = data.locality || data.city;
          if (
            locality &&
            (!matchedGov ||
              !normalize(locality).includes(normalize(matchedGov)))
          ) {
            suggestedArea = locality;
          }

          resolve({ state: matchedGov, area: suggestedArea });
        } catch (error) {
          console.error("Error fetching reverse geocoding data:", error);
          resolve(null);
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          default:
            console.error(
              "An unknown error occurred while getting location:",
              error.message,
            );
            break;
        }
        resolve(null);
      },
      { timeout: 10000 },
    );
  });
};
