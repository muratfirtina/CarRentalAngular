import { CarImage } from "./car-image";

export interface CarDetailDto {
    id: number;
    brandId: number;
    colorId: number;
    carName: string;
    brandName: string;
    colorName: string;
    modelYear: number;
    dailyPrice: number;
    carImages: CarImage[];
    carImage: CarImage;

}