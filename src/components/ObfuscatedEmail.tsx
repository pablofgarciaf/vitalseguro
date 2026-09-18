"use client";
import React from "react";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  text?: string;
  icon?: string;
}

export default function ObfuscatedEmail({ className, style, text = "contacto", icon }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = "mailto:contacto@gabrieljacome.com";
  };
  return (
    <a href="#" onClick={handleClick} className={className} style={style}>
      <span>{text}</span>
      {icon && <span style={{ marginLeft: "1rem" }}>{icon}</span>}
    </a>
  );
}