import { Usuario } from './usuario';
export class Usuarioslista {
  private lista: Usuario[] = [];

  constructor() {}

  // Agregar un usuario
  public agregar(usuario: Usuario) {
    this.lista.push(usuario);
    console.log(this.lista);
    return usuario
  }

  public actualizarUsuario(id: string, nombre: string) {
    for (let usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }
    console.log('==== Actualizado ====');
    console.log(this.lista);
  }

  // Obtener lista de usuarios
  public getLista() {
    return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
  }

  // Obtener un usuario
  public getUsuario(id: string) {
    return this.lista.find(usuario => usuario.id === id);
  }
  // Obtener un usuario de una sala
  public getUsuarioSala(sala: string) {
    return this.lista.filter(usuario => usuario.sala === sala);
  }

  // Borrar usuario
  public borrarUsuario(id: string) {
    const tempUsuario = this.getUsuario(id);
    this.lista = this.lista.filter(usuario => usuario.id !== id);
    console.log(this.lista);
    return tempUsuario;
  }
}