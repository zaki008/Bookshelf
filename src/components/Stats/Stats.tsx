import { empolyeesData } from "@/constants";
import Title from "@/ui/Title";
import Card from "./Card";

interface IProps {
  darkMode: boolean;
}

const Stats = ({ darkMode }: IProps) => {
  return (
    <div className="flex flex-col gap-5 w-100">
      <Title>Dashboard</Title>
      <div className="flex gap-4 flex-col tablet:flex-row h-full w-full">
        {empolyeesData.map((data, index) => {
          return <Card key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default Stats;
