import { Navbar } from "./_components/Navbar";



const MarketingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <div className="h-screen dark:bg-[#000000] ">
            <Navbar />
            <main className="h-full pt-40 md:pt-20">
                {children}
            </main>
        </div>

    );
}

export default MarketingLayout;