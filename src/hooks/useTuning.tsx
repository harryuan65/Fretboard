import { useCallback, useState } from "react";
import { Note, NoteName } from "../utils/Notes";

const defaultTuning = [
  new Note('E', 4),
  new Note('B', 3),
  new Note('G', 3),
  new Note('D', 3),
  new Note('A', 2),
  new Note('E', 2),
];

type UseTuningResult = {
  tuning: Note[];
  setString: (index: number, name: NoteName, octave: number) => void;
  setTuning: React.Dispatch<React.SetStateAction<Note[]>>;
};

const useTuning = (initial?: Note[]): UseTuningResult => {
  const [tuning, setTuning] = useState<Note[]>(initial ?? defaultTuning);

  const setString = useCallback((index: number, name: NoteName, octave: number) => {
    setTuning((prev) =>
      prev.map((n, i) => (i === index ? new Note(name, octave) : n))
    );
  }, []);

  return { tuning, setString, setTuning };
};

export default useTuning;