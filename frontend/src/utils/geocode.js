import axios from "axios";
import { State, City } from "country-state-city";

export const getCityCoordinates = (cityName, stateName) => {
  try {
    let c = null;

    if (stateName) {
      const st = State.getStatesOfCountry("IN").find(s => s.name === stateName);
      if (st) {
        c = City.getCitiesOfState("IN", st.isoCode).find(city => city.name.toLowerCase() === cityName.toLowerCase());
      }
    }

    // fallback: if no stateName or city not found in state, search all states
    if (!c) {
      const allStates = State.getStatesOfCountry("IN");
      for (const st of allStates) {
        c = City.getCitiesOfState("IN", st.isoCode).find(city => city.name.toLowerCase() === cityName.toLowerCase());
        if (c) break; // Found the city
      }
    }

    if (c && c.latitude && c.longitude) {
      // Return with deterministic small random fuzzing to avoid overlapping markers
      // Use the city name string to generate a deterministic pseudo-random offset
      let hash = 0;
      for (let i = 0; i < cityName.length; i++) hash = Math.imul(31, hash) + cityName.charCodeAt(i) | 0;
      const fuzzLat = (hash % 100) * 0.0001; 
      const fuzzLon = ((hash / 100) % 100) * 0.0001;

      // Because many donors/hospitals can be in the same city, 
      // we need a random offset so they don't exactly stack.
      // Easiest is to add a tiny random Math.random() so they cluster near each other but are distinct!
      const randomOffsetLat = (Math.random() - 0.5) * 0.02; // ~2km radius scatter
      const randomOffsetLon = (Math.random() - 0.5) * 0.02;

      return {
        lat: parseFloat(c.latitude) + randomOffsetLat,
        lon: parseFloat(c.longitude) + randomOffsetLon,
      };
    }
  } catch (err) {
    console.error("Local geocode error:", err);
  }
  return null;
};

// Free, no-key, open source geocoding using OpenStreetMap
// Note: Nominatim asks that we add a custom user-agent and limit to 1 req/sec
export const getCoordinates = async (addressStr) => {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: addressStr,
        format: "json",
        limit: 1,
      },
      headers: {
        // Required by Nominatim Terms of Service
        "User-Agent": "BloodBankManagementSystem/1.0", 
      },
    });

    if (response.data && response.data.length > 0) {
      return {
        lat: parseFloat(response.data[0].lat),
        lon: parseFloat(response.data[0].lon),
      };
    }
    return null; // Not found
  } catch (error) {
    console.error("Geocoding error for address:", addressStr, error);
    return null;
  }
};
