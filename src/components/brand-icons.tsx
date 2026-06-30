import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

export function GithubIcon({ size = 20, ...props }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.11 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, ...props }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.7a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM20 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V8h3v1.77c1.4-2.59 7-2.78 7 2.48V19z" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, ...props }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}
