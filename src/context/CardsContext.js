import { createContext, useContext, useEffect, useReducer } from "react";
import { act } from "react-dom/test-utils";

const CardsContext = createContext();

const initialState = {
    level: 1,
    levelCards: [],
    clicked: [],
    score: 0,
    best: 0,
    fact: "",
    error: "",
    isLoading: false,
    isMenuOpen: true,
}

function reducer(state, action) {
    switch(action.type) {
        case "loaded":
            return {...state, isLoading: true};
        case "started":
            return {...initialState, isMenuOpen: false, best: state.best, levelCards: state.levelCards};
        case "clickedRight":
            const { card, shuffle } = action.payload;
            return {...state, clicked: [...state.clicked, card], score: state.score + 1, best: state.score >= state.best ? state.best + 1 : state.best, levelCards: shuffle};
        case "levelUp":
            return {...state, level: state.level + 1, clicked: []};
        case "clickedWrong":
            return {...state, isMenuOpen: true};
        case "fetchCards":
            return {...state, levelCards: action.payload, isLoading: false};
        case "fetchFact":
            return {...state, fact: action.payload, isLoading: false};
        case "won":
            return {...state, isMenuOpen: true};
        case "rejected":
            return {...state, error: action.payload, isLoading: false};
        default:
            throw new Error("Wrong option");
    }
}

const URL_CARDS = "http://localhost:8000/cards";
const URL_FACTS = "https://api.api-ninjas.com/v1/facts?limit=1";
const WIN_SCORE = 6;

export function CardsProvider({ children }) {
    const [{level, levelCards, clicked, score, best, fact, error, isLoading, isMenuOpen}, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        function uniqueCards(cards, level) {
            const uniqueIndexes = new Set();
            while (uniqueIndexes.size !== 4 * level) {
                uniqueIndexes.add(Math.floor(Math.random() * cards.length));
            }
            return Array.from(uniqueIndexes, (i) => cards[i]);
        }
        async function getCards() {
            dispatch({type: "loaded"});

            try {
                const res = await fetch(URL_CARDS);
                const data = await res.json();
                dispatch({type: "fetchCards", payload: uniqueCards(data, level)});
            } catch(err) {
                dispatch({type: "rejected", payload: err});
            }
        }
        getCards();
    }, [level]);

    async function getFact() {
        dispatch({type: "loaded"});
        
        try {
            const res = await fetch(URL_FACTS, {
                method: 'GET',
                headers: { 'x-api-key': 'zKIE1l5vAdRj8Vpwz2Fy/A==c8NXBESJJrtxguKo' }
            });
            const data = await res.json();
            dispatch({type: "fetchFact", payload: data[0].fact});
        } catch(err) {
            dispatch({type: "rejected", payload: err});
        }
    }

    return <CardsContext.Provider value={{level, levelCards, clicked, score, best, fact, error, isLoading, isMenuOpen, winScore: WIN_SCORE, getFact, dispatch}}>{children}</CardsContext.Provider>
}

export function useCards() {
    const value = useContext(CardsContext);
    if (value === undefined) throw new Error("Context was used outside the provider");
    return value;
}