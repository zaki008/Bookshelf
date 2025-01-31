"use client";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Stats from "@/components/Stats/Stats";
import Table from "@/components/Table";
import { getBooks, resetBookRedux } from "@/redux/slice/bookSlice";
import { AppDispatch } from "@/redux/store";
import Content from "@/ui/Content";
import DarkMode from "@/ui/DarkMode";
import MainUI from "@/ui/MainUI";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, isLoading } = useSelector((state: any) => state.book);
  const page = useSelector((state: any) => state.book.page);

  useEffect(() => {
    dispatch(getBooks());
  }, [page]);

  useEffect(() => {
    dispatch(resetBookRedux());
  }, []);

  const toogleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  console.log("data?.countBook", data?.countBook);

  return (
    <DarkMode>
      <Header toogleSidebar={toogleSidebar} />
      <Sidebar sidebarOpen={sidebarOpen} />
      <MainUI>
        <Content>
          <Stats count={data?.countBook || {}} />
          <Filter />
          <Table data={data} isLoading={isLoading} page={page} />
        </Content>
        {/* <Profile /> */}
      </MainUI>
    </DarkMode>
  );
};

export default Home;
