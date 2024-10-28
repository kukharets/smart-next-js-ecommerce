import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: 'var(--main)',
        second: 'var(--second)',
        minor: 'var(--minor)',
        solid: 'var(--solid)',
        text: 'var(--text)',
        warning: 'var(--warning)',
        error: 'var(--error)',
      },
    },
  },
  plugins: [],
};
export default config;
