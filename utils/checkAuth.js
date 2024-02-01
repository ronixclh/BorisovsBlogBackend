//Middleware function, checkajet avtorizovan li polzovatelj ili net

import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123')

      req.userId = decoded._id
      next() //next vipolnaet sledujushuju funkciju esli vsjo normalno i moj token raswifrovan
    } catch (e) {
      return res.status(403).json({
        message: 'Нет доступа',
      })
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    })
  }

  // res.send(token)
}
