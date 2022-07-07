import React from 'react';
import { getMessages } from '../services/firebase';

function useMessages(roomId){
	const [messages, setMessages] = React.useState([]);

	React.useState(() => {
		const unsubscribe = getMessages(roomId, setMessages);
		return unsubscribe;
	}, [roomId]);
	return messages;
}

export { useMessages };