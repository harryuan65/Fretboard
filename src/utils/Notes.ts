import { ArrayElement } from '../types/ArrayElement';

class Notes {
  static all = [
    'C',
    'C#',
    'D',
    'Eb',
    'E',
    'F',
    'F#',
    'G',
    'Ab',
    'A',
    'Bb',
    'B',
  ] as const;

  // Loop over again when index exceeded length
  static get(index: number) {
    let size = Notes.all.length;
    return Notes.all[index % size];
  }
}
type Note = ArrayElement<typeof Notes.all>;

export { Notes, type Note };
