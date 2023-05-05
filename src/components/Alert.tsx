import { ReactNode } from "react";

interface AlertProps {
  type: "warning" | "error";
  children: ReactNode;
}

const Alert: React.FC<AlertProps> = (props) => {
  return (
    <div
      className={`${
        props.type === "error" ? "bg-red-500" : "bg-orange-400"
      } text-white p-4 rounded-xl`}
    >
      {props.children}
    </div>
  );
};

export default Alert;
