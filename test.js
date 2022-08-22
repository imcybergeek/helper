var nodemailer = require('nodemailer');


const mailer = async (downtime) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      auth: {
          user: 'zxdsaqwerty7654321@outlook.com',
          pass: 'zxcdsaqwe321'
      }
  });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'zxdsaqwerty7654321@outlook.com', // sender address
      to: "jatinjxd@gmail.com, jatin.joshi@revfin.in", // list of receivers
      subject: "Server Downtime", // Subject line
      text: "Hi", // plain text body
      html: `<h1>Server Downtime: ${downtime}</h1>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

mailer("haha")