import { CardList } from "./CardList";
import { Header } from "./Header";
import { Main } from "./Main";
import { CardsProvider } from "../context/CardsContext";

export default function App() {

  return <CardsProvider>
     <div>
       <Header/>
       <Main/>
     </div>
  </CardsProvider>
}