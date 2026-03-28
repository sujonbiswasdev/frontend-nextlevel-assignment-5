'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { IBaseUser } from '@/types/user.types';
import { navItems } from '@/routes/navitems';
import { getIconComponent } from '@/lib/iconMapper';

interface NavbarProps { user: IBaseUser | null }

export default function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsClient(true), []);

  const isActive = (path: string) => pathname === path;

  if (!isClient) return null; // render nothing on server

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">Planora</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map(item => {
            if (item.authRequired && !user) return null;
            if (item.roles && (!user || !item.roles.includes(user.role))) return null;
            const Icon = item.icon ? getIconComponent(item.icon) : null;
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.to)
                    ? 'bg-primary/20 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {user ? <Button variant="outline" size="sm">Log out</Button> :
            <>
              <Link href="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
              <Link href="/signup"><Button size="sm">Sign up</Button></Link>
            </>}
        </div>

        {/* Mobile */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-2">
          {navItems.map(item => {
            if (item.authRequired && !user) return null;
            if (item.roles && (!user || !item.roles.includes(user.role))) return null;
            const Icon = item.icon ? getIconComponent(item.icon) : null;
            return (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.to)
                    ? 'bg-primary/20 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}