import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const Rank = ({ name, entries}) => {
  const [ user, setUser] = useState(null);

  useEffect(()=>{
    const currentUser = localStorage.getItem('user');
    setUser(JSON.parse(currentUser));
    },[])

    return (
       <div>
          <div className='white f3'>
            {`${user && user.name}, your current entry count is ...`}
          </div>
          <div className='white f1'>
            {user && user.entries}
          </div>
       </div>
    );
}

export default Rank;