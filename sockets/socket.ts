import { Socket } from 'socket.io';
import socketIo from 'socket.io';
import { Usuarioslista } from '../classes/usuarios-list';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new Usuarioslista();

export const conectarCliente = (cliente: Socket, io: socketIo.Server) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
  io.emit('usuarios-activos', usuariosConectados.getLista());
}

// Estado de la coneccón
export const desconectar = (cliente: Socket, io: socketIo.Server) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
    usuariosConectados.borrarUsuario(cliente.id);
    io.emit('usuarios-activos', usuariosConectados.getLista());
  });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIo.Server) => {
  cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
    console.log('Mensaje recibido', payload);

    io.emit('mensaje-nuevo', payload)
  })
}
// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIo.Server) => {
  cliente.on('configurar-usuario', (payload: any, callback: Function) => {
    usuariosConectados.actualizarUsuario(cliente.id, payload.nombre);
    io.emit('usuarios-activos', usuariosConectados.getLista());
    callback({
      ok: true,
      mensaje: `Usuario ${payload.nombre} configurado`
    })
  })
}
// Configurar usuario
export const ObtenerUsuario = (cliente: Socket, io: socketIo.Server) => {
  cliente.on('obtener-usuario', () => {
    io.emit('usuarios-activos', usuariosConectados.getLista());
  });
}