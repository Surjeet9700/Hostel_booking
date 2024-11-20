"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";


import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Spinner } from "@/components/Spinner";
import { ModeToggle } from "@/components/ModeToggle";


export const Navbar = () => {
    const { isLoaded, isSignedIn } = useUser();
    const scrolled = useScrollTop();
    return (
        <div className={cn("z-50 bg-background dark:bg-black fixed top-0 flex w-full p-6 items-center",
            scrolled && "border-b shadow-sm ", scrolled && "dark: border-b shadow-sm"

        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {!isLoaded
                 && (
                    <Spinner/>
                )}
                {!isLoaded && !isSignedIn && (
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
                {isLoaded && !isSignedIn && (
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
