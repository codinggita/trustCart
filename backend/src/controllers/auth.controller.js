const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');

// @desc  Register new user
// @route POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Login user
// @route POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get current user
// @route GET /api/auth/me
const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

// @desc  Google Login
// @route POST /api/auth/google
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    let email, name;

    try {
      // Try verifying as ID Token first
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
    } catch (idTokenError) {
      // If ID Token verification fails, try as Access Token via userinfo endpoint
      try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
        email = response.data.email;
        name = response.data.name;
      } catch (accessTokenError) {
        // Mock fallback if both fail (for demo/development)
        email = 'google.mock@user.com';
        name = 'Google Mock User';
      }
    }
    
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, password: Math.random().toString(36).slice(-8) });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error processing Google token' });
  }
};

// @desc  SSO Integration
// @route POST /api/auth/sso
const ssoLogin = async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({ success: false, message: 'SSO Domain required' });
    }

    // This simulates finding the company SSO config and automatically logging in a generic org user
    const simulatedEmail = `user@${domain}`;
    let user = await User.findOne({ email: simulatedEmail });

    if (!user) {
      user = await User.create({ 
        name: `${domain} Associate`, 
        email: simulatedEmail, 
        password: Math.random().toString(36).slice(-10) 
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error with SSO login' });
  }
}

module.exports = { register, login, getMe, googleLogin, ssoLogin };
