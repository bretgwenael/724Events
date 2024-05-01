import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // Inversion de evtA et evtB pour avoir un slider degressif dans l'ordre des images
    new Date(evtB.date) < new Date(evtA.date) ? -1 : 1
  );
  const nextCard = () => {
    // Ajout condition if pour que setTimeout ne s'execute que si byDateDesc est utilise
    if (byDateDesc) {
    setTimeout(
      // Ajout - 1 a length pour que l'index ne depasse pas la longueur du tableau ( image blanche )
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  }
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                // Modification de la key pour eviter que plusieurs soit undefined
                  key={`${_.date}`}
                  type="radio"
                  name="radio-button"
                  // remplacement pour que l'input du slider change par rapport a l'index
                  checked={index === radioIdx}
                  // Ajout readOnly pour que l'etat de l'element soit controle par l'etat de l'application React
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
