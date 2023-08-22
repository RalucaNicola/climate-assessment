import MapView from '@arcgis/core/views/MapView';

let view: MapView = null;

export function setGlobalView(mapView: MapView) {
  view = mapView;
}

export function getGlobalView() {
  return view;
}

export function destroyView() {
  if (view) {
    view.destroy();
  }
}

export function getLayerById(id: string) {
  return view.map.findLayerById(id);
}

