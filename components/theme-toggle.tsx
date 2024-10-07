'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        console.log(`Mudando tema para: ${newTheme}`); // Log para depuração
        setTheme(newTheme);
      }}
    >
      {theme === 'dark' ? (
        <IconSun className="transition-transform transform rotate-180" />
      ) : (
        <IconMoon className="transition-transform" />
      )}
      <span className="sr-only">Ativar tema</span>
    </Button>
  );
}



function IconMoon({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 ${className}`}
      {...props}
    >
      <path d="M12 3C10.5 3 9 3.9 8.2 5.2C6.8 5.8 5.7 7 5.1 8.4C4.5 9.8 5 11.5 6 12.5C6.7 12.8 7.5 13 8.2 13C8.4 13 8.7 13 9 12.9C9.2 12.8 9.4 12.6 9.6 12.4C10.3 13 11.3 13.5 12.3 13.5C14.8 13.5 16.8 11.5 16.8 9C16.8 6.5 14.8 4.5 12.3 4.5C11.6 4.5 11 4.8 10.4 5C9.6 4.1 8.4 3 7 3H12Z" />
    </svg>
  );
}

function IconSun({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 ${className}`}
      {...props}
    >
      <path d="M12 3C10.5 3 9 4 8 5.5C6.5 5.8 5.1 7 4.5 8.5C4 9.5 4.5 11.1 5.5 12.1C6 12.3 6.6 12.5 7.3 12.5C8 12.5 8.5 12.3 9 12C9.6 12.6 10.5 13 11.5 13C13.2 13 14.8 11.5 14.8 10C14.8 8.5 13.2 7 11.5 7C10.5 7 9.6 7.5 9 8.1C8.5 7.5 8 7 7 7C5.3 7 4 8.3 4 10C4 11.7 5.3 13 7 13H12Z" />
    </svg>
  );
}
