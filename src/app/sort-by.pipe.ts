import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(students: any, type: string) {
    
    if(type === 'score') {
      return students.sort((studentA, studentB) => studentA.score - studentB.score);
    }

    if(type === 'name') {
      return students.sort((studentA, studentB) => {
        const nameA = studentA.name.toUpperCase(); // ignore upper and lowercase
        const nameB = studentB.name.toUpperCase(); // ignore upper and lowercase
        
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    
  }

}
