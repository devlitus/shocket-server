import { Router, Request, Response} from 'express';

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
  res.json({
    ok: true,
    message: 'todo bien',
    body,
    de,
    id
  })
});