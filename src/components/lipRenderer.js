import React from "react";
// cards
import { parts } from "../parts/parts";
import _wrapper from "../assets/images/wrapper/_wrapper.png";

const LipRenderer = ({ lip = null, size = 200, style }) => {
  if (!lip) {
    return null;
  }

  let logo = _wrapper;

  let dnaStr = String(lip.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  let lipDeatils = {
    bg: dnaStr.substring(0, 14) % 200,
    name: lip.name,
  };

  const lipStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  const wrapperStyle = {
    width: "15%",
    height: "15%",
    position: "absolute",
  };

  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
        position: "relative",
        ...style,
      }}
    >
      <img alt={"bg"} src={parts.bg[lipDeatils.bg]} style={lipStyle} />
      <img alt={"logo"} src={logo} style={wrapperStyle} />
    </div>
  );
};

export default LipRenderer;
