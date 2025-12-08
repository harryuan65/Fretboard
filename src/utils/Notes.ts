import { ArrayElement } from "../types/ArrayElement";

export const CHROMATIC_NOTES = [
  "C",
  "C#",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
] as const;

class Note {
  name: ArrayElement<typeof CHROMATIC_NOTES>;
  octave: number = 1;
  constructor(
    noteName: ArrayElement<typeof CHROMATIC_NOTES>,
    octave: number = 1
  ) {
    this.name = noteName;
    this.octave = octave;
  }

  static getChromaticNote(index: number) {
    return new Note(CHROMATIC_NOTES[index % CHROMATIC_NOTES.length]);
  }

  get fullName() {
    return `${this.name}${this.octave}`;
  }

  move(steps: number) {
    const noteIndex = CHROMATIC_NOTES.indexOf(this.name);
    const totalSteps = noteIndex + steps;
    const newNoteIndex = totalSteps % CHROMATIC_NOTES.length;
    const octaveOffset = Math.floor(totalSteps / CHROMATIC_NOTES.length);

    return new Note(CHROMATIC_NOTES[newNoteIndex], this.octave + octaveOffset);
  }

  /**
   * Frequency formula:f = fref * 2^ ( (n−nref)/12 )
   * where n is the MIDI number of the note
   */
  get freq() {
    const index = CHROMATIC_NOTES.indexOf(this.name);
    const midiNumber = (this.octave + 1) * 12 + index;
    const A4_MIDI_NUMBER = 69;
    return 440 * Math.pow(2, (midiNumber - A4_MIDI_NUMBER) / 12);
  }
}

type NoteName = ArrayElement<typeof CHROMATIC_NOTES>;

export { Note, type NoteName };
