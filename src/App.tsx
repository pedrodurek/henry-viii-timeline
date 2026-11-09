import { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import { AgeChart } from './components/AgeChart/AgeChart';
import { BurstProvider } from './components/Burst/BurstProvider';
import { Footer } from './components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import { Lives } from './components/Lives/Lives';
import { Minimap } from './components/Minimap/Minimap';
import { ModalProvider } from './components/Modal/ModalProvider';
import { Queens } from './components/Queens/Queens';
import { Quiz } from './components/Quiz/Quiz';
import { Reign, type Filter } from './components/Reign/Reign';
import { RoseDefs } from './components/Rose';
import { yearFraction } from './lib/dates';
import { EVENTS } from './lib/people';

export function App() {
  const [filter, setFilter] = useState<Filter>('all');

  // Clicking the top bar scrolls to the event nearest that year, clearing any filter first
  // so the event is visible.
  const jumpToYear = useCallback((year: number) => {
    let best = 0;
    EVENTS.forEach((e, i) => {
      if (Math.abs(yearFraction(e.d) - year) < Math.abs(yearFraction(EVENTS[best]!.d) - year)) best = i;
    });
    flushSync(() => setFilter('all'));
    document.getElementById(`ev-${best}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <BurstProvider>
      <ModalProvider>
        <RoseDefs />
        <Hero />
        <Minimap onJump={jumpToYear} />
        <main>
          <Queens />
          <AgeChart />
          <Reign filter={filter} onFilter={setFilter} />
          <Lives />
          <Quiz />
        </main>
        <Footer />
      </ModalProvider>
    </BurstProvider>
  );
}
