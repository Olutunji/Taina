using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TainaAPI.Models;
using System.Configuration;

namespace TainaAPI.Data_Access
{
    public class DataAccess
    {
        //private const string connectionString = "Server=OLUTUNJI\\SQLSERVERDEV2017;Database=Nigeria;Trusted_Connection=True";
        private string connectionString = ConfigurationManager.ConnectionStrings["DBName"].ConnectionString;
        SqlConnection cnn;
        LogWriter logWriter;

        public DataAccess()
        {
            cnn = new SqlConnection(connectionString);
            logWriter = new LogWriter();
        }

        public List<PersonDetail> GetPeople()
        {
            List<PersonDetail> people = new List<PersonDetail>();

            try
            {
                cnn.Open();
                SqlCommand cmd = new SqlCommand("GetPersonDetails", cnn);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    SqlDataReader sqlDataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                    while (sqlDataReader.Read())
                        people.Add(PopulatePersonDetail(sqlDataReader));
                }
                catch (Exception e) { logWriter.LogInformation(e.Message); }
                finally { cmd.Connection.Close(); }
            }
            catch (Exception ex)
            {
                logWriter.LogInformation("Database connection Error");
                logWriter.LogInformation(ex.Message);
                logWriter.LogInformation(ex.StackTrace);
            }

            return people;
        }

        public PersonDetail GetPerson(int personId)
        {
            PersonDetail person = null;
            try
            {
                cnn.Open();
                SqlCommand cmd = new SqlCommand("GetPersonDetail_ById", cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PersonId", personId);

                try
                {
                    SqlDataReader sqlDataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                    while (sqlDataReader.Read())
                        person = PopulatePersonDetail(sqlDataReader);
                }
                catch (Exception e) { logWriter.LogInformation(e.Message); }
                finally { cmd.Connection.Close(); }  
            }
            catch (Exception ex)
            {
                logWriter.LogInformation("Database connection Error");
                logWriter.LogInformation(ex.Message);
                logWriter.LogInformation(ex.StackTrace);
            }

            if (person == null && personId != 0)
                logWriter.LogInformation($"No person with ID {personId}");

            return person;
        }

        public void AddPerson(PersonDetail person)
        {
            try
            {
                cnn.Open();
                SqlCommand cmd = new SqlCommand("InsertPersonDetail", cnn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@CreationDate", DateTime.Now.ToShortDateString());
                cmd.Parameters.AddWithValue("@FirstName", person.FirstName);
                cmd.Parameters.AddWithValue("@SurName", person.SurName);
                cmd.Parameters.AddWithValue("@Gender", person.Gender);
                cmd.Parameters.AddWithValue("@Email", person.Email);
                cmd.Parameters.AddWithValue("@PhoneNumber", person.PhoneNumber);

                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch (Exception e) { logWriter.LogInformation(e.Message); }
                finally { cmd.Connection.Close(); }
            }
            catch (Exception ex)
            {
                logWriter.LogInformation("Database connection Error");
                logWriter.LogInformation(ex.Message);
                logWriter.LogInformation(ex.StackTrace);
            }

        }

        public void UpdatePerson(int personId, PersonDetail person)
        {
            try
            {
                cnn.Open();
                SqlCommand cmd = new SqlCommand("UpdatePersonDetail", cnn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@PersonId", personId);
                cmd.Parameters.AddWithValue("@CreationDate", DateTime.Now.ToShortDateString());
                cmd.Parameters.AddWithValue("@FirstName", person.FirstName);
                cmd.Parameters.AddWithValue("@SurName", person.SurName);
                cmd.Parameters.AddWithValue("@Gender", person.Gender);
                cmd.Parameters.AddWithValue("@Email", person.Email);
                cmd.Parameters.AddWithValue("@PhoneNumber", person.PhoneNumber);

                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch (Exception e) { logWriter.LogInformation(e.Message); }
                finally { cmd.Connection.Close(); }
            }
            catch (Exception ex)
            {
                logWriter.LogInformation("Database connection Error");
                logWriter.LogInformation(ex.Message);
                logWriter.LogInformation(ex.StackTrace);
            }
        }

        public void DeletePerson(int personId)
        {
            try
            {
                cnn.Open();
                SqlCommand cmd = new SqlCommand("DeletePersonDetail", cnn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PersonId", personId);

                try
                {
                    cmd.ExecuteNonQuery();
                }
                finally { cmd.Connection.Close(); }
            }
            catch (Exception ex)
            {
                logWriter.LogInformation("Database connection Error");
                logWriter.LogInformation(ex.Message);
                logWriter.LogInformation(ex.StackTrace);
            }
        }

        #region Private Methods
        private PersonDetail PopulatePersonDetail(SqlDataReader dr)
        {
            PersonDetail person = new PersonDetail();

            person.PersonId = Convert.ToInt16(dr["PersonId"]);
            person.CreateDate = Convert.ToDateTime(dr["CreateDate"]);
            person.FirstName = Convert.ToString(dr["FirstName"]);
            person.SurName = Convert.ToString(dr["SurName"]);
            person.Gender = Convert.ToString(dr["Gender"]);
            person.Email = Convert.ToString(dr["Email"]);
            person.PhoneNumber = Convert.ToString(dr["PhoneNumber"]);

            return person;
        }
        #endregion
    }
}