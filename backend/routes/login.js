const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../modules/user');
const router = express.Router();
const Joi = require('joi');
const generateAuthToken = require('../utils/genAuthToken');


router.post('/', async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = generateAuthToken(user);
  res.send(token);
});

module.exports = router;