import { createContext, useContext, useEffect, useReducer } from "react";

const CardsContext = createContext();

const initialState = {
    level: 1,
    allCards: [],
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
            return {...initialState, isMenuOpen: false, best: state.best, levelCards: action.payload};
        case "clickedRight":
            return {...state, clicked: [...state.clicked, action.payload], score: state.score + 1, best: state.score > state.best ? state.score : state.best};
        case "shuffleCards":
            return {...state, levelCards: action.payload};
        case "clickedWrong":
            return {...state, isMenuOpen: true};
        case "fetchCards":
            return {...state, allCards: action.payload, isLoading: false};
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
    const [{level, allCards, levelCards, clicked, score, best, fact, error, isLoading, isMenuOpen}, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
    async function getCards() {
        dispatch({type: "loaded"});

        try {
            const res = await fetch(URL_CARDS);
            const data = await res.json();
            dispatch({type: "fetchCards", payload: data});
        } catch(err) {
            dispatch({type: "rejected", payload: err});
        }
    }
    }, []);

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

    function uniqueCards() {
        const uniqueIndexes = new Set();
        while (uniqueIndexes.size !== 4 * level) {
            uniqueIndexes.add(Math.floor(Math.random() * allCards.length));
        }
        return Array.from(uniqueIndexes, (i) => allCards[i]);
    }

    return <CardsContext.Provider value={{level, allCards, levelCards, clicked, score, best, fact, error, isLoading, isMenuOpen, winScore: WIN_SCORE, getFact, dispatch, uniqueCards}}>{children}</CardsContext.Provider>
}

export function useCards() {
    const value = useContext(CardsContext);
    if (value === undefined) throw new Error("Context was used outside the provider");
    return value;
}