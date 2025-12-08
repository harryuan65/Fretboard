import React, { useState } from 'react';
import Guitar from './components/Guitar';
import Tabs, { TabItem } from './components/Tabs';
import { IScale } from './utils/Scale';
import styles from './App.module.css';
import ScaleFinder from './components/ScaleFinder';
import { Note } from './utils/Notes';

const defaultTuning = [
  new Note('E', 4),
  new Note('B', 3),
  new Note('G', 3),
  new Note('D', 3),
  new Note('A', 2),
  new Note('E', 2),
];

function App() {
  const [scales, setScales] = useState<IScale[] | null>(null); // new Scale('C', 'major').calculateList()

  return (
    <div className="App">
      <main className={styles.main}>
        <Guitar tuning={defaultTuning} fretCount={22} scales={scales} />
        <Tabs>
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
