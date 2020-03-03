export interface Student {
  id: string,
  name: string,
  photo: string,
  grades: {
    math: number,
    english: number,
    biology: number
  },
  description: string,
  score: number
}
