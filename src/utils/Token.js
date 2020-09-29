import jwt from 'jsonwebtoken';

export const createAccessToken = (user) => {
  const signData = {
    userId: user._id,
    email: user.email,
    cid: user.cid,
    companyName: user.companyName,
  };

  return jwt.sign(signData, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '7d',
  });
};

export const createRefreshToken = (user) => jwt.sign(
  { userId: user._id, email: user.email },
  process.env.JWT_REFRESH_SECRET,
  {
    expiresIn: '7d',
  },
);

export const createSubscriptionToken = (data, days) => jwt.sign(data, process.env.JWT_SUBSCRIPTION_SECRET, {
  expiresIn: `${days}d`,
});

export const createForgotPasswordToken = (data) => jwt.sign(
  { userId: data.userId, token: data.id, cid: data.database },
  process.env.JWT_FORGOT_PASSWORD_SECRET,
  {
    expiresIn: '1h',
  },
);

export const createConfirmationEamilToken = (data) => jwt.sign(
  { userId: data.userId, token: data.id, cid: data.database },
  process.env.JWT_CONFIRMATION_EMAIL_SECRET,
  {
    expiresIn: '1h',
  },
);

export const createAccessControlToken = (data) => jwt.sign(data, process.env.JWT_ACCESS_CONTROL_SECRET, {
  expiresIn: '90d',
});
