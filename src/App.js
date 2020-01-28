import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import Users from './Users';
import Events from './Events';
import AddEvent from './AddEvent';
import qs from 'qs';
import './App.css';

function App() {

const [userList, setUserList] = useState([]);

const [user, setUser] = useState(
  {
    name: 'Mike',
    id: 123214,
    events: []
  }
);

const [view, setView] = useState('users');
const [param, setParam] = useState('');

useEffect( ()=>{
      const hash = qs.parse(window.location.hash.slice(1));
      console.log(hash);
      setView(hash.view);
      setParam(hash);
}, [])

useEffect( ()=>{
    window.addEventListener('hashchange', ()=> {
        const hash = qs.parse(window.location.hash.slice(1));
        console.log(hash);
        setView(hash.view);
        setParam(hash);
    })
  }, [])

  return (
    <div className="App">
      <h1> React Routing with Events</h1>
      <Nav view = {view}
            setView = {setView}
            user = {user} 
            userList = {userList}/>
      <main className = 'container-main'>
        { view === 'users' && <Users userList = {userList}
                              setUserList = {setUserList} 
                              param = {param}/> }
        { view === 'events' && <Events user = {user}/> }
        { view === 'add-event' && <AddEvent user = {user} 
                                            setUser = {setUser}
          /> }
      </main>
    </div>
  );
}

export default App;