import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
:root{ 
  --cta:#4F46E5;
  --white:#ffffff;
  --menu-hover:#ddd6fe;
  --grey-txt:#475569;
  --grey-border:#d4d4d8;
  --pink:#EB54BC;
  --green:#14b8a6;
  --blue:#3b82f6;
  --purple:#a855f7;
  --black:#0f172a;
}

*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
  padding: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
::-webkit-scrollbar {
  width: 5px;
  color: var(--grey-border);
  }
::-webkit-scrollbar-thumb {
  background-color: var(--grey-txt);
  border-radius: 1000px;
    background-color: var(--cta);
    border: 2px solid var(--cta);
}
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
`;