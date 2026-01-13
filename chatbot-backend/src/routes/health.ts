import { Router, Request, Response } from 'express';


const router = Router();


router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),  
    message: 'Chatbot backend is running'
  });
});


export default router;
