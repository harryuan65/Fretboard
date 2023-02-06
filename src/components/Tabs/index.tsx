import React, { useState } from 'react';
import styles from './styles.module.css';

interface TabItemProps {
  title: string;
  active?: boolean;
  children?: React.ReactElement | string | null;
}

interface TabsProps {
  children: React.ReactElement<TabItemProps>[] | null;
}

const TabItem: React.FC<TabItemProps> = ({ title, children, active }) => {
  return (
    <div className={[styles.tabItem, active && styles.active].join(' ')}>
      {children}
    </div>
  );
};

const Tabs: React.FC<TabsProps> = ({ children }: TabsProps) => {
  const [activeIndex, setActive] = useState(0);
  const updatedChildren = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        active: activeIndex === i,
      });
    }
    return child;
  });
  return (
    <div className={styles.tabs}>
      <div className={styles.tabEntryWrap}>
        {children?.map(({ props }, i) => (
          <span
            key={props.title}
            className={[
              styles.tabEntry,
              activeIndex === i && styles.active,
            ].join(' ')}
            onClick={() => setActive(i)}
          >
            {props.title}
          </span>
        ))}
        <span className={styles.tabEntry}></span>
      </div>
      {updatedChildren}
    </div>
  );
};
export { TabItem };
export default Tabs;
