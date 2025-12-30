'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React, { Fragment } from 'react';

export default function Breadcrumbs() {
    const pathname = usePathname();

    // Don't render on home page or if pathname is empty
    if (pathname === '/' || !pathname) {
        return null;
    }

    const pathSegments = pathname.split('/').filter((segment) => segment !== '');

    return (
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl pt-6 pb-2">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/" className="transition-colors hover:text-foreground">
                                Home
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathSegments.map((segment, index) => {
                        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathSegments.length - 1;

                        // Format title: capitalizes and properly spaces dashes, decodes URI components for nicer text
                        const decodedSegment = decodeURIComponent(segment);
                        const title = decodedSegment
                            .split('-')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');

                        return (
                            <Fragment key={href}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>{title}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link href={href} className="transition-colors hover:text-foreground">
                                                {title}
                                            </Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
