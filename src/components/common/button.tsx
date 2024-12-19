import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "primary" | "secondary";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
}

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type NativeLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

type Props = ButtonProps & (NativeButtonProps | NativeLinkProps);

const Button: React.FC<Props> = ({
  children,
  href,
  onClick,
  className,
  disabled = false,
  variant = "default",
  size = "medium",
  icon,
  ...props
}) => {
  const baseStyles =
    "px-6 py-2 font-medium flex items-center justify-center gap-2 lg:text-xs xl:text-sm transition-all duration-300 relative overflow-hidden ";
  const variants = {
    default:
      "bg-transparent border-[1px] border-white text-white rounded-full hover:text-[#f3c60c] hover:border-[#f3c60c] hover:box-border hover:shadow-[0_0_10px_2px_rgba(243,198,12,0.5),inset_0_0_10px_2px_rgba(243,198,12,0.5)]",
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 border-blue-500 rounded-full",
    secondary:
      "bg-gray-800 text-white hover:bg-gray-900 hover:border-gray-900 border-gray-800 rounded-full",
  };
  const sizes = {
    small: "text-sm px-3 py-1",
    medium: "text-base px-4 py-2",
    large: "text-lg px-5 py-3",
  };

  const buttonClass = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    className,
    {
      "opacity-50 cursor-not-allowed": disabled,
    }
  );

  const hoverEffectStyles =
    "absolute inset-0 bg-white opacity-0 transition-opacity duration-300 pointer-events-none";

  if (href) {
    return (
      <Link href={href} passHref>
        <a className={buttonClass} {...(props as NativeLinkProps)}>
          <span
            className={hoverEffectStyles}
            style={{
              clipPath: "circle(0% at 50% 50%)",
            }}
          ></span>
          {children}
          {icon && <span className="flex-shrink-0">{icon}</span>}
        </a>
      </Link>
    );
  }

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...(props as NativeButtonProps)}
    >
      {children}
      {icon && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};

export default Button;
