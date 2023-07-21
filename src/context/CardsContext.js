import { createContext, useEffect, useReducer } from "react";

const CardsContext = createContext();

const initialState = {
    level: 1,
    allCards: [],
    levelCards: [],
    clicked: [],
    score: 0,
    best: 0,
    randomFact: "",
    error: "",
    isLoading: false,
    isMenuOpen: true,
}

function shuffle(arr) {
    const newArr = arr;
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArr[j];
      newArr[j] = newArr[i];
      newArr[i] = temp;
    }
    return newArr;
  }

function uniqueCards(cards, level) {
    const uniqueIndexes = new Set();
    while (uniqueIndexes.size !== 4 * level) {
        uniqueIndexes.add(Math.floor(Math.random() * cards.length));
    }
    return Array.from(uniqueIndexes, (i) => cards[i]);
}

function reducer(state, action) {
    switch(action.type) {
        case "loaded":
            return {...state, isLoading: true};
        case "started":
            return {...initialState, isMenuOpen: false, best: state.best, levelCards: action.payload};
        case "pickedRight":
            return {...state, clicked: [state.clicked, action.payload], levelCards: action.payload, score: state.score + 1, best: state.score > state.best ? state.score : state.best};
        case "fetchedCards":
            return {...state, allCards: action.payload, isLoading: false};
        case "rejected":
            return {...state, error: action.payload, isLoading: false};
        default:
            throw new Error("Wrong option");
    }
}

const URL = "http://localhost:8000/cards";

export function CardsProvider({ children }) {
    const {cardes, dispatch} = useReducer(reducer, initialState);
    
      useEffect(() => {
        async function getCards() {
            dispatch({type: "loaded"});

            try {
                const res = await fetch(URL);
                const data = await res.json();
                dispatch({type: "fetchedCards", payload: data});
            } catch(err) {
                dispatch({type: "rejected", payload: err});
            }
        }
      }, []);

    return <CardsContext.Provider>{children}</CardsContext.Provider>
}