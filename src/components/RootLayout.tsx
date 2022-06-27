import { ReactNode, useMemo } from "react";
// 3rd party
import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";

interface IRootLayoutProps {
  useFlex?: boolean;
  children: ReactNode;
}

export default function RootLayout({ useFlex, children }: IRootLayoutProps) {
  const stylesObject = useMemo(() => {
    return {
      marginTop: "20px",
      marginBottom: "20px",
      width: "800px",
      margin: "0 auto",
      border: "1px solid gray",
      borderRadius: "4px",
      padding: "20px",
      display: useFlex ? "flex" : "block",
    };
  }, [useFlex]);

  return (
    <Layout>
      <Header>
        <h1 style={{ color: "white" }}>Calendar App</h1>
      </Header>
      <Content>
        <div style={stylesObject}>{children}</div>
      </Content>
    </Layout>
  );
}
