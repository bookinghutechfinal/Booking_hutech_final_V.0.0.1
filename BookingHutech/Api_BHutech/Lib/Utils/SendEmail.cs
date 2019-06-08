using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace BookingHutech.Api_BHutech.Lib.Utils
{
    public class SendEmail
    {
        public static void Email(Array receiver, string subject, string content) {
            string senderID = "bookinghutechfinal@gmail.com";
            string senderPassword = "bookinghutech";
            
            string body = content;
            try
            {
                MailMessage mail = new MailMessage();
                foreach(var emailAdress in receiver)
                {
                    mail.To.Add(emailAdress.ToString());
                }
                mail.From = new MailAddress(senderID);
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
                smtp.Credentials = new System.Net.NetworkCredential(senderID, senderPassword);
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.Send(mail);
            }
            catch (Exception ex)
            {
                LogWriter.WriteLogMsg($"Send email fail. Detail: {ex.ToString()}");
            }
        }

        
    }
}