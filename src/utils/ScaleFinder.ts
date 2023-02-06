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

  key: Note;
  scaleName: ScaleName;
  scalesCalculated: boolean;
  scaleNotesMap: IScaleWithStep;
  scaleNotes: Note[] = [];
  constructor(key: Note, scaleName: ScaleName) {
    this.key = key;
    this.scaleName = scaleName;
    this.scalesCalculated = false;
    this.scaleNotesMap = {
      // initialize with the first note of the key
      [this.key]: {
        ord: 1,
        ordNotation: Scale.intervals[0],
      },
    } as IScaleWithStep;
    this.scaleNotes = [this.key];
  }

  calculateList() {
    if (this.scalesCalculated) {
      return this.scaleNotesMap as IScaleWithStep;
    }
    let index = Notes.all.findIndex((note) => note === this.key);

    const steps = Scale.scaleSteps[this.scaleName];
    for (let i = 0, ord = 2; i < steps.length; i++, ord++) {
      index += steps[i];
      const note = Notes.get(index);
      let intervalDiff = index as keyof typeof Scale['intervals'];
      // Eb: { ord: 3, ordNotation: "b3" }
      this.scaleNotesMap[note] = {
        ord: note === this.key ? 1 : ord,
        ordNotation: Scale.intervals[intervalDiff],
      };
      this.scaleNotes.push(note); // "Eb"
    }
    this.scalesCalculated = true;
    return this.scaleNotesMap;
  }
}

export { type ScaleName, type IScaleWithStep };
export default Scale;
