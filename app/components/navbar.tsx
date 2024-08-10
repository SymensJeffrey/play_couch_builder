// components/NavBar.tsx
const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">Play Couch Builder</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="w-40">
            <details>
              <summary className="text-right">Builds</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><a>All Builds</a></li>
                <li><a>Submit a Build</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
