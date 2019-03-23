using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.Lib.Utils
{
    public static class UploadFile
    {
        /// <summary>
        /// Anh.Trần Create 23/3/2019
        /// </summary>
        /// <param name="image">img String Base64</param>
        /// <param name="AccountID">AccountID</param>
        /// <returns>AvatarPathName: Tên hình </returns>
        public static String UploadImage(String image, String AccountID)
        {
          
            try
            { 
                string img = image;
                string fileName = "Images" + AccountID + ".png";
                var uploadPath = Path.GetDirectoryName("E:/BOOKING_HUTECH/BookingHutech_Final_v1.1.8/BookingHutech_Final/BookingHutech/images/avt/avt");
                var path = Path.Combine(uploadPath, Path.GetFileName(fileName));
                string convert = img.Replace("data:image/png;base64,", String.Empty);
                byte[] bytes = Convert.FromBase64String(convert);
                using (var imageFile = new FileStream(path, FileMode.Create))
                {
                    imageFile.Write(bytes, 0, bytes.Length);
                    imageFile.Flush();
                }

                return fileName;
            }
            catch (Exception ex)
            {
                LogWriter.WriteException(ex);
                throw; 
            }
            
        }
    }
}