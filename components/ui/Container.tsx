import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
  id?: string;
}

export function Container({
  children,
  className,
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
