import HostelDetails from "@/app/(main)/_components/HostelDetails";


type Props = {
  params: {
    id: string;
  };
};

const RoomPage = ({ params }: Props) => {
  return <HostelDetails id={params.id} />;
};

export default RoomPage;