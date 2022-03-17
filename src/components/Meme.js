import React from "react";
import Canvas from "./Canvas";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "Yes you",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = React.useState([]);
  const [image, setImage] = React.useState("");


  React.useEffect(() => {

    
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          className="form--input"
        />
        <input
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          className="form--input"
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>

      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top"> {meme.topText} </h2>
        <h2 className="meme--text bottom"> {meme.bottomText} </h2>
      </div>

     {/*  <Canvas memeImage={meme.randomImage} text={meme.bottomText} />*/}
      <div className="bottom--button-wrapper">
        <label className="custom-file-upload">
          <input type="file" value={image} onChange={handleChange} />
          Select image
        </label>
        <button
          className="form--button download--button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-download"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#fff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
            <polyline points="7 11 12 16 17 11" />
            <line x1="12" y1="4" x2="12" y2="16" />
          </svg>
        </button>
      </div>
    </main>
  );
}
