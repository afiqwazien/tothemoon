// types/global.d.ts

// Ensure this is treated as a module
export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmpx-place-autocomplete': any; // or define props if you want
    }
  }
}
