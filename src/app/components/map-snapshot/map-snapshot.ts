import { Coordinates, ICoordinates } from './../../types/coordinates';
export interface MapSnapshotComponent {
    location: ICoordinates;
    src: string;

    renderSnapshot (options?: { [key: string]: any });
}