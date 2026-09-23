import React from 'react';
import { createRoot } from 'react-dom/client';

import { VoiceDemo } from './voice-demo';
import './widget.css';

const mount = document.getElementById('hero-voice-demo');

if (mount) {
  createRoot(mount).render(
    <React.StrictMode>
      <VoiceDemo />
    </React.StrictMode>
  );
}
