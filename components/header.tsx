/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { auth } from '@/auth';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  IconInstagram,
  IconSeparator,
  IconVercel,
} from '@/components/ui/icons';
import { UserMenu } from '@/components/user-menu';
import { SidebarMobile } from './sidebar-mobile';
import { SidebarToggle } from './sidebar-toggle';
import { ChatHistory } from './chat-history';
import { Session } from '@/lib/types';

interface HeaderProps {
  children?: React.ReactNode; // Permita que children seja opcional
}

async function UserOrLogin() {
  const session = (await auth()) as Session;
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          <img
            className="size-8 rounded-md"
            src="/images/ogi.webp"
            alt="Ogi Seguros Logo"
          />
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="size-6 text-neutral-500" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Faça seu Login</Link>
          </Button>
        )}
      </div>
    </>
  );
}

export function Header({ children }: HeaderProps) {
  return (
<header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-gradient-to-b from-gray-600/50 via-white to-gray-100/5 backdrop-blur-lg">      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button asChild size="sm" variant="ghost">
          <a
            target="_blank"
            href="https://www.instagram.com/ogiseguros/"
            rel="noopener noreferrer"
          >
            <IconInstagram className="size-6 text-gray-800" />
            <span className="hidden ml-2 md:flex text-gray-500">Instagram</span>
          </a>
        </Button>
        <Button asChild size="sm" className="rounded-lg gap-1 bg-purple-800 hover:bg-purple-600 transition duration-300">
          <a href="https://ogiseguros.com.br" target="_blank" className="text-white px-4 py-2 rounded-lg">
          <IconVercel className="size-3" />
           <span className="hidden sm:block">Cote no site</span>
           <span className="sm:hidden">Cotar</span>
         </a>
        </Button>
      </div>
    </header>
  );
}
