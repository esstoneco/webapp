import { useText } from "../../i18n/useText";
type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function Image({
  src,
  alt,
  className = "",
}: Props) {
  const tr = useText();

  return (
    <img
      src={src}
      alt={tr(alt)}
      loading="lazy"
      className={className}
    />
  );
}