'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Home, Mail, FileText, ShoppingCart, User as UserIcon, LogIn, ChevronRight } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

interface MobileMenuProps {
    session: any;
}

export default function MobileMenu({ session }: MobileMenuProps) {
    const [open, setOpen] = useState(false);

    const closeMenu = () => setOpen(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
                <SheetHeader className="p-6 text-left border-b">
                    <SheetTitle className="text-2xl font-black italic uppercase tracking-tighter">
                        Menu
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                    <nav className="flex flex-col p-4">
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="flex items-center justify-between py-4 px-2 text-lg font-bold hover:text-primary transition-colors border-b border-zinc-100 dark:border-zinc-800"
                        >
                            <div className="flex items-center gap-3">
                                <Home className="h-5 w-5 text-primary" />
                                Latest
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>

                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="flex items-center justify-between py-4 px-2 text-lg font-bold hover:text-primary transition-colors border-b border-zinc-100 dark:border-zinc-800"
                        >
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                Contact
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>

                        <Link
                            href="/sample-page"
                            onClick={closeMenu}
                            className="flex items-center justify-between py-4 px-2 text-lg font-bold hover:text-primary transition-colors border-b border-zinc-100 dark:border-zinc-800"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-primary" />
                                Sample Page
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>

                        <Link
                            href="/blog"
                            onClick={closeMenu}
                            className="flex items-center justify-between py-4 px-2 text-lg font-bold hover:text-primary transition-colors border-b border-zinc-100 dark:border-zinc-800"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-primary" />
                                Blog
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                    </nav>
                </div>

                <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 space-y-4">
                    {session?.user ? (
                        <div className="space-y-4">
                            <Button asChild className="w-full rounded-full font-bold h-12" variant="outline" onClick={closeMenu}>
                                <Link href="/profile" className="flex items-center gap-2">
                                    <UserIcon className="h-4 w-4" />
                                    Trang cá nhân
                                </Link>
                            </Button>
                            <Button className="w-full rounded-full font-bold h-12 bg-primary text-white shadow-lg" onClick={closeMenu}>
                                <Link href="/consult" className="flex items-center gap-2">
                                    Tư Vấn Ngay
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Button asChild className="w-full rounded-full font-bold h-12 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" variant="ghost" onClick={closeMenu}>
                                <Link href="/login" className="flex items-center justify-center gap-2">
                                    <LogIn className="h-4 w-4" />
                                    Đăng nhập
                                </Link>
                            </Button>
                            <Button asChild className="w-full rounded-full font-bold h-12 bg-primary text-white shadow-lg shadow-primary/20" onClick={closeMenu}>
                                <Link href="/register" className="flex items-center justify-center gap-2">
                                    Tham Gia Ngay
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
