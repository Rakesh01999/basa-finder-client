import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const MainLayout = () => {
  // Teal Color Palette
  const blueColors = {
    primary: "#1E3A8A", // Deep Blue
    secondary: "#2563EB", // Vibrant Blue
    background: "#EFF6FF", // Light Blue
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout
        className=""
        style={{
          background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.secondary} 100%)`,
        }}
      >
        <Content style={{ margin: "" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
