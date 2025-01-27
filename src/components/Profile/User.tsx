import { User01 } from "@/assets";

const User = () => {
  return (
    <div className="flex gap-3 items-center bg-white p-4 rounded-full dark:bg-gray-600 dark:text-gray-300">
      <img
        src={User01.src}
        alt="user image"
        className="w-14 h-14 rounded-full"
      />
      <div>
        <h3 className="font-semibold text-2xl">Ahmad Zaki Yamani</h3>
        <p className="font-medium text-sm">Developer</p>
      </div>
    </div>
  );
};

export default User;
