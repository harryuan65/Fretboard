import { CHROMATIC_NOTES, Note, NoteName } from "./Notes";

type ScaleName = keyof (typeof Scale)["available"];
type IScale = {
  note: Note;
  ord: number;
  ordNotation: string;
};

class Scale {
  static available = {
    major: {
      steps: [2, 2, 1, 2, 2, 2, 1], // Ionian mode 1 2 3 4 5 6 7
    },
    minor: {
      steps: [2, 1, 2, 2, 1, 2, 2], // Aeolian mode 1 2 b3 4 5 b6 b7
    },
    diminished: {
      steps: [2, 1, 2, 1, 2, 1, 2, 1],
    },
    // Modes
    ionian: {
      steps: [2, 2, 1, 2, 2, 2, 1], // Same as major
    },
    dorian: {
      steps: [2, 1, 2, 2, 2, 1, 2], // 1 2 b3 4 5 6 b7
    },
    phrygian: {
      steps: [1, 2, 2, 2, 1, 2, 2], // 1 b2 b3 4 5 b6 b7
    },
    lydian: {
      steps: [2, 2, 2, 1, 2, 2, 1], // 1 2 3 #4 5 6 7
    },
    mixolydian: {
      steps: [2, 2, 1, 2, 2, 1, 2], // 1 2 3 4 5 6 b7
    },
    aeolian: {
      steps: [2, 1, 2, 2, 1, 2, 2], // Same as minor
    },
    locrian: {
      steps: [1, 2, 2, 1, 2, 2, 2], // 1 b2 b3 4 b5 b6 b7
    },
  } as const;

  // see steps.txt
  static intervals = {
    0: "1",
    1: "b2",
    2: "2",
    3: "b3",
    4: "3",
    5: "4",
    6: "#4",
    7: "5",
    8: "b6",
    9: "6",
    10: "b7",
    11: "7",
    12: "1",
  } as const;

  key: NoteName;
  scaleName: ScaleName;
  scalesCalculated: boolean;
  scaleNotes: IScale[];

  constructor(key: NoteName, scaleName: ScaleName) {
    this.key = key;
    this.scaleName = scaleName;
    this.scalesCalculated = false;
    // initialize with the first note of the key
    this.scaleNotes = [
      {
        note: new Note(this.key),
        ord: 1,
        ordNotation: Scale.intervals[0],
      },
    ];
  }

  calculateList() {
    if (this.scalesCalculated) {
      return this.scaleNotes;
    }
    let index = CHROMATIC_NOTES.findIndex((note) => note === this.key);
    const firstNoteIndex = index;

    const scale = Scale.available[this.scaleName];
    const steps = scale.steps;
    for (let i = 0, ord = 2; i < steps.length; i++, ord++) {
      index += steps[i];
      const note = Note.getChromaticNote(index);
      let intervalDiff = (index -
        firstNoteIndex) as keyof (typeof Scale)["intervals"];
      this.scaleNotes.push({
        note: note,
        ord: ord,
        ordNotation: Scale.intervals[intervalDiff],
      });
    }
    this.scalesCalculated = true;
    return this.scaleNotes;
  }
}

export { type ScaleName, type IScale };
export default Scale;
