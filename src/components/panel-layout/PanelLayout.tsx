import { ReactNode } from "react";
// 3rd party
import classes from "classnames";
// styles
import "./PanelLayout.scss";

interface IPanelLayoutProps {
  children: ReactNode;
  visible?: boolean;
}

export default function PanelLayout({
  visible = true,
  children,
}: IPanelLayoutProps) {
  return (
    <div className={classes("panel-layout", visible ? "visible" : "hide")}>
      {children}
    </div>
  );
}
