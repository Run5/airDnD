// frontend/src/components/SessionCard/index.js

import { useDispatch, useSelector } from 'react-redux';
import { deleteDndSession } from '../../store/dndsession';
import './SessionCard.css';

function SessionCard({ sessionId }) {
  const dispatch = useDispatch();
  const dndSessions = useSelector(state => state.dndsession);

  return (
    <>
      <div className='HostedSessionsContainer'>
        <h1 className='HostedSessionsName'>{dndSessions[sessionId]?.name}</h1>
        <div
          className="HostedSessionsMap"
          style={{ backgroundImage: `url('${dndSessions[sessionId]?.map}')` }}
        >

        </div>
        <div>

        </div>
        <div className='HostedSessionsRemove'>
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              dispatch(deleteDndSession(sessionId));
            }}
            className='HostedSessionsRemoveButton'
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
}

export default SessionCard;
