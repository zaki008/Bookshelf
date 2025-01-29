"use client";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Stats from "@/components/Stats/Stats";
import Table from "@/components/Table";
import { getBooks } from "@/redux/slice/bookSlice";
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
  const [paging, setPaging] = useState({
    page: 1,
    size: 10,
  });

  console.log("data", data);

  useEffect(() => {
    dispatch(getBooks(paging));
  }, []);

  const toogleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <DarkMode>
      <Header toogleSidebar={toogleSidebar} />
      <Sidebar sidebarOpen={sidebarOpen} />
      <MainUI>
        <Content>
          <Stats />
          <Filter />
          <Table />
        </Content>
        {/* <Profile /> */}
      </MainUI>
    </DarkMode>
  );
};

export default Home;
