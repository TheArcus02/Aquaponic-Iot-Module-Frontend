import { io, Socket } from 'socket.io-client';
import { BASE_URL } from './api';

export const socket: Socket = io(BASE_URL, {
  autoConnect: false,
});
