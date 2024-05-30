const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    console.log("user :-" , user)
    res.status(201).json({ 
        success: true ,
        message: 'User registered successfully' 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
        token
     });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const myProfile = async (req, res) => {
    try {
        console.log("/me is running");
      res.json({ 
          success: true
       });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { registerUser, loginUser, myProfile};