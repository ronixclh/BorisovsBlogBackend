import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(), //esli v tele nawrgo zaprosa email, proverj eto email ili net
  body('password', 'Пароль должен быть минимум 5 символов').isLength({
    min: 5,
  }), //esli dlina parolja 5 simvolov ili viwe, to norm
]

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(), //esli v tele nawrgo zaprosa email, proverj eto email ili net
  body('password', 'Пароль должен быть минимум 5 символов').isLength({
    min: 5,
  }), //esli dlina parolja 5 simvolov ili viwe, to norm
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(), //opcionalnaja proverka optional
]

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(), //dolzhen bitj zagolovok statji
  body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(), //dolzhen bitj tekst statji
  body('tags', 'Неверный формат тэгов').optional().isString(), //dolzhni bitj tegi
  // body('imageUrl', 'Неверная ссылка на изображение').optional().isURL(), //dolzhna bitj url kartinki
]
