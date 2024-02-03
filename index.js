/* FRONTEND ->

React JS
Redux Toolkit - глобальный стейт менеджер
React Hook Form - работа с формами
React Router - навигация роутинг
React Markdown - редактор статей
Axios - отправка запросов на веб сервер

BACKEND

NodeJS
Express + Validator - веб сервер/валидация запросов
MongoDB / Mongoose - работа с базой данных
JSON Web Token - аутентификация / авторизация
Multer - загрузка файлов / изображений
BCrypt - шифрование пароля
*/

/* HTTP requests:
GET /posts - Read(дай все статьи)
GET /posts/:id - Read(дай одну статью)
POSTS /posts - Create(создать статью)
PATCH /posts/:id - Update(обновление статьи)
DELETE /posts/:id - Delete(удалить статьи)
*/

import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import cors from 'cors'
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations/validations.js' //peredajetsja vtorim parametrom v POST zapros dlja validacii

import { UserController, PostController } from './controllers/index.js'
import { checkAuth, handleValidationErrors } from './utils/index.js'

const uri = process.env.MONGODB_URI

mongoose
  .connect(uri) //process.env pozvolaet vidernutj privatnije ssilki, kotorije mi ukazali na heroku k primeru
  .then(() => {
    console.log('DB OK')
  })
  .catch((err) => {
    console.log('DB error', err)
  }) //podkluchenije k baze dannih

const app = express() //prilozhenije ispolzuet logiku expresa

//Sohranenije kartinok v storage
//destination eto funkcija v multere kotoraja objasnaet kakoj putj ispolzovatj
//filename objasnaet kakoj u fajla name
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})
//upload eto funckija kotoroja pomogaet ispolzovatj naw route
const upload = multer({ storage })

app.use(express.json()) //chitatj JSON kotorij budet prihoditj v nawem zaprose
app.use(cors())
app.use('/uploads', express.static('uploads'))

//otpravlenije GET zaprosa, random
app.get('/', (req, res) => {
  res.send('131231 Hello World')
})

//otpravlenije POST zaprosa na avtorizaciju
app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
)
//otpravlenije POST zaprosa na registraciju
app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
)
//otpravlenije GET zaprosa ob polzovatele
app.get('/auth/me', checkAuth, UserController.getMe)

//upload.single('image') eto middleware funkcija iz multera
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

//otpravlenije GET zaprosa obo vseh statjah
app.get('/posts', PostController.getAll)
//otpravlenije GET zaprosa o poslednih tegah
app.get('/tags', PostController.getLastTags)
// //otpravlenije GET zaprosa obo odnoj statje
app.get('/posts/:id', PostController.getOne)
//otpravlenije POST zaprosa na sozdanije statji
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
)
//otpravlenije DELETE zaprosa na udalenije statji
app.delete('/posts/:id', checkAuth, PostController.remove)
// //otpravlenije PATCH zaprosa na obnovlenije statji
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
)

//privjazivaem port 4444, esli err to console.log(err)
app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Server OK')
}) //process.env.PORT heroku zadajet svoj port

//comment
