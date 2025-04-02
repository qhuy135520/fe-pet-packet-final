// pages/MapPage.js

const Map = ({ lat, lng }) => {
  return (
    <iframe
      style={{ border: 0 }}
      aria-hidden="false"
      tabIndex="0"
      zoom={2}
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${
        lng - 0.01
      },${lat - 0.01},${lng + 0.01},${
        lat + 0.01
      }&layer=mapnik&marker=${lat},${lng}`}
    ></iframe>
  );
};

export default Map;
