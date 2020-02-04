import { Socket } from 'socket.io';
import socketIo from 'socket.io';
import { Usuarioslista } from '../classes/usuarios-list';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new Usuarioslista();

export const conectarCliente = (cliente: Socket) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
}

// Estado de la coneccón
export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
    usuariosConectados.borrarUsuario(cliente.id);
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
  cliente.on('configurar-usuario', (payload, callback: any) => {
    usuariosConectados.actualizarUsuario(cliente.id, payload.nombre);
    callback({
      ok: true,
      mensaje: `Usuario ${payload.nombre} configurado`
    })
    // io.emit('mensaje-nuevo', payload)
  })
}