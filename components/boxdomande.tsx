"use client";
import updateUser from "@/actions/updateUser";
import React, { useState } from "react";
interface BoxDomandeProps {
  userId: string 
}
const BoxDomande = ({ userId }: BoxDomandeProps) => {
  const [firstDomanda, setFirstDomanda] = useState<any>([]);
  const [secondaDomanda, setSecondaDomanda] = useState("");
  const [terzaDomanda, setTerzaDomanda] = useState("");
  const [eta, setEta] = useState(0);
  const [selezionaDomanda, setSelezionaDomanda] = useState(0);
  const [invisible, setInvisible] = useState(false)
  const generiMusicaliPrincipali = [
    { nome: "Pop" },
    { nome: "Rock" },
    { nome: "Hip-Hop" },
    { nome: "Jazz" },
    { nome: "Country" },
    { nome: "Electronic" },
    { nome: "Classica" },
    { nome: "R&B" },
    { nome: "Reggae" },
    { nome: "Metal" },
  ];
  const daDove = [
    { opzione: "Online" },
    { opzione: "Da un amico/a" },
    { opzione: "Da una discoteca" },
  ];
  const toggleGenre = (genre: any) => {
    if (firstDomanda.includes(genre)) {
      setFirstDomanda(
        firstDomanda.filter((selectedGenre: any) => selectedGenre !== genre)
      );
    } else {
      setFirstDomanda([...firstDomanda, genre]);
    }
  };

  const inviaDati = async () => {
    try {
      await updateUser(userId, firstDomanda, terzaDomanda, eta);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      className={`w-[80%] lg:w-[60%] z-10  bg-black rounded-2xl p-3 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] `}
    >
      <div className="flex justify-between  items-center">
        <div className="text-xl font-bold ">Domande</div>
        <div className="flex items-center space-x-2">
          <div
            className={`h-4 w-4  rounded-full ${
              eta === 0 ? "bg-red-400" : "bg-green-400"
            }`}
          />

          <div
            className={`h-4 w-4  rounded-full ${
              firstDomanda.length === 0
                ? eta === 0
                  ? "bg-white"
                  : "bg-red-400"
                : "bg-green-400"
            }`}
          />
          <div
            className={`h-4 w-4  rounded-full ${
              terzaDomanda.length === 0
                ? eta === 0
                  ? "bg-white"
                  : "bg-red-400"
                : "bg-green-400"
            }`}
          />
        </div>
      </div>

      {selezionaDomanda === 0 ? (
        <div>
          <div className="text-lg font-bold mt-10">Inserisci l&apos;età</div>
          <div>L&apos;età deve essere superiore a 16 anni</div>
          <input
            value={eta === 0 ? "" : eta}
            onChange={(e) => setEta(+e.target.value)}
            type="number"
            className="text-black rounded-2xl p-1 text-lg"
          />
          <div className="flex justify-end items-center mt-4">
            <div
              className={`text-white ${
                eta < 16 || eta > 90 ? "bg-red-400" : "bg-green-400"
              } border-white border-1 w-[max-content] p-2 rounded-xl`}
              onClick={() => {
                if (eta >= 16 && eta <= 90) {
                  setSelezionaDomanda(1);
                }
              }}
            >
              Avanti
            </div>
          </div>
        </div>
      ) : selezionaDomanda === 1 ? (
        <div>
          <div className="text-lg font-bold mt-10">Che genere ti piace?</div>
          <div>Seleziona almeno un genere che ti piace ascoltare</div>
          <div className="h-[60vh] lg:h-[50vh] overflow-y-scroll">
            {generiMusicaliPrincipali.map((item) => (
              <div
                key={item.nome}
                className="flex items-center justify-center mt-2"
              >
                <div
                  className={`flex w-[90%] items-center justify-center p-3 border-2 rounded-2xl ${
                    firstDomanda.includes(item.nome)
                      ? "border-green-400"
                      : "border-white"
                  }`}
                  onClick={() => toggleGenre(item.nome)}
                >
                  {item.nome}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center mt-4">
            <div
              className={`text-white  border-white border-1 w-[max-content] p-2 rounded-xl`}
              onClick={() => {
                setSelezionaDomanda(selezionaDomanda - 1);
              }}
            >
              Indietro
            </div>
            <div
              className={`text-white ${
                firstDomanda.length === 0 ? "bg-red-400" : "bg-green-400"
              } border-white border-1 w-[max-content] p-2 rounded-xl`}
              onClick={() => {
                if (firstDomanda.length !== 0) {
                  setSelezionaDomanda(2);
                }
              }}
            >
              Avanti
            </div>
          </div>
        </div>
      ) : (
        selezionaDomanda === 2 && (
          <div>
            <div className="text-lg font-bold mt-10">
              Da dove hai visto questa webapp?
            </div>
            <div>Seleziona una tra le opzioni date</div>
            <div className="overflow-y-scroll">
              {daDove.map((item) => (
                <div
                  key={item.opzione}
                  className="flex items-center justify-center mt-2"
                >
                  <div
                    className={`flex w-[90%] items-center justify-center p-3 border-2 rounded-2xl ${
                      terzaDomanda === item.opzione
                        ? "border-green-400"
                        : "border-white"
                    }`}
                    onClick={() => setTerzaDomanda(item.opzione)}
                  >
                    {item.opzione}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center mt-4">
              <div
                className={`text-white  border-white border-1 w-[max-content] p-2 rounded-xl`}
                onClick={() => {
                  setSelezionaDomanda(selezionaDomanda - 1);
                }}
              >
                Indietro
              </div>
              <div
                className={`text-white ${
                  eta < 16 || eta > 90 ? "bg-red-400" : "bg-green-400"
                } border-white border-1 w-[max-content] p-2 rounded-xl`}
                onClick={() => {
                  if (firstDomanda.length !== 0 && terzaDomanda.length !== 0) {
                    inviaDati();
                  }
                }}
              >
                Invia
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default BoxDomande;
