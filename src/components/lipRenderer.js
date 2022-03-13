import React from "react";
// cards
import { parts } from "../parts/parts";
import _r1 from "../assets/images/rarity/_rarity_1.png";
import _r2 from "../assets/images/rarity/_rarity_2.png";
import _r3 from "../assets/images/rarity/_rarity_3.png";

const LipRenderer = ({ lip = null, size = 200, style }) => {
  if (!lip) {
    return null;
  }
  let rarity = _r1;

  if (lip.rarity >= 80) {
    rarity = _r2;
  }
  if (lip.rarity >= 95) {
    rarity = _r3;
  }

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
      <img alt={"rarity"} src={rarity} style={lipStyle} />
    </div>
  );
};

export default LipRenderer;
