export async function getAddress(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&zoom=18&format=jsonv2`;

  const response = await fetch(url, {
    headers: {
      // REQUIRED by Nominatim
      "User-Agent": "expo-places-app/1.0 (contact@example.com)",
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }

  const data = await response.json();

  return data.display_name;
    
}
