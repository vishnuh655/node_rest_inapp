import { Layout } from "antd";
import FooterLayout from "./FooterLayout";
import HeaderLayout from "./HeaderLayout";
import ContentLayout from "./ContentLayout";

const MainLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <HeaderLayout></HeaderLayout>
      <ContentLayout>{children}</ContentLayout>
      <FooterLayout></FooterLayout>
    </Layout>
  );
};

export default MainLayout;
