const express = require('express');
let crypto = require('crypto');
const { exec } = require('child_process');
var nodemailer = require('nodemailer');

const app = express();

const secret = "secret";
const downtimeMailer = (stdout) => mailer(stdout.split('Server Downtime: ')[1]).catch(console.error);

const mailer = async (downtime) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'elian59@ethereal.email',
        pass: 'tv59DJ6Nd61xA1kR73'
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'elian59@ethereal.email', // sender address
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

app.post('/hook', (req, res) => {
    req.on('data', function (chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            const process = exec('bash deploy.sh', (err, stdout, stderr) => downtimeMailer(stdout))
            res.status(200);
        }
    })
})

app.listen(8080, () => console.log('Helper is running...'))