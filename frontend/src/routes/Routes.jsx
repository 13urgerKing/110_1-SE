import Login from '../App/component/Login'
import SelectProject from '../App/component/SelectProject'
import DashboardPage from '../App/component/DashboardPage'
import CommitsPage from '../App/component/github/CommitsPage'
import IssuesPage from '../App/component/github/IssuesPage'
import CodeBasePage from '../App/component/github/CodeBasePage'
import CodeCoveragePage from '../App/component/sonar/CodeCoveragePage'
import BugsPage from '../App/component/sonar/BugsPage'
import CodeSmellsPage from '../App/component/sonar/CodeSmellsPage'
import DuplicationsPage from '../App/component/sonar/DuplicationsPage'
import TrelloPage from '../App/component/trello/TrelloPage'

const routes = [
  { path: "/", redirect: true, to: "/select" },
  { path: "/login", component: Login, loginRequired: false },
  { path: "/select", component: SelectProject, loginRequired: true },
  { path: "/dashboard", component: DashboardPage, loginRequired: true },
  { path: "/trello", component: TrelloPage, loginRequired: true },
  { path: "/commits", component: CommitsPage, loginRequired: true },
  { path: "/issues", component: IssuesPage, loginRequired: true },
  { path: "/codebase", component: CodeBasePage, loginRequired: true },
  { path: "/code_coverage", component: CodeCoveragePage, loginRequired: true },
  { path: "/bugs", component: BugsPage, loginRequired: true },
  { path: "/code_smells", component: CodeSmellsPage, loginRequired: true },
  { path: "/duplications", component: DuplicationsPage, loginRequired: true },
]

export default routes