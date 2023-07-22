import { createContext, useContext, useEffect, useReducer } from "react";

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
    // won, lost, playing
    stage: "default"
}

function reducer(state, action) {
    switch(action.type) {
        case "loaded":
            return {...state, isLoading: true};
        case "started":
            return {...initialState, best: state.best, levelCards: state.levelCards, stage: "playing"};
        case "clickedRight":
            const { card, shuffle } = action.payload;
            const win = WIN_SCORE === state.score + 1 ? "won" : state.stage;
            const levelUp = state.level * 4 === state.clicked.length + 1 ? { level: state.level + 1, clicked: []} : {};

            return {...state, clicked: [...state.clicked, card],
                score: state.score + 1,
                best: state.score >= state.best ? state.best + 1 : state.best,
                levelCards: shuffle,
                stage: win,
                ...levelUp
            };
        case "clickedWrong":
            return {...state, stage: "lost"};
        case "fetchCards":
            return {...state, levelCards: action.payload, isLoading: false};
        case "fetchFact":
            return {...state, fact: action.payload, isLoading: false};
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
    const [{stage, level, levelCards, clicked, score, best, fact, error, isLoading}, dispatch] = useReducer(reducer, initialState);
    
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

    return <CardsContext.Provider value={{level, levelCards, clicked, score, best, fact, isLoading, getFact, dispatch, stage}}>{children}</CardsContext.Provider>
}

export function useCards() {
    const value = useContext(CardsContext);
    if (value === undefined) throw new Error("Context was used outside the provider");
    return value;
}