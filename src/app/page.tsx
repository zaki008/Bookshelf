"use client";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Stats from "@/components/Stats/Stats";
import Table from "@/components/Table";
import Content from "@/ui/Content";
import DarkMode from "@/ui/DarkMode";
import MainUI from "@/ui/MainUI";
import { useState } from "react";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
