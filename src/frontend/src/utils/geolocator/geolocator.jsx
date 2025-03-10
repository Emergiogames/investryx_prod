import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Function to get user's coordinates (GEOLOCATION SETUP)
const getUserCoordinates = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

// Function for reverse geocoding
const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const data = await response.json();
    return {
      city: data.address.city || data.address.town || data.address.village,
      state: data.address.state,
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

const Geolocator = async () => {
    console.log("at Geolocator");
    
    try {
        console.log("at Geolocator 2");

      // Get user's latitude and longitude
      const { latitude, longitude } = await getUserCoordinates();
      
      // Call reverseGeocode to get city and state
      const location = await reverseGeocode(latitude, longitude);
  
      // If location is successfully fetched, return it
      if (location) {
        console.log("City:", location.city);
        console.log("State:", location.state);
        return location;
      } else {
        toast.error("Failed to get location data.");
        return null;
      }
    } catch (error) {
      console.error("Error getting user coordinates:", error);
      toast.error("Could not fetch location. Please try again.");
      return null;
    }
  };

export default Geolocator;
