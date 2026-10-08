import { useText } from "../../i18n/useText";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: Props) {
  const tr = useText();

  return (
    <div
      className={`mx-auto max-w-7xl px-6 lg:px-10 ${className}`}
    >
      {tr(children)}
    </div>
  );
}