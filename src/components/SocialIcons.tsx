/** Iconos de marca en SVG inline: sin dependencias externas y heredan `currentColor`. */

export interface IconProps {
  className?: string;
}

export function DiscordIcon({ className = 'size-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.369A19.79 19.79 0 0 0 15.432 3c-.21.375-.444.88-.608 1.283a18.27 18.27 0 0 0-5.487 0A12.6 12.6 0 0 0 8.72 3a19.74 19.74 0 0 0-4.886 1.372C.716 9.02-.132 13.51.284 17.938a19.9 19.9 0 0 0 6.03 3.043c.474-.64.897-1.32 1.26-2.035-.69-.26-1.352-.58-1.976-.955.166-.12.328-.246.484-.376 3.716 1.71 7.744 1.71 11.417 0 .158.13.32.256.484.376a12.6 12.6 0 0 1-1.98.957c.363.714.786 1.394 1.26 2.034a19.86 19.86 0 0 0 6.032-3.042c.5-5.177-.838-9.63-3.978-13.57ZM8.02 15.28c-1.183 0-2.157-1.085-2.157-2.42 0-1.334.955-2.42 2.157-2.42 1.21 0 2.185 1.095 2.166 2.42 0 1.335-.955 2.42-2.166 2.42Zm7.973 0c-1.183 0-2.157-1.085-2.157-2.42 0-1.334.955-2.42 2.157-2.42 1.21 0 2.185 1.095 2.166 2.42 0 1.335-.955 2.42-2.166 2.42Z" />
    </svg>
  );
}

export function XIcon({ className = 'size-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.5 6H18v4.5M17.5 6.5 10 14M16 14.5V18H6V8h3.5"
      />
    </svg>
  );
}
