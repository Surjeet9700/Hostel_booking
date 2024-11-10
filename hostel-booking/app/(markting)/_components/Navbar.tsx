"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";


import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Spinner } from "@/components/Spinner";
import { ModeToggle } from "@/components/ModeToggle";


export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();
    return (
        <div className={cn("z-50 bg-background dark:bg-black fixed top-0 flex w-full p-6 items-center",
            scrolled && "border-b shadow-sm ", scrolled && "dark: border-b shadow-sm"

        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <Spinner/>
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant='ghost' size='sm'>
                                Log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button  size='sm'>
                                Get Started
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                    <Button variant='outline' size='sm' asChild>
                        <Link href="/home">
                            Book Rooms
                        </Link>
                    </Button>
                    <UserButton/>
                    </>
                ) }
                <ModeToggle />
            </div>

        </div>
    )
}
