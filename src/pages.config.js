import Dashboard from './pages/Dashboard';
import Encerramento from './pages/Encerramento';
import Landing from './pages/Landing';
import MeuPlano from './pages/MeuPlano';
import Quiz from './pages/Quiz';
import Resultado from './pages/Resultado';
import PreparandoPlano from './pages/PreparandoPlano';


export const PAGES = {
    "Dashboard": Dashboard,
    "Encerramento": Encerramento,
    "Landing": Landing,
    "MeuPlano": MeuPlano,
    "Quiz": Quiz,
    "Resultado": Resultado,
    "PreparandoPlano": PreparandoPlano,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
};