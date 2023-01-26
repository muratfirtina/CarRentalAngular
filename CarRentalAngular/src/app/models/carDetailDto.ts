export interface CarDetailDto {
    id: number;
    carName: string;
    brandName: string;
    colorName: string;
    modelYear: number;
    dailyPrice: number;
    imagePath: string; //carImages:CarImage[]; olarak değişe bilir bakacağım.

}