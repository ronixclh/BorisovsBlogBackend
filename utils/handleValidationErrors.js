import { validationResult } from 'express-validator'

export default (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  } //esli bili owibki to vozvrashaet mne spisok owibok esli net to next()

  next()
}
