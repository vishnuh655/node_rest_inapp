import { Layout } from "antd";

const ContentLayout = ({ children }) => {
  return (
    <Layout.Content style={{ padding: "0 50px", margin: "20px 0" }}>
      {children}
    </Layout.Content>
  );
};

export default ContentLayout;
