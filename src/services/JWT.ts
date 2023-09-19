import JWT from 'jsonwebtoken';

export default {
  // access token
  makeToken: (user) => {
    try {
      return JWT.sign(
        //payload
        {
          user,
        },
        //le mot de passe de chiffrement
        process.env.JWT_SECRET,
        //header
        {
          algorithm: 'HS256',
          expiresIn: '30m',
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  //vérification access token
  validateToken: (token) => {
    try {
      return JWT.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256'],
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  refreshToken: (user) => {
    try {
      console.log(
        'je suis dans le service refreshtoken et voila les infos de userId:',
        user,
      );
      return JWT.sign(
        //payload
        {
          user,
        },
        //le mot de passe de chiffrement
        process.env.JWT_REFRESHTOKEN,
        //header
        {
          algorithm: 'HS256',
          expiresIn: '7d',
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  //vérification access token
  validateRefreshToken: (token) => {
    try {
      return JWT.verify(token, process.env.JWT_REFRESHTOKEN, {
        algorithms: ['HS256'],
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
