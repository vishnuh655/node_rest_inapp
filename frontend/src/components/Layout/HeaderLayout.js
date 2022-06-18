import { Layout, Typography, Menu } from "antd";

const HeaderLayout = () => {
  return (
    <Layout.Header>
      <div className="logo">
        <Typography.Title level={3} style={{ color: "whitesmoke" }}>
          Student Management
        </Typography.Title>
      </div>
    </Layout.Header>
  );
};

export default HeaderLayout;
