import React, { useState } from 'react';
import Guitar from './components/Guitar';
import Tabs, { TabItem } from './components/Tabs';
import { IScale } from './utils/Scale';
import styles from './App.module.css';
import ScaleFinder from './components/ScaleFinder';
import useTuning from './hooks/useTuning';
import TuningSelector from './components/TuningSelector';

function App() {
  const [scales, setScales] = useState<IScale[] | null>(null); // new Scale('C', 'major').calculateList()
  const { tuning, setString } = useTuning();

  return (
    <div className="App">
      <main className={styles.main}>
        <Guitar tuning={tuning} fretCount={22} scales={scales} />
        <Tabs>
          <TabItem title="Tuning">
            <TuningSelector tuning={tuning} onChange={setString} />
          </TabItem>
          <TabItem title="Scale">
            <ScaleFinder scales={scales} setScales={setScales} />
          </TabItem>
          <TabItem title="Chord">WIP</TabItem>
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
