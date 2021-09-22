export const markerToPositionString = (marker: google.maps.Marker) => {
  if (!marker) return JSON.stringify({ lat: null, lng: null });

  const position = marker.getPosition()!;
  return JSON.stringify({ lat: position.lat(), lng: position.lng() });
};
