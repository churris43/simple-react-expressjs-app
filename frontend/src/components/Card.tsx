import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  borderRadius?: string;
}

function Card({ children, borderRadius = "border-solid" }: CardProps) {
  return (
    <div className={`${borderRadius} p-6 rounded-lg shadow-md`}>{children}</div>
  );
}

export default Card;
