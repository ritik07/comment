import React from 'react';
import { message } from 'antd';

export const notify = (type, msg) => {
  if (type === "err") {
    message.error(msg);
  }
};

