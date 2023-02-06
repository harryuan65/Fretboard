import React from 'react';
import Guitar from './components/Guitar';
import Tabs, { TabItem } from './components/Tabs';
import Scale from './utils/ScaleFinder';
import styles from './App.module.css';
function App() {
  const defaultKey = 'C';
  const defaultScaleType = 'minor';
  const defaultScale = new Scale(defaultKey, defaultScaleType);
  defaultScale.calculateList();
  const scaleNotes = defaultScale.scaleNotes;

  return (
    <div className="App">
      <main className={styles.main}>
        <Guitar highlightScale={defaultScale.scaleNotesMap} />
        <h2>
          Displaying scale: {defaultKey} {defaultScaleType}
        </h2>
        <h3>Notes: {scaleNotes.join(', ')}</h3>
        <Tabs>
          <TabItem title="Hello">Hello</TabItem>
          <TabItem title="World">World</TabItem>
          <TabItem title="天阿">
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
