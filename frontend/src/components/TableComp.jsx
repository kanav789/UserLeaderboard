import { Table } from "antd";

export const TableComponent = ({ dataSource, columns }) => {
  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "16px", color: "#1890ff" }}>
        Leaderboard Rankings
      </h2>
      <Table
        dataSource={dataSource || []}
        columns={columns || []}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        size="middle"
        bordered
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};
