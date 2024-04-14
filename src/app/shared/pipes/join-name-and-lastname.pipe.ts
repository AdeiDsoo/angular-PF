import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinNameAndLastname',
})
export class JoinNameAndLastnamePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return args[1] + ' ' + args[0];
  }
}
