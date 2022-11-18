import { useState, useEffect } from "react";
import "./index.css";
import styled from "styled-components";
import _ from "lodash";
import GithubCorner from "react-github-corner";
 
import Panda from "/panda.png";

const App = () => {
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [pairOfCards, setPairOfCards] = useState([]);

  let cards = [
    { id: 1, alt: "一", img: "/1.png" },
    { id: 2, alt: "二", img: "/2.png" },
    { id: 3, alt: "三", img: "/3.png" },
    { id: 4, alt: "四", img: "/4.png" },
    { id: 5, alt: "五", img: "/5.png" },
    { id: 6, alt: "六", img: "/6.png" },
    { id: 7, alt: "七", img: "/7.png" },
    { id: 8, alt: "八", img: "/8.png" },
    { id: 9, alt: "九", img: "/9.png" },
    { id: 10, alt: "十", img: "/10.png" },
  ];

  useEffect(() => {
    const shuffle = _.shuffle(cards);
    const pairOfCards = [...shuffle, ...shuffle];
    setPairOfCards(pairOfCards);
  }, []);

  function flipCard(index) {
    setOpenedCard((opened) => [...opened, index]);
  }

  useEffect(() => {
      if (openedCard < 2) return;
      const firstMatched = pairOfCards[openedCard[0]];
      const secondMatched = pairOfCards[openedCard[1]];
      if (secondMatched && firstMatched.id === secondMatched.id) {
        setMatched([...matched, firstMatched.id]);
      }
      if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
    },
    [openedCard],
    [matched],
    [pairOfCards]
  );

  return (
    <Container>
      <h1>play a game of pandacards.</h1>
      <Cards>
        {pairOfCards.map((card, index) => {
          let isFlipped = false;
          if (openedCard.includes(index)) isFlipped = true;
          if (matched.includes(card.id)) isFlipped = true;
          return (
            <div
              className={`number-card ${isFlipped ? "flipped" : ""}`}
              key={index}
              onClick={(e) => flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  <img src={card.img} alt={card.alt} />
                </div>

                <div className="back">
                  <img src={Panda} alt="panda emoji" />
                </div>
              </div>
            </div>
          );
        })}
      </Cards>
      <GithubCorner href="https://github.com/daniel-bergmann/pandacards" />
      <p>
        made by <a href="https://danielbergmann.is">Daniel Bergmann</a>
      </p>
    </Container>
  );
};

export default App;

const Container = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  gap: 10px;

  .number-card {
    height: 100px;
    width: 100px;
    border-radius: 2px;
    background: #000;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
  }
  .number-card.flipped .inner {
    transform: rotateY(180deg);
    border-radius: 9px;
    box-shadow: -2px 2px 5px 1px rgba(0, 0, 0, 0.32);
    -webkit-box-shadow: -2px 2px 5px 1px rgba(0, 0, 0, 0.32);
    -moz-box-shadow: -2px 2px 5px 1px rgba(0, 0, 0, 0.32);
  }
  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: 0.6s cubic-bezier(0.38, 0.02, 0.09, 1.66) all;
  }
  .number-card .front,
  .number-card .back {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
    img {
      border-radius: 9px;
      width: 100%;
      height: 100%;
    }
  }
  .number-card .front {
    transform: rotateY(180deg);
  }
  .number-card .back {
    font-size: 30px;
    border-radius: 9px;
    transition: 0.3s ease all;
  }
  .number-card .back:hover {
    background-color: #f4f4f4;
    color: #fff;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  }
`;
