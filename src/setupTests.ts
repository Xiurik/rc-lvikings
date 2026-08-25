/**
 * Setup global de Vitest, declarado en `vite.config.ts` (`test.setupFiles`).
 *
 * Registra los matchers de jest-dom (`toHaveAttribute`, `toBeInTheDocument`, …) que usan
 * las pruebas de componentes; sin esto, Vitest no los conoce y el suite ni siquiera carga.
 */
import '@testing-library/jest-dom/vitest';
