import Dashboard from './pages/Dashboard';
import Encerramento from './pages/Encerramento';
import Landing from './pages/Landing';
import MeuPlano from './pages/MeuPlano';
import PreparandoPlano from './pages/PreparandoPlano';
import Quiz from './pages/Quiz';
import Resultado from './pages/Resultado';


export const PAGES = {
    "Dashboard": Dashboard,
    "Encerramento": Encerramento,
    "Landing": Landing,
    "MeuPlano": MeuPlano,
    "PreparandoPlano": PreparandoPlano,
    "Quiz": Quiz,
    "Resultado": Resultado,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
};