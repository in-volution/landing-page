import React from 'react';
import { createRoot } from 'react-dom/client';

import { VoiceAura } from './voice-aura';
import './widget.css';

const mount = document.getElementById('hero-aura');

if (mount) {
  createRoot(mount).render(
    <React.StrictMode>
      <VoiceAura />
    </React.StrictMode>
  );
}
