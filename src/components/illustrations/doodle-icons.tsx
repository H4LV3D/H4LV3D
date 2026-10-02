import * as React from "react";

/*
 * Hand-drawn icon set. Every path is slightly wobbly on purpose. They inherit
 * `currentColor`, so they work in light/dark and with the brand colour.
 */
type IconProps = React.SVGProps<SVGSVGElement>;

function Icon({ children, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.2 12.8c1.9 1.6 3.6 3.6 5.4 6 2.6-5.6 6.4-10.4 10.6-14.6" />
  </Icon>
);

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.2 12.4c5.6-.6 11.4-.3 17 .1" />
    <path d="M14.6 6.2c2.3 1.9 4.2 3.9 5.9 6.2-2 2-4 3.9-6.3 5.6" />
  </Icon>
);

export const ArrowUpRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.6 18.6c4.1-4.3 8.4-8.5 12.8-12.7" />
    <path d="M8.6 5.4c3.3.2 6.6.3 10-.1-.3 3.3-.2 6.7.1 10" />
  </Icon>
);

export const ArrowUp = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12.2 20.6c-.4-5.6-.3-11.3.1-16.9" />
    <path d="M6.1 9.4c2-2 3.9-3.9 6.1-5.8 1.9 2 3.8 4 5.8 5.9" />
  </Icon>
);

export const Sun = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12.3 7.6c2.6-.1 4.4 2 4.2 4.5-.2 2.5-2.3 4.3-4.7 4.2-2.5-.2-4.2-2.2-4.1-4.6.2-2.3 2-4 4.6-4.1Z" />
    <path d="M12 2.4v2.3M12.1 19.3v2.3M2.5 12.1h2.3M19.2 11.9h2.3M5.3 5.2l1.6 1.7M17.1 17.1l1.6 1.6M5.4 18.7 7 17.1M17 6.9l1.7-1.6" />
  </Icon>
);

export const Moon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19.8 14.6c-1.3 3.4-4.6 5.8-8.4 5.6-4.6-.2-8.2-4.1-7.9-8.8.2-3.7 2.8-6.8 6.2-7.7-1.6 2.3-1.9 5.4-.5 8.1 1.8 3.5 6 5.1 9.7 3.6.3-.2.6-.5.9-.8Z" />
  </Icon>
);

export const Monitor = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.4 5.1c5.8-.4 11.5-.3 17.2.1.3 3.6.2 7.2-.1 10.8-5.6.3-11.3.3-17 0-.3-3.6-.4-7.3-.1-10.9Z" />
    <path d="M8.4 20.2c2.4-.2 4.8-.2 7.2.1M12 16.3v3.6" />
  </Icon>
);

export const Globe = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12.2 3.1c5-.1 8.8 3.9 8.7 8.9-.1 4.9-4 8.8-8.9 8.8-5 0-8.9-4-8.8-9 .2-4.9 4-8.6 9-8.7Z" />
    <path d="M12.1 3.3c-2.6 2.4-3.9 5.4-3.8 8.8.1 3.4 1.4 6.3 3.9 8.6 2.4-2.4 3.7-5.4 3.7-8.8 0-3.3-1.3-6.2-3.8-8.6Z" />
    <path d="M3.6 9.3c5.6-.6 11.2-.6 16.8.1M3.7 14.8c5.6.5 11.2.5 16.7-.1" />
  </Icon>
);

export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.6 7.2c5.6-.4 11.2-.3 16.8.2" />
    <path d="M3.4 12.3c5.7.2 11.3 0 17-.4" />
    <path d="M3.8 17.1c4.1-.3 8.2-.2 12.3.2" />
  </Icon>
);

export const Close = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.2 5.4c4.4 4.2 8.9 8.6 13.5 13.3" />
    <path d="M18.6 5.1c-4.4 4.4-9 8.9-13.3 13.6" />
  </Icon>
);

export const Copy = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8.6 8.4c3.8-.3 7.6-.2 11.4.1.3 3.8.2 7.6-.1 11.4-3.8.3-7.6.3-11.3 0-.3-3.9-.3-7.7 0-11.5Z" />
    <path d="M15.6 5.1c0-.6-.1-1.2-.1-1.6-3.8-.2-7.6-.2-11.3 0-.3 3.8-.2 7.6 0 11.4l1.7.1" />
  </Icon>
);

export const Mail = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.3 5.9c5.8-.4 11.6-.3 17.4.1.3 4 .2 8.1-.1 12.1-5.8.3-11.5.3-17.2 0-.4-4.1-.4-8.2-.1-12.2Z" />
    <path d="M3.6 6.4c2.7 2.4 5.5 4.6 8.5 6.6 3-2 5.9-4.3 8.4-6.8" />
  </Icon>
);

export const Command = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 9.1V6.6a2.5 2.5 0 1 0-2.5 2.5H9Zm0 0h6m-6 0v5.8m6-5.8V6.6a2.5 2.5 0 1 1 2.5 2.5H15Zm0 0v5.8m0 0H9m6 0v2.5a2.5 2.5 0 1 0 2.5-2.5H15Zm-6 0v2.5a2.5 2.5 0 1 1-2.5-2.5H9Z" />
  </Icon>
);

export const Plus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12.3 3.5c-.4 5.6-.2 11.3.1 17" />
    <path d="M3.6 12.2c5.5-.5 11.2-.3 16.9.2" />
  </Icon>
);

export const Grid = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 4.2c2.2-.2 4.3-.1 6.4.1.2 2.1.1 4.2-.1 6.2-2.1.2-4.2.2-6.3 0-.2-2.1-.2-4.2 0-6.3ZM13.7 4.1c2.1-.1 4.2 0 6.3.2.2 2.1.1 4.2-.1 6.3-2.1.1-4.2.1-6.3-.1-.1-2.1-.1-4.3.1-6.4ZM4.1 13.6c2.1-.2 4.2-.1 6.3.1.2 2.1.1 4.2-.1 6.3-2.1.1-4.2.1-6.3-.1-.1-2.1-.1-4.2.1-6.3ZM13.6 13.7c2.2-.2 4.3-.1 6.4.1.1 2.1.1 4.2-.1 6.3-2.1.1-4.2.1-6.3-.1-.2-2.1-.2-4.2 0-6.3Z" />
  </Icon>
);

export const List = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.6 6.1c5.6-.3 11.2-.2 16.8.2M3.4 12.1c5.7.2 11.3.1 17-.3M3.7 18c5.5-.3 11.1-.2 16.7.2" />
  </Icon>
);
