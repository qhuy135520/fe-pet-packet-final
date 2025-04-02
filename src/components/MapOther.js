import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Fill, Icon, Stroke, Style, Text } from "ol/style";
import { fromLonLat } from "ol/proj";
import { useEffect } from "react";
import { Circle as CircleStyle, Style as CircleStyleStyle } from "ol/style";
import { Circle } from "ol/geom";
import { toast } from "react-toastify";

export default function MapOther({ markers, centerPoint, radius }) {
  useEffect(() => {
    if (!centerPoint || !centerPoint.coords) {
      return;
    }

    if (!markers || markers.length === 0) return;

    const haversineDistance = (lon1, lat1, lon2, lat2) => {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const filtered = markers.filter((marker) => {
      const distance = haversineDistance(
        centerPoint.coords[0],
        centerPoint.coords[1],
        marker.coords[0],
        marker.coords[1]
      );
      if (!radius || isNaN(radius) || radius == "") {
        return distance <= 10000;
      } else {
        return distance <= radius;
      }
    });

    const offsetY = (index) => {
      return index * 5;
    };

    const centerFeature = new Feature({
      geometry: new Point(fromLonLat(centerPoint.coords)),
      name: "Your Location",
    });
    centerFeature.setStyle(
      new Style({
        image: new Icon({
          src: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
          scale: 0.05,
        }),
        text: new Text({
          text: "Your Location",
          scale: 1.5,
          offsetY: -20,
          font: "bold 7px Arial",
          fill: new Fill({
            color: "black",
          }),
          stroke: new Stroke({
            color: "white",
            width: 2,
          }),
        }),
      })
    );

    const circleGeometry = new Circle(
      fromLonLat(centerPoint.coords),
      !radius || isNaN(radius) || radius == "" ? 2 : radius * 1000
    );

    const circleFeature = new Feature(circleGeometry);
    circleFeature.setStyle(
      new CircleStyleStyle({
        stroke: new Stroke({
          color: "rgba(231, 14, 14, 0.5)",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(243, 8, 8, 0.1)",
        }),
      })
    );

    const features = [
      circleFeature,
      centerFeature,
      ...filtered.map((marker, index) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(marker.coords)),
          name: marker.service.name,
        });
        feature.setStyle(
          new Style({
            image: new Icon({
              src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scale: 0.05,
            }),
            text: new Text({
              text: marker.service.name,
              scale: 1.5,
              offsetY: offsetY(index),
              font: "bold 7px Arial",
              fill: new Fill({
                color: "black",
              }),
              stroke: new Stroke({
                color: "white",
                width: 2,
              }),
            }),
          })
        );
        return feature;
      }),
    ];

    const vectorSource = new VectorSource({
      features: features,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(centerPoint.coords),
        zoom: 6,
      }),
    });

    return () => {
      map.setTarget(null);
    };
  }, [markers, centerPoint, radius]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
}
