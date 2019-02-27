using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;

namespace BookingHutech.Api_BHutech.Lib
{
    public class LogWriter
    {
        private const long FILESIZE = 1024 * 1024 * 4; //4MB
        private string m_exePath = string.Empty;


        /// <summary>
        /// ignore json loop
        /// </summary>
        /// <param name="obj">object</param>
        /// <returns>string</returns>
        private static string JsonLoop(object obj)
        {
            return JsonConvert.SerializeObject(obj, Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
        }

        /// <summary>
        /// Writes an exception to log file.
        /// </summary>
        public static void WriteException(Exception ex)
        {
            try
            {
                //string strLogPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location); 
                //string strLogPath = Path.GetDirectoryName("E:/BOOKING_HUTECH"); OK
                string strLogPath = Path.GetDirectoryName("E:/BOOKING_HUTECH/BookingHutechFinal/BookingHutech/Api_BHutech/Lib/Utils/Log/log");
                // string strLogPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory,"/Api_BHutech/Lib/Utils/Log/");
                strLogPath = Path.Combine(strLogPath, "Ex_BHutechLog.txt");
                CheckAndSplitFile(strLogPath, FILESIZE);
                DoWriteException(strLogPath, ex);
                if (ex.InnerException != null)
                {
                    DoWriteException(strLogPath, ex.InnerException);
                }
            }
            catch
            {
                return;
            }
        }

        public static void WriteException(string str)
        {
            try
            {
                string strLogPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                strLogPath = Path.Combine(strLogPath, "Ex_BHutechLog.txt");
                CheckAndSplitFile(strLogPath, FILESIZE);
                DoWriteException(strLogPath, str);

            }
            catch
            {
                return;
            }
        }

        /// <summary>
        /// write erroe
        /// </summary>
        /// <param name="strFail">string</param>
        public static void WriteError(string strFail)
        {
            try
            {
                //if (ParamConfig.checkConfig)
                //    return;
                string strLogPath = "LogPath";
                CheckAndSplitFile(strLogPath, FILESIZE);
                DoWriteFail(strLogPath, strFail);
            }
            catch
            {
                return;
            }
        }

        /// <summary>
        /// Writes an exception to log file and split file if current file's size is greater than FileSize parameter.
        /// </summary>
        public static void WriteException(Exception ex, long FileSize)
        {
            try
            {
                string strLogPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                CheckAndSplitFile(strLogPath, FileSize);
                DoWriteException(strLogPath, ex);
            }
            catch
            {
                return;
            }
        }

        ///// <summary>
        ///// Writes an exception to log file and split file if current file's size is greater than default file's size.
        ///// </summary>
        //public static void WriteException(string LogFile, Exception ex)
        //{
        //    try
        //    {
        //        string strLogPath = ParamConfig.Config.GetLogPath();
        //        CheckAndSplitFile(strLogPath, FILESIZE);
        //        DoWriteException(strLogPath, ex);
        //    }
        //    catch
        //    {
        //        return;
        //    }
        //}

        /// <summary>
        /// This function is used to wrilte log
        /// </summary>
        /// <param name="LogFile">Log path</param>
        /// <param name="strLogContent">Content</param>
        private static void DoWriteLog(String LogFile, string strLogContent)
        {
            StreamWriter wr = null;
            try
            {
                wr = new StreamWriter(LogFile, true, Encoding.UTF8);

                wr.WriteLine("[" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + "]");
                wr.WriteLine(strLogContent);
                wr.Flush();

            }
            catch
            {

            }
            finally
            {
                wr.Dispose();
            }
        }

        /// <summary>
        /// do write exception
        /// </summary>
        /// <param name="LogFile">string</param>
        /// <param name="ex">Exception</param>
        private static void DoWriteException(string LogFile, Exception ex)
        {
            try
            {
                using (StreamWriter wr = new StreamWriter(LogFile, true, Encoding.UTF8))
                {
                    wr.WriteLine("BEGIN EXCEPTION [" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + " " + ex.GetType().ToString() + "] ---------------------------------------------");
                    wr.WriteLine("Method: " + ex.TargetSite);
                    wr.WriteLine("Message: " + ex.Message);
                    wr.WriteLine("Source: " + ex.Source);
                    wr.WriteLine("Stack Trace:\n" + ex.StackTrace);
                    if (ex.InnerException != null)
                    {
                        wr.WriteLine("Inner mess: " + ex.InnerException.Message);
                        wr.WriteLine("Inner Source: " + ex.InnerException.Source);
                        wr.WriteLine("Inner strace: " + ex.InnerException.StackTrace);
                    }
                    wr.WriteLine("END EXCEPTION ---------------------------------------------------------------------\r\n");
                    wr.Flush();
                }
            }
            catch
            {

            }
        }


        private static void DoWriteException(string LogFile, string str)
        {
            try
            {
                using (StreamWriter wr = new StreamWriter(LogFile, true, Encoding.UTF8))
                {
                    wr.WriteLine("BEGIN EXCEPTION [" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + "] ---------------------------------------------");
                    wr.WriteLine("Message: " + str);

                    wr.WriteLine("END EXCEPTION ---------------------------------------------------------------------\r\n");
                    wr.Flush();
                }
            }
            catch
            {

            }
        }

        /// <summary>
        /// write message fail
        /// </summary>
        /// <param name="LogFile">string</param>
        /// <param name="strFail">string</param>
        private static void DoWriteFail(string LogFile, string strFail)
        {
            try
            {
                using (StreamWriter wr = new StreamWriter(LogFile, true, Encoding.UTF8))
                {
                    wr.WriteLine("BEGIN FAIL [" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + "] ---------------------------------------------");
                    wr.WriteLine("Reason: " + strFail);
                    wr.WriteLine("END FAIL ---------------------------------------------------------------------\r\n");
                    wr.Flush();
                }
            }
            catch
            {

            }
        }

        /// <summary>
        /// check file size and split file
        /// </summary>
        /// <param name="LogFile">string</param>
        /// <param name="FileSize">long : size of file</param>
        private static void CheckAndSplitFile(string LogFile, long FileSize)
        {
            try
            {
                FileInfo fInfo = new FileInfo(LogFile);
                if (fInfo.Exists) // check if file is exist
                {
                    FileSize = FileSize > 0 ? FileSize : FILESIZE;
                    if ((fInfo.Length) >= FileSize) //if current file larger than file size
                    {
                        fInfo.MoveTo(Path.ChangeExtension(LogFile, ".bk_" + DateTime.Now.ToString("yyyyMMddHHmmss")));
                    }
                }
            }
            catch
            {
                return;
            }
        }

        static readonly object lockLog = new object();
        /// <summary>
        /// write log data
        /// </summary>
        /// <param name="functionName">string</param>
        /// <param name="request">object</param>
        /// <param name="result">object</param>
        //public static void WriteLogData(string functionName, object request, object result)
        //{
        //    try
        //    {
        //        lock (lockLog)
        //        {
        //            string strLogPath = "LogFile"; 
        //            CheckAndSplitFile(strLogPath, FILESIZE);

        //            string strReq = LogPCICommon.Convert(request);// paser request follow PCI
        //            string strRes = LogPCICommon.Convert(result); // paser response follow PCI
        //            DoWriteLogData(functionName, strLogPath, strReq, strRes);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        WriteException(ex);
        //    }
        //}

        /// <summary>
        /// execute function writelog to text log
        /// </summary>
        /// <param name="functionName">string</param>
        /// <param name="strLogPath">string</param>
        /// <param name="strReq">string</param>
        /// <param name="strRes">string</param>
        private static void DoWriteLogData(string functionName, string strLogPath, string strReq, string strRes)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                sb.AppendLine("BEGIN MESSAGE [" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + "] --------------------------------------------");
                sb.AppendLine(string.Format("FUNCTION NAME: {0}", functionName));
                sb.AppendLine(string.Format("REQUEST: {0}", strReq));
                sb.AppendLine(string.Format("RESPONSE: {0}", strRes));
                sb.Append("END MESSAGE ---------------------------------------------------------------------\r\n");
                using (StreamWriter wr = new StreamWriter(strLogPath, true, Encoding.UTF8))
                {
                    wr.WriteLine(sb.ToString());
                }
            }
            catch
            {

            }
        }
    }
}