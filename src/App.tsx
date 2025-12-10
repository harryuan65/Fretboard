import React, { useState } from 'react';
import Guitar from './components/Guitar';
import Tabs, { TabItem } from './components/Tabs';
import { IScale } from './utils/Scale';
import styles from './App.module.css';
import ScaleFinder from './components/ScaleFinder';
import useTuning from './hooks/useTuning';
import TuningSelector from './components/TuningSelector';
import { ChordTone } from './utils/Chord';
import ChordFinder from './components/ChordFinder';
import { NoteName } from './utils/Notes';
import { ScaleName } from './utils/Scale';

function App() {
  const [scales, setScales] = useState<IScale[] | null>(null); // new Scale('C', 'major').calculateList()
  const { tuning, setString } = useTuning();
  const [chordTones, setChordTones] = useState<ChordTone[] | null>(null);
  const [scaleKey, setScaleKey] = useState<NoteName | null>(null);
  const [scaleType, setScaleType] = useState<ScaleName | null>(null);
  const [capo, setCapo] = useState<number>(0);

  return (
    <div className="App">
      <main className={styles.main}>
        <Guitar
          tuning={tuning}
          fretCount={22}
          scales={chordTones && chordTones.length ? null : scales}
          chordTones={chordTones}
          capo={capo}
        />
        <Tabs>
          <TabItem title="Tuning">
            <TuningSelector tuning={tuning} onChange={setString} capo={capo} onCapoChange={setCapo} />
          </TabItem>
          <TabItem title="Scale / Mode">
            <ScaleFinder
              scales={scales}
              setScales={setScales}
              onKeyChange={setScaleKey}
              onScaleTypeChange={setScaleType}
            />
          </TabItem>
          <TabItem title="Chord">
            <ChordFinder
              scales={scales}
              scaleKey={scaleKey ?? undefined}
              scaleType={scaleType ?? undefined}
              onChordChange={setChordTones}
            />
          </TabItem>
        </Tabs>
      </main>
      <footer>
        Made with Typescript React by{' '}
        <a
          href="https://github.com/harryuan65"
          target="_blank"
          rel="noreferrer noopener"
        >
          harryuan65
        </a>
        .
      </footer>
    </div>
  );
}

export default App;
