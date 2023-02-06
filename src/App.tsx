import React, { useState } from 'react';
import Guitar from './components/Guitar';
import Tabs, { TabItem } from './components/Tabs';
import { IScaleWithStep } from './utils/Scale';
import styles from './App.module.css';
import ScaleFinder from './components/ScaleFinder';

function App() {
  const [scaleMap, setScaleMap] = useState<IScaleWithStep | null>(null); //new Scale('C', 'major').calculateList()

  return (
    <div className="App">
      <main className={styles.main}>
        <Guitar scaleMap={scaleMap} />
        <Tabs>
          <TabItem title="Scale">
            <ScaleFinder scaleMap={scaleMap} setScaleMap={setScaleMap} />
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
