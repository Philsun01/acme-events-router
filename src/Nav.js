import React from 'react';
//import qs from 'qs';

const Nav = ({view, setView, user, userList}) => {

    return (
      <div> 
        <nav>
          <a href='#view=users'
            className = {view === 'users' ? 'selected' : ''}
            onClick = {()=> setView('users')}
            > Users ({userList.length})</a>
          <a href='#view=events'
            className = {view === 'events' ? 'selected' : ''}
            onClick = {()=> setView('events')}
            > Events for {user.name} </a>
          <a href='#view=add-event'
            className = {view === 'add-event' ? 'selected' : ''}
            onClick = {()=> setView('add-event')}
            > Add New Event </a>
        </nav>
      </div>
    )
  }

  export default Nav;