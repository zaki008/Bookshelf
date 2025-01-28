import Button from "@/ui/Button";
import Search from "@/ui/Search";
import { useState } from "react";
import ModalCreate from "./ModalCreate";

const Filter = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="mt-5 mb-3 md:flex md:flex-row md:justify-between md:items-center">
      <div>
        <Search />
      </div>
      <Button
        title="+ Tambah Buku"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-3 md:mt-1"
        onClick={() => setModalOpen(!modalOpen)}
      />
      {modalOpen && <ModalCreate setModalOpen={setModalOpen} />}
    </div>
  );
};

export default Filter;
