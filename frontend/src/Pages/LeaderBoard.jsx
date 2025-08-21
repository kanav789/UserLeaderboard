import { Table, App, Card, Avatar } from "antd";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "../Context/DataContext.jsx";
import {
  CrownOutlined,
  TrophyOutlined,
  FireOutlined,
  UserOutlined,
  StarOutlined,
} from "@ant-design/icons";

function Leaderboard() {
  const { data, setData } = useContext(DataContext);
  const [Loader, setLoader] = useState(false);
  const { message } = App.useApp();

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/user/topPlayers`
      );
      const users = response?.data?.data?.users || [];
      setData(users);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  // Get medal/trophy for ranking
  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <CrownOutlined className="text-yellow-500 text-xl" />;
      case 1:
        return <TrophyOutlined className="text-gray-400 text-lg" />;
      case 2:
        return <TrophyOutlined className="text-amber-600 text-lg" />;
      default:
        return <span className="text-gray-500 font-bold">#{index + 1}</span>;
    }
  };

  // Enhanced rank styling for top 3
  const getRankStyling = (index) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg";
      case 1:
        return "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-md";
      case 2:
        return "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-md";
      default:
        return "bg-white border-gray-200";
    }
  };

  const columns = [
    {
      title: "Rank",
      key: "rank",
      width: 80,
      render: (_text, _record, index) => (
        <div className="flex items-center justify-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${getRankStyling(
              index
            )} text-gray-800`}
          >
            {getRankIcon(index)}
          </div>
        </div>
      ),
    },
    {
      title: "Player",
      dataIndex: "username",
      key: "username",
      render: (text, record, index) => (
        <div className="flex items-center gap-4">
          <Avatar
            size={50}
            className={`${
              index < 3 ? "ring-4 ring-offset-2" : "ring-2 ring-offset-1"
            } ${
              index === 0
                ? "ring-yellow-400"
                : index === 1
                ? "ring-gray-400"
                : index === 2
                ? "ring-amber-500"
                : "ring-blue-200"
            }`}
            style={{
              backgroundColor: index < 3 ? "#1890ff" : "#f0f0f0",
              color: index < 3 ? "white" : "#666",
            }}
            icon={<UserOutlined />}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`font-bold text-lg ${
                  index < 3 ? "text-gray-800" : "text-gray-700"
                }`}
              >
                {text}
              </span>
              {index === 0 && (
                <StarOutlined className="text-yellow-500 animate-pulse" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">
                {index === 0
                  ? "👑 Champion"
                  : index === 1
                  ? "🥈 Runner-up"
                  : index === 2
                  ? "🥉 Third Place"
                  : `Rank #${index + 1}`}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Score",
      dataIndex: "totalPoints",
      key: "totalPoints",
      render: (points, record, index) => (
        <div className="text-right">
          <div className="flex items-center justify-end gap-2 mb-2">
            <FireOutlined className="text-orange-500" />
            <span className="font-bold text-xl text-gray-700">
              {points?.toLocaleString() || 0}
            </span>
          </div>
        </div>
      ),
    },
  ];

  // Enhanced Top 3 podium component
  const PodiumCard = ({ user, position, index }) => (
    <Card
      className={`text-center relative overflow-hidden transition-all duration-500 hover:transform hover:scale-105 border-2 ${
        position === 1
          ? "order-2 transform scale-110 z-10 border-yellow-300"
          : position === 2
          ? "order-1 border-gray-300"
          : "order-3 border-amber-300"
      }`}
      bodyStyle={{ padding: "24px 16px" }}
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 ${getRankStyling(index)} opacity-10`}
      ></div>

      {/* Shine effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>

      <div className="relative z-10">
        <Avatar
          size={position === 1 ? 80 : 64}
          className={`mb-4 ring-4 ring-offset-4 ${
            position === 1
              ? "ring-yellow-400 ring-offset-yellow-50"
              : position === 2
              ? "ring-gray-400 ring-offset-gray-50"
              : "ring-amber-400 ring-offset-amber-50"
          }`}
          style={{ backgroundColor: "#1890ff" }}
          icon={<UserOutlined />}
        />

        <div className="mb-3">
          {position === 1 ? (
            <div className="text-3xl animate-bounce">👑</div>
          ) : position === 2 ? (
            <div className="text-2xl">🥈</div>
          ) : (
            <div className="text-2xl">🥉</div>
          )}
        </div>

        <h3
          className={`font-bold mb-2 text-gray-800 ${
            position === 1 ? "text-xl" : "text-lg"
          }`}
        >
          {user?.username || "No Player"}
        </h3>

        <div className="flex items-center justify-center gap-1 text-gray-700 mb-2">
          <FireOutlined className="text-orange-500" />
          <span className="font-bold text-lg">
            {user?.totalPoints?.toLocaleString() || 0}
          </span>
        </div>

        <div
          className={`text-sm font-medium ${
            position === 1
              ? "text-yellow-600"
              : position === 2
              ? "text-gray-600"
              : "text-amber-600"
          }`}
        >
          {position === 1
            ? "🏆 Champion"
            : position === 2
            ? "🥈 Silver Medal"
            : "🥉 Bronze Medal"}
        </div>
      </div>

      {/* Podium base */}
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 ${
          position === 1
            ? "h-8 bg-yellow-200"
            : position === 2
            ? "h-6 bg-gray-200"
            : "h-4 bg-amber-200"
        } rounded-t-md opacity-30`}
      ></div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}

        {Loader ? (
          <Card className="text-center mb-8">
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <span className="ml-4 text-lg">Loading champions...</span>
            </div>
          </Card>
        ) : (
          <>
            {/* Hall of Fame (Top 3) */}
            {data.length >= 3 && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    ✨ Hall of Fame ✨
                  </h2>
                  <p className="text-gray-600">Our legendary top 3 players</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {data.slice(0, 3).map((user, index) => (
                    <PodiumCard
                      key={user._id}
                      user={user}
                      position={index + 1}
                      index={index}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Complete Rankings Table */}
            <Card className="shadow-lg">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Complete Rankings
                </h3>
                <p className="text-gray-600">Full leaderboard standings</p>
              </div>
              <Table
                dataSource={data}
                columns={columns}
                rowKey="_id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} players`,
                }}
                className="custom-table"
              />
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
