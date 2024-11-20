import { AnimatedTestimonialsDemo } from "./_components/AnimatedTestimonialsDemo";
import { Footer } from "./_components/Footer";
import Heading  from "./_components/Heading";
import { Lamp } from "./_components/Lamp";
import {ParallaxScrollDemo} from "./_components/ParallaxScrollDemo"

const marketingpage = () => {
  return ( 
    <div className="min-h-full flex flex-col ">
      <div className="flex flex-col items-center justify-center
       text-center gap-y-8 px-6 pb-10">
        <Heading/>
        <ParallaxScrollDemo/>
        <div>
        <AnimatedTestimonialsDemo/>
        </div>
        <Lamp/>

      </div>
          <Footer/>

    </div>
   );
}
 
export default marketingpage;