import nodemailer from "nodemailer";

async function submit(req, res) {
  if (req.method == "POST") {
    console.log("Received");
    var transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      requireTLS: true,
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: "minervapesu@outlook.com",
        pass: `W%_w"UWt79fVS3qT`,
      },
    });
    var data =
      "<h1>" +
      "Name:" +
      req.body.Name +
      "</h1>" +
      "<h1>" +
      "Email:" +
      req.body.Email +
      "</h1>" +
      "<h1>" +
      "Subject:" +
      req.body.Subject +
      "</h1>" +
      "<p>" +
      "Message:" +
      req.body.Message +
      "</p>";
    var mailOptions = {
      from: '"Minerva " <minervapesu@outlook.com>', // sender address (who sends)
      to: "nigeldias27@gmail.com", // list of receivers (who receives)
      subject: "Got some Tea or Coffee for us?", // Subject line
      //text: data, // plaintext body
      html: data, // html body
    };
    await transporter.sendMail(mailOptions);
    res.send("Finished");
  }
}
export default submit;
