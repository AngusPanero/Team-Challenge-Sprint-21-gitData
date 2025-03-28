import { useState, useEffect } from "react";
import { addUser, removeUser } from "./userSlice"
import { useSelector, useDispatch } from "react-redux";
import "./App.css"

const App = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userSelector.users)

  const [ dataApi, setDataApi ] = useState(null)
  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ userInput, setUserInput ] = useState("")

  const getUsers = async () => {
    if(!userInput) return
    try {
      setLoading(true)
      const response = await fetch(`https://api.github.com/users/${userInput}`)
        
      const data = await response.json()
      
      setDataApi(data)
      setError("")

    } catch (error) {
        setError(error.message)
    } finally{
      setLoading(false)
    }
  }

  const handleRemoveUser = (id) => {
    dispatch(removeUser(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getUsers();
  };

  useEffect(() => {
    if (dataApi) {
      const existingUser = users.find((user) => user.id === dataApi.id);
      if (!existingUser) {
        dispatch(
          addUser({
            id: dataApi.id,
            username: dataApi.login,
            avatar: dataApi.avatar_url,
            followers: dataApi.followers,
            following: dataApi.following,
            url: dataApi.html_url
          })
        );
      }
      setDataApi(null);
    }
  }, [dataApi, users, dispatch]);


  if(error) return <h1>Error in Request</h1>
  if(loading) return <h1>Loading GitHub User</h1>

  return (
    <>
      <div className="searcher">
        <h1>Search Your GitHub Profile</h1> 
        <div className="h1-input">

          <input className="user-input" type="text" value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          placeholder="Introduce an User"
          /> 
          
          <button className="user-search" type="button" 
          onClick={handleSubmit}>Search
          </button>
        </div>
      </div>

      
          <div className="users">
            {users.map((user) => (
              <div className="username-card" key={user.id}>
                <img src={user.avatar}className="photo"alt="profile-photo"/>
                <p>{user.username} - ID {user.id}</p>
                <a href={user.url} target="_blank">GitHub Profile</a>
                <p>Followers: {user.followers} - Following: {user.following}</p>
                <button onClick={() => handleRemoveUser(user.id)}>Eliminar</button>
              </div>
            ))}
          </div>
    </>
  );
}

export default App;
