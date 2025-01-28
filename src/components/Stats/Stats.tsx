import { bookData } from "@/constants";
import Title from "@/ui/Title";
import Card from "./Card";

const Stats = () => {
  return (
    <div className="flex flex-col gap-5 w-100">
      <Title>Dashboard</Title>
      <div className="flex gap-4 flex-col tablet:flex-row h-full w-full">
        {bookData.map((data, index) => {
          return <Card key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default Stats;
