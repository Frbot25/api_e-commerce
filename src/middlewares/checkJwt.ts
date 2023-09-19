import jwt from '../services/JWT';
import { Request, Response, NextFunction } from 'express';

export default (request: Request, response: Response, next: NextFunction) => {
  //stocker l'id et appeler next
  try {
    //récupérer le token (! authorization prend ici une minuscule)
    console.log(
      "\n*** Je suis le middleware checkJWT, mon rôle est de récupérer le token envoyé par le client et vérifier qu'il correspond bien à celui que je connais\n",
    );

    const autHeader = request.headers['authorization'];
    console.log('autHeader est le même que accesstoken?', autHeader);
    //on enlève 'Bearer' à autHeader
    const verifAccessToken = autHeader && autHeader.split(' ')[1];
    console.log('verifAccessToken:', verifAccessToken);
    if (verifAccessToken == null) {
      console.log(
        "la verif ou condition liée à l'access token n'a pas fonctionné",
      );
      return response.sendStatus(401);
    }

    //tester (si erreur sera renvoyé au catch, si ok on continue)
    const payload = jwt.validateToken(verifAccessToken);
    console.log(
      "ok c'est good, je place l'id user dans request et on sort de là\n>>>>>>>>>>>\n",
    );
    console.log('payload: ', payload);
    //placer l'id dans request
    request.user = payload.user;
    console.log('request.user:', request.user);
    //passer au middleware suivant
    next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      console.log('le token est expiré');
    }
    console.log('error.message:', error.message);
    if (error.message === 'invalid signature') {
      response.status(401).json('Not authorized');
    }
    response.status(401).json(error.message);
  }
};
