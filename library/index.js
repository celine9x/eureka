/**
 * Eureka Design System - Main Entry Point
 *
 * Import this file to register all components:
 *   import './library/index.js';
 *
 * Or import individual components:
 *   import './library/atoms/button.js';
 *   import './library/molecules/text-input/text-input.js';
 */

// ===========================================
// ATOMS - Standalone components
// ===========================================
import './atoms/button.js';
import './atoms/radio-button.js';
import './atoms/chip.js';
import './atoms/checkbox.js';
import './atoms/link.js';
// import './atoms/badge.js';       // Coming soon

// ===========================================
// MOLECULES - Composed components
// ===========================================
import './molecules/text-input/text-input.js';
import './molecules/radio-card.js';
import './molecules/dropdown-list/dropdown-list.js';
// import './molecules/search-bar.js';     // Coming soon
// import './molecules/dropdown.js';       // Coming soon

// ===========================================
// ORGANISMS - Complex sections
// ===========================================
import './organisms/table/table-cell.js';
import './organisms/table/table-cell-title.js';
import './organisms/table/table-cell-header.js';
import './organisms/table/table.js';
import './organisms/hub-header.js';
// import './organisms/login-form.js';     // Coming soon
// import './organisms/nav-bar.js';        // Coming soon
// import './organisms/dialog.js';         // Coming soon
// import './organisms/modal.js';          // Coming soon

// ===========================================
// TEMPLATES - Full page sections
// ===========================================
import './templates/hub.js';

console.log('Eureka Design System loaded');
