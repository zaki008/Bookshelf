interface IProps {
  data: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    count: number;
    bgColor: string;
  };
}

const Card = ({ data }: IProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400 w-full">
      <span
        className={`${data.bgColor} px-3 py-6 text-2xl rounded-2xl dark:bg-gray-500`}
      >
        <data.icon className="text-4xl" />
      </span>
      <div>
        <p className="font-bold">{data.title}</p>
        <h2 className="text-xl">
          <span className="text-2xl font-bold">{data.count}</span>
        </h2>
      </div>
    </div>
  );
};

export default Card;
