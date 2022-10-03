import * as Vibrant from "node-vibrant";


export const getColorInfo = color => {
    // console.log(color);
    color = color.Vibrant.getRgb();
    const bgColorMult = 0.2;
    const opacity = 0.5;
    const avgColor = color.slice(0, 3).reduce((a, b) => a + b) / 3;
    return (
      {
        foregroundColor: avgColor > 120 ? "black" : "white",
        bgColorMult: bgColorMult,
        topColor: `rgba(${color.map(color => color * (1 + bgColorMult * 2)).join(", ")}, ${opacity})`,
        bottomColor: `rgba(${color.map(color => color * (1 - bgColorMult / 3)).join(", ")},  ${opacity})`,
        bgTopColor: `rgb(${color.map(color => (color * 130/avgColor) ** 1.1).join(", ")})`
      }
    );
  }

  
export const getColorData = img => {
    return Vibrant.from(img).getPalette();
}