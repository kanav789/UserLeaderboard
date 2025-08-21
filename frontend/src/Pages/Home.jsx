import { Button, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import axiox from "axios";
import { DataContext } from "../Context/DataContext.jsx";
import { BounceLoader } from "react-spinners";
import AddUser from "../components/AddUser.jsx";
function Home() {
  const { data, setData } = useContext(DataContext);
  const [Loader, setLoader] = useState(false);
  const [AddOpen, setAddOpen] = useState(false);
  useEffect(() => {
    fetchAllUser();
  }, []);
  const fetchAllUser = async () => {
    try {
      setLoader(true);
      const response = await axiox.get(
        `${import.meta.env.VITE_BASE_URL}api/user/all`
      );
      setData(response?.data?.data?.users);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "TotalPoints",
      dataIndex: "totalPoints",
      key: "totalPoints",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (key) => (
        <>
          <Button>Claim</Button>
        </>
      ),
    },
  ];

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Logo / Title */}
      <h1 className="text-3xl font-bold text-black mb-6">🏆 Leaderboard</h1>

      {/* Header */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-4 flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black">Claim Record</h2>
        <button
          className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition  font-semibold cursor-pointer"
          onClick={() => setAddOpen(true)}
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      {Loader ? (
        <div className="flex justify-center mt-10">
          <BounceLoader size={50} color="gray" />
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-4">
          <Table
            dataSource={data}
            columns={columns}
            className="overflow-x-auto "
            pagination={{
              pageSize: 5,
            }}
          />
        </div>
      )}

      <AddUser isOpen={AddOpen} onClose={() => setAddOpen(false)} />
    </section>
  );
}

export default Home;
