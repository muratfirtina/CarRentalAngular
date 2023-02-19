import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: CarDetailDto[], filterText: string): CarDetailDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return value.filter((c: CarDetailDto) => c.carName.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) !== -1 || 
                                             c.brandName.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) !== -1 || 
                                             c.colorName.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) !== -1);
  }

}
