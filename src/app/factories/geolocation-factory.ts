import { environment } from "./../../environments/environment"
import { HttpClient } from "@angular/common/http"
import { GoogleGeolocationService } from "./../services/geolocation/google-geolocation/google-geolocation.service"
import { OpenstreetGeolocationService } from "./../services/geolocation/openstreet-geocation/openstreet-geolocation.service"

const GEOLOCATION_CLASS_MAP = {
    "GOOGLEMAPS": GoogleGeolocationService,
    "OPENSTREETMAPS": OpenstreetGeolocationService,
}

export const GeolocationFactory = (http: HttpClient) => {
    return new GEOLOCATION_CLASS_MAP[environment.app_features.mapservice](http);
}