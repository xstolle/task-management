import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'maxLength' })
export class MaxLengthPipe implements PipeTransform {
  // transform(value: any, prependText: string): any {
  transform(value: string, length: number): string {
    if (!value) return value;
    console.log(value, length);
    if (value.length > length) {
      return value.substring(0, length) + '...';
    }
    else {
      return value;
    }
  }
}
//   transform(val, args) {
//     if (val.length > args[0]) {
//       return val.substring(0, args[0]) + '...';
//     } else {
//       return val;
//     }
//   }
// }
