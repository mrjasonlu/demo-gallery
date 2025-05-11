import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import ArtWork from './features/artWork/ArtWork';
import ArtWorks from './features/artworks/ArtWorkList';
import { store } from './store/store';
import { BrowserRouter, Route, Routes } from 'react-router';
import AppLayout from '@/components/global/appLayout/AppLayout';
import ScrollToTop from '@/utils/router/ScrollToTop';
import './index.css';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<ArtWorks />} />
              <Route path="artwork/:id" element={<ArtWork />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error('Error: Root element not found.');
}
