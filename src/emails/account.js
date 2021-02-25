
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
      to: email,
      from:'Richardflores009@gmail.com',
      subject: 'Welcome to the app!',
      text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  })
}

sgMail
  .send(sendWelcomeEmail)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })


  module.exports = {
      sendWelcomeEmail
  }