import express from 'express';
import { ControllerFunction, RequestModified } from '@interface/index';
import Admin from '@models/admin';
import validatePassword from '@utils/validatePassword';
import { createCSRFToken } from '@utils/csrf';
import jwt from 'jsonwebtoken';
import config from '@config/index';
import { v4 as uuid } from 'uuid';

export const signin: ControllerFunction = async (req, res) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    let adminAccount = await Admin.findOne({ email });

    if (!adminAccount) {
      return res.status(400).json({ success: false, message: 'Admin not found' });
    }

    if (!validatePassword(password, adminAccount.password)) {
      return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    if (adminAccount.status === 'locked') {
      return res.status(400).json({ success: false, message: 'Your account has been locked' });
    }

    // Place a request here to our server to avoid software theft

    let token = uuid();

    res.setHeader('X-CSRF-TOKEN', token);

    let jwtToken = jwt.sign(
      {
        id: adminAccount._id.toString(),
        csrfToken: token,
        exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
      },
      config.JWT_SECRET,
    );

    return res.status(201).json({ success: true, message: 'Signin successful', action: 'FETCH_ACCOUNT', token: `Bearer ${jwtToken}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

export const getUserInfo: ControllerFunction = async (req, res) => {
  try {
    let user = await Admin.findById(req.user._id, { name: 1, role: 1, status: 1, email: 1 });

    return res.json({ success: true, user });
  } catch (error) {
    console.log('getUserInfo', error);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
