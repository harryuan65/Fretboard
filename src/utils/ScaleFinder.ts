import { Note, Notes } from './Notes';

type ScaleName = keyof typeof Scale['scaleSteps'];
type IScaleWithStep = Record<Note, { ord: number; ordNotation: string }>;

class Scale {
  static scaleSteps = {
    major: [2, 2, 1, 2, 2, 2, 1], // 1, 2, 3, 4, 5, 6, 7, 8
    minor: [2, 1, 2, 2, 1, 2, 2], // 1, 2, ♭3, 4, 5, ♭6, ♭7, 8
    diminished: [2, 1, 2, 1, 2, 1, 2, 1], // 1, 2, ♭3, 4, ♭5, ♭6, 6, ♭7, 8
  } as const;

  // see steps.txt
  static intervals = {
    0: '1',
    1: 'b2',
    2: '2',
    3: 'b3',
    4: '3',
    5: '4',
    6: '#4',
    7: '5',
    8: 'b6',
    9: '6',
    10: 'b7',
    11: '7',
    12: '1',
  } as const;

  static list(startNote: Note, name: ScaleName) {
    let index = Notes.all.findIndex((note) => note === startNote);
    let scaleNotes = {
      [startNote]: {
        ord: 1,
        ordNotation: this.intervals[0],
      },
    } as IScaleWithStep;
    const steps = this.scaleSteps[name];
    for (let i = 0, ord = 2; i < steps.length; i++) {
      index += steps[i];
      const note = Notes.get(index);
      let intervalDiff = index as keyof typeof Scale['intervals'];
      scaleNotes[note] = {
        ord,
        ordNotation: this.intervals[intervalDiff],
      };
      ord += 1;
      if (ord % 8 === 0) ord = 1;
    }
    return scaleNotes;
  }
}

export { type ScaleName, type IScaleWithStep };
export default Scale;
