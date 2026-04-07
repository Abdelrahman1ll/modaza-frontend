import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to check if the user is in Egypt.
 * Uses a free IP geolocation API to determine the country.
 */
export const useGeoLocation = () => {
  const [loading, setLoading] = useState(true);
  const [isEgypt, setIsEgypt] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        // Use api.bigdatacloud.net as it is allowed in the project's CSP
        const response = await axios.get(
          "https://api.bigdatacloud.net/data/reverse-geocode-client",
        );
        const countryCode = response.data?.countryCode;

        if (countryCode) {
          setIsEgypt(countryCode === "EG");
        } else {
          setIsEgypt(true);
        }
      } catch (err) {
        setError("Failed to determine location.");
        // If API fails, we default to allowing access (Egypt) to ensure uptime
        // Change to false if you'd rather be strict.
        setIsEgypt(true);
      } finally {
        setLoading(false);
      }
    };

    checkLocation();
  }, []);

  return { isEgypt, loading, error };
};
