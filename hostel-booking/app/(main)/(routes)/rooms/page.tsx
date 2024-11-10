import HostelDetails from "../../_components/HostelDetails"



const page = () => {
  return (
    <div className="min-h-full flex flex-col ">
    <div className="flex flex-col items-center justify-center
     text-center gap-y-8 px-6 pb-10">
      <HostelDetails/>
    </div>
    </div>
  )
}

export default page