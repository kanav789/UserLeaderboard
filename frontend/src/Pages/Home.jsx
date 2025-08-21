import { Button, Table, App, Card, Avatar, Badge, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "../Context/DataContext.jsx";
import { BounceLoader } from "react-spinners";
import AddUser from "../components/AddUser.jsx";
import { useNavigate } from "react-router-dom";
import {
  TrophyOutlined,
  UserAddOutlined,
  GiftOutlined,
  FireOutlined,
  UserOutlined,
  TeamOutlined,
  WalletOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

function Home() {
  const { data, setData } = useContext(DataContext);
  const [Loader, setLoader] = useState(false);
  const [AddOpen, setAddOpen] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/user/all`
      );
      setData(response?.data?.data?.users);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const claimTotalPoints = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/user/claim`,
        { userId: id }
      );
      message.success(
        response?.data?.message || "Points claimed successfully! 🎉"
      );
      fetchAllUser();
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to claim points";
      message.error(errorMsg);
    }
  };

  // Generate avatar colors based on username
  const getAvatarColor = (username) => {
    const colors = [
      "#f56a00",
      "#7265e6",
      "#ffbf00",
      "#00a2ae",
      "#52c41a",
      "#1890ff",
      "#722ed1",
      "#eb2f96",
      "#fa541c",
      "#13c2c2",
      "#52c41a",
      "#faad14",
    ];
    const index = username?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  // Get user status based on points
  const getUserStatus = (points) => {
    if (points >= 5000) return { status: "VIP", color: "#faad14", icon: "💎" };
    if (points >= 1000)
      return { status: "Active", color: "#52c41a", icon: "🔥" };
    if (points >= 100)
      return { status: "Member", color: "#1890ff", icon: "⭐" };
    return { status: "New", color: "#722ed1", icon: "🌟" };
  };

  const columns = [
    {
      title: "User Profile",
      dataIndex: "username",
      key: "username",
      render: (text, record) => {
        const userStatus = getUserStatus(record.totalPoints || 0);

        return (
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar
                size={60}
                style={{
                  backgroundColor: getAvatarColor(text),
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "20px",
                  border: "3px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                className="transition-all duration-300 hover:scale-110"
              >
                {text?.charAt(0)?.toUpperCase() || <UserOutlined />}
              </Avatar>

              {/* Status badge */}
              <div className="absolute -bottom-1 -right-1 text-lg">
                {userStatus.icon}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-xl text-gray-800">{text}</span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Available Points",
      dataIndex: "totalPoints",
      key: "totalPoints",
      render: (points) => (
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <WalletOutlined className="text-green-500 text-lg" />
            <span className="font-bold text-2xl text-gray-800">
              {points?.toLocaleString() || 0}
            </span>
          </div>
          <div className="text-xs text-gray-500 font-medium">
            Points Available
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_text, record) => {
        const hasPoints = (record.totalPoints || 0) > 0;

        return (
          <div className="text-center">
            <Button
              type="primary"
              size="large"
              icon={<GiftOutlined />}
              onClick={() => claimTotalPoints(record?._id)}
              className={`${"bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"} border-0 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6`}
            >
              Claim Reward
            </Button>

            <div className="text-xs text-green-600 mt-1 font-medium">
              Ready to claim!
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}

        {/* Action Bar */}
        <Card className="mb-8 shadow-xl border-0 rounded-2xl bg-white/90 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <UsergroupAddOutlined className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  User Management
                </h1>
                <p className="text-gray-600 text-lg">
                  Manage user rewards and point claims
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="large"
                icon={<TrophyOutlined />}
                onClick={() => navigate("/leaderboard")}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 border-0 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2 h-12"
              >
                View Leaderboard
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<UserAddOutlined />}
                onClick={() => setAddOpen(true)}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2 h-12"
              >
                Add New User
              </Button>
            </div>
          </div>
        </Card>

        {/* User Table */}
        {Loader ? (
          <Card className="text-center py-20 shadow-xl border-0 rounded-2xl bg-white/90 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6">
              <BounceLoader size={80} color="#6366f1" />
              <div>
                <p className="text-xl text-gray-600 font-semibold mb-2">
                  Loading Users...
                </p>
                <p className="text-gray-500">
                  Please wait while we fetch user data
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <Card
            className="shadow-xl border-0 rounded-2xl bg-white/90 backdrop-blur-sm overflow-hidden"
            bodyStyle={{ padding: 0 }}
          >
            <div className="p-6 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <UsergroupAddOutlined className="text-indigo-600" />
                    All Users
                  </h2>
                  <p className="text-gray-600 mt-2 text-lg">
                    Click "Claim Reward" to process user point claims and
                    rewards
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <Table
                dataSource={data}
                columns={columns}
                rowKey="_id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `Showing ${range[0]}-${range[1]} of ${total} users`,
                }}
                className="custom-table"
                size="large"
                scroll={{ x: "max-content" }}
              />
            </div>
          </Card>
        )}
      </div>

      <AddUser isOpen={AddOpen} onClose={() => setAddOpen(false)} />

      <style jsx global>{`
        .custom-table .ant-table-thead > tr > th {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          font-weight: 700;
          color: #1f2937;
          border-bottom: 3px solid #e5e7eb;
          font-size: 16px;
          padding: 20px 16px;
        }

        .custom-table .ant-table-tbody > tr {
          transition: all 0.3s ease;
        }

        .custom-table .ant-table-tbody > tr:hover {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .custom-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f1f5f9;
          padding: 20px 16px;
          vertical-align: middle;
        }

        .custom-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
}

export default Home;
