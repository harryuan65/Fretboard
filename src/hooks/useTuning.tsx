import { useState } from "react";
import { NoteName } from "../utils/Notes";

const useTuning = () => {
  const [tuning, setTuning] = useState<NoteName[]>(['E', 'A', 'D', 'G', 'B', 'E']);
}