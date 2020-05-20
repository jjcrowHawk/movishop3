import { Coordinates, ICoordinates } from './../../app/types/coordinates';
export interface MapSnapshotComponent {
    location: ICoordinates;
    src: string;

    renderSnapshot (options?: { [key: string]: any });
}