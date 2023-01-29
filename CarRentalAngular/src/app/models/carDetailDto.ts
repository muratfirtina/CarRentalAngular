export interface CarDetailDto {
    id: number;
    brandId: number;
    colorId: number;
    carName: string;
    brandName: string;
    colorName: string;
    modelYear: number;
    dailyPrice: number;
    imagePath: string; //carImages:CarImage[]; olarak değişe bilir bakacağım.

}