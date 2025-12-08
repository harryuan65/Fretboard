import { CHROMATIC_NOTES, Note, NoteName } from "./Notes";
import { IScale } from "./Scale";

type DiatonicDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9 | 11 | 13;

type ChordTone = {
  note: Note;
  degree: DiatonicDegree;
};

type BuiltChord = {
  name: string;
  tones: ChordTone[];
};

/**
 * Build a diatonic chord (triad or seventh) from a scale degree.
 * - scaleNotes: IScale[] from Scale.calculateList()
 * - degreeIndex: 0..6
 * - includeSeventh: include 7th tone
 */
export function buildDiatonicChord(
  scaleNotes: IScale[],
  degreeIndex: number,
  includeSeventh: boolean
): BuiltChord {
  const wrap = (idx: number) => idx % 7;
  const root = scaleNotes[wrap(degreeIndex)].note;
  const third = scaleNotes[wrap(degreeIndex + 2)].note;
  const fifth = scaleNotes[wrap(degreeIndex + 4)].note;
  const tones: ChordTone[] = [
    { note: new Note(root.name as NoteName), degree: 1 },
    { note: new Note(third.name as NoteName), degree: 3 },
    { note: new Note(fifth.name as NoteName), degree: 5 },
  ];
  if (includeSeventh) {
    const seventh = scaleNotes[wrap(degreeIndex + 6)].note;
    tones.push({ note: new Note(seventh.name as NoteName), degree: 7 });
  }
  return {
    name: root.name,
    tones,
  };
}

/**
 * For Major scale, provide conventional diatonic triad names:
 * I, ii, iii, IV, V, vi, vii°
 */
export function nameMajorDiatonicTriad(
  scaleNotes: IScale[],
  degreeIndex: number
): string {
  const qualities = ["", "m", "m", "", "", "m", "dim"];
  const root = scaleNotes[degreeIndex % 7].note.name;
  return `${root}${qualities[degreeIndex % 7]}`;
}

export type { ChordTone, BuiltChord, DiatonicDegree };

// ---------------- Any Chord builder ----------------
export const MAIN_QUALITIES = ["", "m", "dim", "sus2", "sus4"] as const;
export const SUB_QUALITIES = [
  "",
  "6",
  "7",
  "9",
  "11",
  "13",
  "b5",
  "#9",
  "#11",
] as const;
export type MainQuality = (typeof MAIN_QUALITIES)[number];
export type SubQuality = (typeof SUB_QUALITIES)[number];

type Interval = { semis: number; degree?: DiatonicDegree };

const DEGREE_TO_SEMIS: Record<string, number> = {
  "1": 0,
  b2: 1,
  "2": 2,
  "#2": 3,
  b3: 3,
  "3": 4,
  "4": 5,
  "#4": 6,
  b5: 6,
  "5": 7,
  "#5": 8,
  b6: 8,
  "6": 9,
  b7: 10,
  "7": 11,
  "9": 2,
  "#9": 3,
  "11": 5,
  "#11": 6,
  "13": 9,
};

function noteFrom(root: NoteName, semitoneOffset: number): Note {
  const rootIndex = CHROMATIC_NOTES.indexOf(root);
  const idx = (rootIndex + semitoneOffset) % CHROMATIC_NOTES.length;
  return new Note(CHROMATIC_NOTES[idx as number] as NoteName);
}

/**
 * Build chord tones by base + main quality + optional sub quality.
 * Degrees: use 1/3/7 for color mapping; others omit degree for neutral highlight.
 */
export function buildAnyChord(
  base: NoteName,
  main: MainQuality,
  sub: SubQuality
): BuiltChord {
  const intervals: Interval[] = [];
  // triad by main
  switch (main) {
    case "":
      intervals.push({ semis: DEGREE_TO_SEMIS["1"], degree: 1 });
      intervals.push({ semis: DEGREE_TO_SEMIS["3"], degree: 3 });
      intervals.push({ semis: DEGREE_TO_SEMIS["5"] });
      break;
    case "m":
      intervals.push({ semis: DEGREE_TO_SEMIS["1"], degree: 1 });
      intervals.push({ semis: DEGREE_TO_SEMIS["b3"], degree: 3 }); // still degree 3 for color
      intervals.push({ semis: DEGREE_TO_SEMIS["5"] });
      break;
    case "dim":
      intervals.push({ semis: DEGREE_TO_SEMIS["1"], degree: 1 });
      intervals.push({ semis: DEGREE_TO_SEMIS["b3"], degree: 3 });
      intervals.push({ semis: DEGREE_TO_SEMIS["b5"] });
      break;
    case "sus2":
      intervals.push({ semis: DEGREE_TO_SEMIS["1"], degree: 1 });
      intervals.push({ semis: DEGREE_TO_SEMIS["2"] }); // no third
      intervals.push({ semis: DEGREE_TO_SEMIS["5"] });
      break;
    case "sus4":
      intervals.push({ semis: DEGREE_TO_SEMIS["1"], degree: 1 });
      intervals.push({ semis: DEGREE_TO_SEMIS["4"] }); // no third
      intervals.push({ semis: DEGREE_TO_SEMIS["5"] });
      break;
  }
  // sub additions
  switch (sub) {
    case "":
      break;
    case "6":
      intervals.push({
        semis: DEGREE_TO_SEMIS["6"],
        degree: 6 as DiatonicDegree,
      });
      break;
    case "7":
      intervals.push({
        semis: DEGREE_TO_SEMIS["b7"],
        degree: 7 as DiatonicDegree,
      });
      break;
    case "9":
      intervals.push({
        semis: DEGREE_TO_SEMIS["9"],
        degree: 9 as DiatonicDegree,
      });
      break;
    case "11":
      intervals.push({
        semis: DEGREE_TO_SEMIS["11"],
        degree: 11 as DiatonicDegree,
      });
      break;
    case "13":
      intervals.push({
        semis: DEGREE_TO_SEMIS["13"],
        degree: 13 as DiatonicDegree,
      });
      break;
    case "b5":
      // replace existing 5 if present
      // still include neutral degree (no color)
      intervals.push({
        semis: DEGREE_TO_SEMIS["b5"],
        degree: 5 as DiatonicDegree,
      });
      break;
    case "#9":
      intervals.push({
        semis: DEGREE_TO_SEMIS["#9"],
        degree: 9 as DiatonicDegree,
      });
      break;
    case "#11":
      intervals.push({
        semis: DEGREE_TO_SEMIS["#11"],
        degree: 11 as DiatonicDegree,
      });
      break;
  }

  // build tones
  const tones: ChordTone[] = intervals.map(({ semis, degree }) => ({
    note: noteFrom(base, semis),
    degree: (degree ?? 5) as DiatonicDegree, // non-colored defaults to 5 highlight
  }));

  return {
    name: base,
    tones,
  };
}
