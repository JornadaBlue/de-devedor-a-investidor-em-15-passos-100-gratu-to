import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import Resultado from './pages/Resultado';
import Dashboard from './pages/Dashboard';
import Encerramento from './pages/Encerramento';


export const PAGES = {
    "Landing": Landing,
    "Quiz": Quiz,
    "Resultado": Resultado,
    "Dashboard": Dashboard,
    "Encerramento": Encerramento,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
};