"use client"


import { Spinner } from "@/components/Spinner";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
    const {isAuthenticated, isLoading} = useConvexAuth();
    
    return ( 
        <div className="max-w-4xl space-y-4 ">
            <BackgroundLines className="flex items-center justify-center w-full z-0 flex-col px-4">
            <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            Find & Book Your Perfect Hostel. Welcome to <br/> <span 
                className="underline">Hostel Finder</span> 
            </h1>
            <h3 className="max-w-xl mx-auto mb-3  md:mb-3 text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            Explore, select, and reserve your ideal student accommodation nearby with ease.
            </h3>

            {isLoading && (
                <div className=" w-full flex justify-center items-center">
                    <Spinner size='lg'/>
                </div>
            )}

            {isAuthenticated && !isLoading &&(
                <Button asChild className="z-50">
                    <Link href='/home' >
                    Book Hostel
                    <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            )}

            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal" >
                    <Button size='sm' className="z-50">
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
                    </Button>
                </SignInButton>
            )}
                </BackgroundLines>


        </div>
     );
}
 
export default Heading;