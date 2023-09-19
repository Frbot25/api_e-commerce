"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_1 = __importDefault(require("../services/JWT"));
exports.default = (request, response, next) => {
    //stocker l'id et appeler next
    try {
        //récupérer le token (! authorization prend ici une minuscule)
        console.log("\n*** Je suis le middleware checkJWT, mon rôle est de récupérer le token envoyé par le client et vérifier qu'il correspond bien à celui que je connais\n");
        const autHeader = request.headers['authorization'];
        console.log('autHeader est le même que accesstoken?', autHeader);
        //on enlève 'Bearer' à autHeader
        const verifAccessToken = autHeader && autHeader.split(' ')[1];
        console.log('verifAccessToken:', verifAccessToken);
        if (verifAccessToken == null) {
            console.log("la verif ou condition liée à l'access token n'a pas fonctionné");
            return response.sendStatus(401);
        }
        //tester (si erreur sera renvoyé au catch, si ok on continue)
        const payload = JWT_1.default.validateToken(verifAccessToken);
        console.log("ok c'est good, je place l'id user dans request et on sort de là\n>>>>>>>>>>>\n");
        console.log('payload: ', payload);
        //placer l'id dans request
        console.log('request.user:', typeof request.user);
        request.user = payload.user;
        //passer au middleware suivant
        next();
    }
    catch (error) {
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
