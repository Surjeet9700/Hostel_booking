"use client"

import { Spinner } from "@/components/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navbar from "./_components/Navbar";
import Link from "next/link";

const MainLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
    const {isAuthenticated, isLoading} = useConvexAuth();
    
    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Spinner size='lg'/>
            </div>
        );
    }

    if (!isAuthenticated) {
        redirect('/');
        return null; // Ensure the component does not render anything after redirect
    }

    return ( 
        <div className="h-full w-screen flex flex-col">
            <Link href="/home">
                <Navbar />
            </Link>
            <main className="flex-1 h-full overflow-y-auto"> 
                {children}
            </main>
        </div>
    );
}
 
export default MainLayout;