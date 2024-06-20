import React from "react";
import styled from "styled-components";

function GeneratedIcon({
  unicode,
  className,
  bg,
  bPad,
  color,
  bRad,
  iconBg,
}: any) {
  if (!iconBg) {
    iconBg = "silver";
  }
  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "2px",
        background: iconBg,
        maxWidth: "52px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GeneratedIconStyled
        style={{
          background: bg,
          padding: bPad,
          borderRadius: bRad,
          color: color,
        }}
      >
        {!unicode && className && <i className={`fa-solid ${className}`}></i>}
        {unicode && !className && (
          <i className="fa fa-solid">
            {String.fromCharCode(parseInt(unicode, 16))}
          </i>
        )}
      </GeneratedIconStyled>
    </div>
  );
}

const GeneratedIconStyled = styled.div`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
`;

export default GeneratedIcon;
