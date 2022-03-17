import React, { useRef } from "react";

export default function Canvas({memeImage,text}) {

  React.useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")
    const img = document.createElement("imgEl");
    img.onload = () => {
        ctx.drawImage(img, 0, 0)
        ctx.font = "40px Courier"
        ctx.fillText(text, 210, 75)
      }
  }, []);

  return (
    <div>
      {" "}
      <div className="meme">
        <canvas id="canvasEl" width={640} height={425} />
        <img id="imgEl" src={memeImage} className="hidden" />
      </div>
    </div>
  );
}
