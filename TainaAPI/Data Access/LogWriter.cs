using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace TainaAPI.Data_Access
{
    public class LogWriter
    {
        private String filePath = $"C:/Users/Olutunji Olopade/source/repos/Taina/Logs/Log_{DateTime.Now.Date.ToShortDateString()}.txt";
        private TextWriter writer;

        public void LogInformation(String logInfo)
        {
            try
            {
                using (writer = new StreamWriter(filePath, true))
                {
                    writer.WriteLine($"{DateTime.Now.ToLongTimeString()} : {logInfo}");
                }
            }
            catch (Exception ex)
            {
                String message = ex.Message;
                // Not sure yet
            }

        }
    }
}