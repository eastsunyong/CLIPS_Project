const { kakao } = window;

export const createGeocoder = () => {
  return new kakao.maps.services.Geocoder();
};

export const createPlaceSearch = () => {
  return new kakao.maps.services.Places();
};

export const createBounds = () => {
  return new kakao.maps.LatLngBounds();
};

export const xy2latlng = (x, y) => {
  return new kakao.maps.LatLng(y, x);
};
