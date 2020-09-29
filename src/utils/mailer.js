import '../../config/config';
import * as nodemailer from 'nodemailer';
// import global.gConfig from "config";

const _c_smtp_server = global.gConfig.smtp_config.smtp_server;
const _c_smtp_port = global.gConfig.smtp_config.smtp_port;
const _c_smtp_user = global.gConfig.smtp_config.smtp_sender_email;
const _c_smtp_pass = global.gConfig.smtp_config.smtp_sender_password;
const _c_smtp_ssl = global.gConfig.smtp_config.smtp_ssl;

export async function sendEmail(email, url) {
  const transporter = nodemailer.createTransport({
    host: _c_smtp_server,
    port: _c_smtp_port,
    secure: _c_smtp_ssl, // true for 465, false for other ports
    auth: {
      user: _c_smtp_user,
      pass: _c_smtp_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Evito <${_c_smtp_user}>`, // sender address
    to: email, // list of receivers
    subject: 'Forgot Password ✔', // Subject line
    text: 'Click the link below to change password', // plain text body
    html: `
    <b>click the below link to reset password</b>
    <br/>
    <br/>

    <div><!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:40px;v-text-anchor:middle;width:150px;" arcsize="10%" stroke="f" fillcolor="#ff381a">
        <w:anchorlock/>
        <center>
      <![endif]-->
          <a href="${url}"
    style="background-color:#ff381a;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:40px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;">Reset Password</a>
      <!--[if mso]>
        </center>
      </v:roundrect>
    <![endif]--></div>

    <br/>
    <br/>
    <a href="${url}">${url}</a>

    `,
  });
  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export async function sendConfirmationEmail(email, url) {
  const transporter = nodemailer.createTransport({
    host: _c_smtp_server,
    port: _c_smtp_port,
    secure: _c_smtp_ssl, // true for 465, false for other ports
    auth: {
      user: _c_smtp_user,
      pass: _c_smtp_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Evito <${_c_smtp_user}>`, // sender address
    to: email, // list of receivers
    subject: 'Confirm Eamil✔', // Subject line
    text: 'Click the link below to Confirm Email', // plain text body
    html: `
    <b>click the below link to Confirm Eamil</b>
    <br/>
    <br/>

    <div><!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:40px;v-text-anchor:middle;width:150px;" arcsize="10%" stroke="f" fillcolor="#ff381a">
        <w:anchorlock/>
        <center>
      <![endif]-->
          <a href="${url}"
    style="background-color:#ff381a;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:40px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;">Confirm Eamil</a>
      <!--[if mso]>
        </center>
      </v:roundrect>
    <![endif]--></div>

    <br/>
    <br/>
    <a href="${url}">${url}</a>

    `,
  });
  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
