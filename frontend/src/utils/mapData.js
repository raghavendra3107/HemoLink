import axios from "axios";
import { getCityCoordinates, getCoordinates } from "./geocode";

export const getGlobalMapMarkers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/map-data");
    const { donors, facilities, camps } = response.data.data;

    const markers = [];

    // Process Donors
    for (const donor of donors) {
      if (donor.address && donor.address.city) {
        const coords = getCityCoordinates(donor.address.city, donor.address.state || null);
        if (coords) {
          markers.push({
            id: donor._id,
            lat: coords.lat,
            lon: coords.lon,
            title: donor.fullName || "Donor",
            description: `Blood: ${donor.bloodGroup || 'Any'} | Location: ${donor.address.city}, ${donor.address.state}`,
            color: "#3b82f6", // Blue for donor
            type: "Donor"
          });
        }
      }
    }

    // Process Facilities
    for (const facility of facilities) {
      if (facility.address && facility.address.city) {
        let coords = getCityCoordinates(facility.address.city, facility.address.state || null);
        if (coords) {
          const typeLabel = facility.facilityType === "hospital" ? "Hospital" : "Blood Lab";
          const color = facility.facilityType === "hospital" ? "#ef4444" : "#8b5cf6"; // Red for hospital, Purple for lab
          
          markers.push({
            id: facility._id,
            lat: coords.lat,
            lon: coords.lon,
            title: facility.name,
            description: `Status: ${facility.status} | Location: ${facility.address.city}, ${facility.address.state}`,
            color: color,
            type: typeLabel
          });
        }
      }
    }

    // Process Blood Camps
    if (camps && camps.length > 0) {
      for (const camp of camps) {
        if (camp.location && camp.location.city) {
          const coords = getCityCoordinates(camp.location.city, camp.location.state || null);
          if (coords) {
            markers.push({
              id: camp._id,
              lat: coords.lat,
              lon: coords.lon,
              title: camp.title || "Blood Camp",
              description: `Date: ${new Date(camp.date).toLocaleDateString()} | Location: ${camp.location.venue}, ${camp.location.city}`,
              color: "#10b981", // Green for camp
              type: "Camp"
            });
          }
        }
      }
    }

    return markers;

  } catch (error) {
    console.error("Failed to fetch global map data", error);
    return [];
  }
};
