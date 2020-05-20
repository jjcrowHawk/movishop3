import { environment } from "./../enviroments/environment"
import { HttpClient } from "@angular/common/http"
import { GoogleGeolocationProvider } from "./../providers/geolocation/google-geolocation/google-geolocation"
import { OpenStreetGeolocationProvider } from "./../providers/geolocation/openstreet-geolocation/openstreet-geolocation"

const GEOLOCATION_CLASS_MAP = {
    "GOOGLEMAPS": GoogleGeolocationProvider,
    "OPENSTREETMAPS": OpenStreetGeolocationProvider
}

export const GeolocationFactory = (http: HttpClient) => {
    return new GEOLOCATION_CLASS_MAP[environment.app_features.mapservice](http);
}