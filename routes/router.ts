import { Router, Request, Response} from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

export const router = Router();

/**
 * Router Get /message
 * @param Request
 * @param Response
 */
router.get('/message', (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'todo bien'
  })
});
/**
 * Router Post /message
 * @param Request
 * @param Response
 */
router.post('/message', (req: Request, res: Response) => {
  const body = req.body.cuerpo;
  const de = req.body.de;
  const payload = { de, body }
  const server = Server.instance;
  server.io.emit('mensaje-nuevo', payload);
  res.json({
    ok: true,
    message: 'todo bien',
    body,
    de
  })
});
/**
 * Router Post /message
 * @param Request
 * @param Response
 */
router.post('/message/:id', (req: Request, res: Response) => {
  const body = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;
  const payload = { de, body }
  const server = Server.instance;
  server.io.in(id).emit('mensaje-privado', payload);
  res.json({
    ok: true,
    message: 'todo bien',
    body,
    de,
    id
  })
});
/**
 * Router GET /usuarios
 * @param Request
 * @param Response
 */
router.get('/usuarios', (req: Request, res: Response) => {
  const server = Server.instance;
  server.io.clients((err: any, clientes: string[]) => {
    if (err) {
      return res.json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      clientes
    });
  })
});
/**
 * Router GET /usuarios/detalle
 * @param Request
 * @param Response
 */
router.get('/usuarios/detalle', (req: Request, res: Response) => {
    
    res.json({
      ok: true,
      clientes: usuariosConectados.getLista()
    });
});