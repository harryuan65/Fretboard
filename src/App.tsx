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
        <Guitar highlightScale={scaleMap} />
        <Tabs>
          <TabItem title="Scale">
            <ScaleFinder setScaleMap={setScaleMap} />
          </TabItem>
          <TabItem title="你好">World</TabItem>
          <TabItem title="Test">
            <div>
              <button
                style={{ cursor: 'pointer' }}
                onClick={() => console.log('Hello!')}
              >
                按按看～
              </button>
            </div>
          </TabItem>
        </Tabs>
      </main>
    </div>
  );
}

export default App;
