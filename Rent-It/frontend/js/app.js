import { mapLogic } from './models/map.js';
import { setActions } from './models/set-actions.js';

// Load and Hash Change
window.addEventListener('load', () => {
    mapLogic();
    setActions();
});