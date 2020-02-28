import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ImportanceService {
  percentages = {
    math: 30,
    english: 30,
    biology: 40
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