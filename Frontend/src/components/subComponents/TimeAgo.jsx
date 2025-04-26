// components/TimeAgo.js

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

function TimeAgo({ createdAt }) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!createdAt) return;

    const update = () => {
      setTimeAgo(formatDistanceToNow(new Date(createdAt), { addSuffix: true }));
    };

    update(); // initial call
    const interval = setInterval(update, 60000); // update every 60 seconds

    return () => clearInterval(interval); // clean up on unmount
  }, [createdAt]);

  if (!createdAt) return null;

  return <span>{timeAgo}</span>;
}

export default TimeAgo;
