import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ImportanceService {
  percentages = {
    math: 33,
    english: 33,
    biology: 33
  }

  updateImportance(name: string, value: number) {
    for (let subject in this.percentages) {
      if (subject === name) {
        this.percentages[subject] = value;
      } else {
        this.percentages[subject] = (100 - value) / (Object.keys(this.percentages).length - 1);
      }
    }
  }
}