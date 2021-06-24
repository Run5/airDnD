import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getDndSession } from '../../store/dndsession'
// import * as sessionActions from "../../store/dndsession";
// import { errIcon } from '../icons';

function ExampleHost() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // const hostId = sessionUser.id;
  const sessions = useSelector(state => state.session)

  useEffect(() => {
    dispatch(getDndSession());
  }, [dispatch])

  return (
    <div className='ExampleHostContainer'>
      {console.log(sessions)}
    </div>
  );
}

export default ExampleHost;
