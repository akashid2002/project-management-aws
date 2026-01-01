import Header from "@/app/(components)/Header";
import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import React from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/app/lib/utils";
import { GridColDef } from "@mui/x-data-grid";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const Table = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 100,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
          {params.value}
        </span>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 75,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 130,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 130,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 130,
    },
    {
      field: "author",
      headerName: "Author",
      width: 150,
      renderCell: (params: GridRenderCellParams) =>
        params.value?.author || "Unknown",
    },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 150,
      renderCell: (params: GridRenderCellParams) =>
        params.value?.assignee || "Unassigned",
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured while fetching tasks.</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 rounded-md"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};

export default Table;
