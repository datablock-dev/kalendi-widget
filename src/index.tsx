/**
 * Kalendi Widget v1.0.0
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

export { default as KalendiContainer } from './KalendiContainer'
export * from './KalendiContainer'


import React from 'react';
import ReactDOM from 'react-dom/client';
import KalendiContainer from './KalendiContainer';
import './style.css'
import './tailwind.css'

const root = ReactDOM.createRoot(document.getElementById('root')!); // Use non-null assertion operator (!) or check if getElementById returns null
root.render(
  <React.StrictMode>
    <KalendiContainer 
        backendRoute='http://localhost:6969'
    />
  </React.StrictMode>
);