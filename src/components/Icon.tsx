import SVG from "react-inlinesvg";

type IconProps = {
  className?: string;
  imageName: string;
  size?: number | string;
};

const Icon = ({ className, size, imageName }: IconProps) => (
  <SVG
    src={`/${imageName}.svg`}
    width={size || 16}
    height={size || 16}
    className={className}
  />
);

export default Icon;
