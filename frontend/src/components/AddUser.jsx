import React, { useState } from "react";
import { Modal, Form, Input, Button, App } from "antd";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../Context/DataContext";

function AddUser({ isOpen, onClose }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setData } = useContext(DataContext);
  const { message } = App.useApp();
  // Handle submit
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/user/add`,
        values
      );

      if (response?.data?.success == true) {
        console.log("call");
        const fetchAllUser = async () => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BASE_URL}api/user/all`
            );
            setData(response?.data?.data?.users);
          } catch (error) {
            console.log(error);
          }
        };
        fetchAllUser();
      }
      message.success(response?.data?.message || "User added successfully!");
      form.resetFields();
      onClose();
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add user. Please try again.";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      title={
        <span className="text-lg font-semibold text-black">Add New User</span>
      }
      footer={null}
      width={500}
      destroyOnClose
      className="rounded-xl"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        className="space-y-4"
        requiredMark={false}
      >
        <Form.Item
          name="username"
          requiredMark={false}
          label={<span className="font-medium text-gray-700">Username</span>}
          rules={[
            { required: true, message: "Please enter a username!" },
            { min: 3, message: "Username must be at least 3 characters!" },
          ]}
        >
          <Input
            placeholder="Enter username"
            className="!rounded-[7px] !border !border-gray-300 !px-4 !py-2 focus:!border-black focus:!shadow-md focus:!ring-1 focus:!ring-black transition-all"
          />
        </Form.Item>

        {/* Footer buttons */}
        <Form.Item className="mb-0">
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel} className="rounded-md">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Add User
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddUser;
