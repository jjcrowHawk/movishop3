export interface ICoordinates {
    lat: number,
    lng: number

    toObjectWithLabels (latitudeLabel: string, longitudeLabel: string);
}

export class Coordinates implements ICoordinates {
    lat: number;
    lng: number;

    constructor(latitude: number, longitude: number) {
        this.lat = latitude;
        this.lng = longitude;
    }

    toObjectWithLabels (latitudeLabel: string, longitudeLabel: string) {
        return { [latitudeLabel]: this.lat, [longitudeLabel]: this.lng };
    }
}