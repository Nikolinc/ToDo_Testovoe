import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as ArrowBack } from "assets/arrow_back.svg";
import { ReactComponent as Filter } from "assets/filter.svg";
import './navbar.css';
import CreateTask from "components/createNewTask/createNewTask";

function NavBar() {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q") || "";

  let location = useLocation().pathname;
  const taskPage = location.indexOf("tasks") > -1;

  const navigate = useNavigate();

  return (<div className="navbar">
    {taskPage &&
      <button className="arrow-black" onClick={() => navigate('/project')}>
        <ArrowBack fill="var(--secondary)" />
      </button>}
    <input
      className="clearNone"
      type="search"
      id="search"
      placeholder="Search..."
      value={q}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams((prev) => {
          prev.set("q", e.target.value);
          return prev;
        });
      }}
    />
    <button className="filter"><p>filter</p> <Filter fill="var(--secondary)" /></button>
    {taskPage && <CreateTask />
    }
  </div>
  )
}

export default NavBar