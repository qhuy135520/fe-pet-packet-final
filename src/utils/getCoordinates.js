import convertEnumToString from "./convertEnumToString";

export async function getCoordinates(address, service) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
      )}&format=json&addressdetails=1`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.length > 0) {
      const location = data[0];
      return {
        coords: [parseFloat(location.lon), parseFloat(location.lat)],
        service: service,
      };

      // lat: parseFloat(location.lat),
      // lng: parseFloat(location.lon),
    } else {
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
}

export async function getCoordinatesCenterPoint(address, name) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        convertEnumToString(address)
      )}&format=json&addressdetails=1`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.length > 0) {
      const location = data[0];
      return {
        coords: [parseFloat(location.lon), parseFloat(location.lat)],
        name: name,
      };
    } else {
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
}
