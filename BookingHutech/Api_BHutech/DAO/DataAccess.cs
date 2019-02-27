using BookingHutech.Api_BHutech.Lib.Utils;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BookingHutech.Api_BHutech.DAO
{

    public class DataAccess
    {
        // C:\Program Files\Microsoft SQL Server\MSSQL12.SQL_NHUTANH_2014\MSSQL\Backup\
        public string ConnectionString()
        {
            try
            {
                string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["BookingHutechConnectionString"].ConnectionString;
                return connectionString;
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        //static string connec = System.Configuration.ConfigurationManager.ConnectionStrings["BookingHutechConnectionString"].ConnectionString;
        //SqlConnection connection = new SqlConnection(connec);
        //SqlDataAdapter adap;
        //SqlCommand cmd;


        ///// <summary>
        ///// Mở kết nối
        ///// </summary>
        //public void KetNoi()
        //{
        //    if (connection.State == ConnectionState.Closed)
        //        connection.Open();
        //}
        ///// <summary>
        ///// Ngắt kết nối
        ///// </summary>
        //public void NgatKetNoi()
        //{
        //    try
        //    {
        //        if (connection.State == ConnectionState.Open)
        //            connection.Close();
        //    }
        //    catch (BHutechException ex)
        //    {
        //        LogWriter.WriteException(ex);
        //        throw;
        //    }
        //}

        //public DataTable get_DaTaTable(string clSelect)
        //{
        //    try
        //    {

        //        KetNoi();
        //        adap = new SqlDataAdapter(clSelect, connection);
        //        DataTable dt = new DataTable();
        //        adap.Fill(dt);
        //        NgatKetNoi();
        //        return dt;
        //    }
        //    catch (BHutechException ex)
        //    {
        //        LogWriter.WriteException(ex);
        //        throw;
        //    }
        //}

        ///// <summary>
        ///// Thực thi câu lệnh select
        ///// </summary>
        ///// <param name="caulenh"> </param>

        //public void ThucThiCL(string caulenh)
        //{
        //    try
        //    {
        //        KetNoi();
        //        cmd = new SqlCommand(caulenh, connection);
        //        cmd.ExecuteNonQuery();// thực thi câu lệnh Insert, Update, delete
        //        NgatKetNoi();
        //    }
        //    catch (BHutechException ex)
        //    {
        //        LogWriter.WriteException(ex);
        //        throw;
        //    }
        //}

        ////kiem tra ma
        //public int TongBanGhi(string strSelect)
        //{
        //    try
        //    {
        //        KetNoi();
        //        DataTable dtTong = new DataTable();
        //        adap = new SqlDataAdapter(strSelect, connec);
        //        adap.Fill(dtTong);
        //        // 
        //        int sbg = dtTong.Rows.Count;
        //        NgatKetNoi();
        //        return sbg;

        //    }
        //    catch (BHutechException ex)
        //    {
        //        LogWriter.WriteException(ex);
        //        throw;
        //    }
        //}
    }

}