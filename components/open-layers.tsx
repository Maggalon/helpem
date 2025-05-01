'use client';

import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { transform } from 'ol/proj';
import { OSM, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import "ol/ol.css";
import React, { useEffect, useState } from 'react'

export default function OpenLayersComponet() {
  const mapStateRef = React.useRef<any>(null);
  const sourceRef = React.useRef<any>(null);
  const [centerAddress, setCenterAddress] = useState<string>('Загрузка...');

  const getAddressFromCoordinates = async (lon: number, lat: number) => {
    try {
      // Using Nominatim's reverse geocoding service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        setCenterAddress(data.display_name);
        return data.display_name;
      } else {
        setCenterAddress('Address not found');
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setCenterAddress('Error getting address');
      return 'Error getting address';
    }
  };

  useEffect(() => {
    if (mapStateRef.current === null) {
      const raster = new TileLayer({
        source: new StadiaMaps({
            layer: 'osm_bright',
        }),
      });

      sourceRef.current = new VectorSource();

      const vector = new VectorLayer({
        source: sourceRef.current,
      });

      mapStateRef.current = new Map({
        layers: [raster, vector],
        target: "map",
        view: new View({
          center: transform(
            [131.87353, 43.10562],
            "EPSG:4326",
            "EPSG:3857",
          ),
          zoom: 15,
        }),
        controls: []
      });

      // Get initial address
      const [lon, lat] = transform(
        mapStateRef.current.getView().getCenter(),
        "EPSG:3857",
        "EPSG:4326"
      );
      getAddressFromCoordinates(lon, lat);

      // Listen for moveend event to update address when map stops moving
      mapStateRef.current.on('moveend', () => {
        const center = mapStateRef.current.getView().getCenter();
        const [lon, lat] = transform(center, "EPSG:3857", "EPSG:4326");
        getAddressFromCoordinates(lon, lat);
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div id="map" className="h-screen w-full" />
      <div className="w-72 absolute text-center font-bold top-8 left-1/2 transform -translate-x-1/2 z-50 bg-white py-2 px-3 rounded-lg shadow max-w-md overflow-hidden">
        {centerAddress.split(',').slice(0,4).reverse().join(", ")}
      </div>
    </div>
  )
}