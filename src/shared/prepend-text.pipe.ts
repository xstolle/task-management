import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'prependText' })
export class PrependTextPipe implements PipeTransform {
  transform(value: any, prependText: string): any {
    if (!value) return value;
    return prependText + ' ' + value
  }
}
