import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ImportanceService {
  percentages = {
    math: 0,
    english: 0,
    biology: 0
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