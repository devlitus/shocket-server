import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIo from "socket.io";
import http from "http";
import * as socket from '../sockets/socket';

export default class Server {
  private static _instance: Server;
  public app: express.Application = express();
  public port: number;
  public io: socketIo.Server;
  private httpServer: http.Server;
  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = socketIo(this.httpServer);
    this.escuchandoSockets();
  }
  public static get instance() {
    return this._instance || (this._instance = new this());
  }
  private escuchandoSockets() {
    console.log("Escuchando conexiones - socket");
    this.io.on("connection", cliente => {
      // Conectar cliente
      socket.conectarCliente(cliente, this.io);
      // Configurar Usuario
      socket.configurarUsuario(cliente, this.io);
      // Obtener Usuarios Activos
      socket.ObtenerUsuario(cliente, this.io)
      // Mensaje
      socket.mensaje(cliente, this.io);
      // Desconectar
      socket.desconectar(cliente, this.io);
    });
  }

  start(callback: any) {
    this.httpServer.listen(this.port, callback);
  }
}
