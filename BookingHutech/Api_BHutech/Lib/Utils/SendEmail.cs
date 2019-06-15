using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Configuration;
using System.Net.Mail;
using System.Web;

namespace BookingHutech.Api_BHutech.Lib.Utils
{
    public class SendEmail
    {
        public static void Email(Array receiver, string subject, Array contents) {
            SmtpSection section = (SmtpSection)ConfigurationManager.GetSection("system.net/mailSettings/smtp");

            string senderID = section.From;
            string senderPassword = section.Network.Password;
            var sendEmail = new SendEmail();
            try
            {
                MailMessage mail = new MailMessage();
                foreach(var emailAdress in receiver)
                {
                    mail.To.Add(emailAdress.ToString());
                }
                mail.From = new MailAddress(senderID);
                mail.Subject = subject;
                mail.Body = sendEmail.EmailContent(contents);
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = section.Network.Host; //Or Your SMTP Server Address
                smtp.Credentials = new System.Net.NetworkCredential(senderID, senderPassword);
                smtp.Port = section.Network.Port;
                smtp.EnableSsl = section.Network.EnableSsl;
                smtp.Send(mail);
            }
            catch (Exception ex)
            {
                LogWriter.WriteLogMsg($"Send email fail. Detail: {ex.ToString()}");
            }
        }

        public string EmailContent(Array contents)
        {
            string data = "";
            foreach (var item in contents)
            {
                data += $"<p>{item}</p>";
            }

            var content = $@"<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

{data}

</body>
</html>";
            return content.ToString();
        }
    }
}