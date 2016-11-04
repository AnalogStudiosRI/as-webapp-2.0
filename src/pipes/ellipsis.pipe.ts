import { Pipe } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe {
  transform(value: string, limit: number) {
    if (!limit) {
      return value;
    }

    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}