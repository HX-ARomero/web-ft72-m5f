import type React from "react";

//* Types
type ButtonSize = "sm" | "md" | "lg";

type SolidButtonProps = {
  variant: "solid";
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

type LinkButton = {
  variant: "link";
  href: string;
  target?: string;
};

type SharedProps = {
  size?: ButtonSize;
  children?: React.ReactNode;
};

type ButtonProps = (SolidButtonProps | LinkButton) & SharedProps;

// Button:
export function Button(props: ButtonProps) {
  const size = props.size ?? "md";

  //* LinkButton:
  if (props.variant === "link") {
    return (
      <a href={props.href} target={props.target}>
        {props.children}
      </a>
    );
  }

  //* SolidButton (narrowing):
  const isDisabled = props.disabled || props.loading;
  return (
    <button
      type="button"
      className={`btn btn-solid size-${size}`}
      disabled={isDisabled}
      onClick={props.onClick}
    >
      {props.loading ? "Cargando…" : props.children}
    </button>
  );
}
