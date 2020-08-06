import React from 'react';
import {
  createNotification,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_INFO,
  NOTIFICATION_TYPE_WARNING,
  NOTIFICATION_TYPE_ERROR
} from 'react-redux-notify';

export const successNotification = message => {
  const notification = {
    message: message,
    type: NOTIFICATION_TYPE_SUCCESS,
    duration: 5000,
    canDismiss: true,
    showCloseAllBtn: false,
    icon: <i className="check circle outline icon" />
  };

  return createNotification(notification);
};

export const infoNotification = message => {
  const notification = {
    message: message,
    type: NOTIFICATION_TYPE_INFO,
    duration: 10000,
    canDismiss: true,
    showCloseAllBtn: false,
    icon: <i className="info icon" />
  };

  return createNotification(notification);
};

export const warningNotification = message => {
  const notification = {
    message: message,
    type: NOTIFICATION_TYPE_WARNING,
    duration: 10000,
    canDismiss: true,
    showCloseAllBtn: false,
    icon: <i className="exclamation triangle icon" />
  };

  return createNotification(notification);
};

export const errorNotification = message => {
  const notification = {
    message: message,
    type: NOTIFICATION_TYPE_ERROR,
    duration: 15000,
    canDismiss: true,
    showCloseAllBtn: false,
    icon: <i className="times circle icon" />
  };

  return createNotification(notification);
};
