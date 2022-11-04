
const Header = ({setSearchTerm}) => {

  return (
    <div className="header">
      <h2 id="heading">Total Contacts</h2>
      <input
        id="search"
        type="text"
        className="search"
        placeholder="Search by Email Id....."
        onChange={(e) => {setSearchTerm(e.target.value);}}
      />
      <img id="image" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="img" />
      <div className="admin">
        <p id="admin">Admin</p>
     
        <p id="user">Super Admin</p>
      </div>
    </div>
  );
}

export default Header;