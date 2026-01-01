"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import BoardView from "../BoardView";
import { useParams } from "next/navigation";
import ListView from "../ListView";
import TimeLine from "../TimeLine";
import Table from "../TableView";
import ModalNewTask from "../../(components)/ModalNewTask";

const Page = () => {
  const params = useParams();
  const { id } = params;

  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* New Task Modal */}
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id as string}
      />

      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView
          id={id as string}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}

      {activeTab === "List" && (
        <ListView
          id={id as string}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}

      {activeTab === "Timeline" && (
        <TimeLine
          id={id as string}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}

      {activeTab === "Table" && (
        <Table
          id={id as string}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
    </div>
  );
};

export default Page;
