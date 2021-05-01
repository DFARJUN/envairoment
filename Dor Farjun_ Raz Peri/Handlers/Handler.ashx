<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using Newtonsoft.Json; //להוסיף את הNewtonsoft
using System.Data;
using System.Data.OleDb;
using System.Collections.Generic;

public class Handler : IHttpHandler
{
    SQLClass mySql = new SQLClass();

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        string Action = context.Request["Action"]; // חשוב לשים לב שזה אותו שם משתנה כמו בקובץ הJS

        switch (Action)
        {
            //הצגת כל המתשמשים
            case "getAllUsers":

                //שאילתה לשליפת כל היוזרים
                string myQueryAllUsers = "SELECT username FROM users";

                //שליפה באמצעות פנייה למחלקה
                DataSet myUsers = mySql.SQLSelect(myQueryAllUsers);

                //אם יש יוזרים
                if (myUsers.Tables[0].Rows.Count != 0)
                {
                    //המרת הטבלה שחזרה מהשליפה לג'ייסון
                    string jsonUsersText = JsonConvert.SerializeObject(myUsers);

                    context.Response.Write(jsonUsersText);
                }
                else
                {
                    context.Response.Write("noUsers");
                }
                break;

            //רישום משתמש חדש
            case "registerNewUser":

                //קבלת כל הפרטים שנשלחו מהקריאה
                string newphoneNum = context.Request["phoneNum"];
                string newfullName = context.Request["fullName"];
                string newscore = context.Request["score"];

                //אם קיים תוכן בכל אחד מהפרטים
                if (newphoneNum != null && newfullName != null && newscore != null)
                {
                    //שאילתה להוספת היוזר החדש לטבלת היוזרים
                    string myQueryAddUser = "INSERT INTO users (phoneNum, fullName, score) VALUES ('" + newphoneNum + "', '" + newfullName + "', '" + newscore + "')";

                    //הוספה לטבלה באמצעות המחלקה
                    mySql.SQLChange(myQueryAddUser);

                    context.Response.Write("actionSucceed");
                }
                else
                {
                    context.Response.Write("noData");
                }

                break;

            //הצגת כל ההמשחקים של כלל היוזרים
            case "UserGames":


                //שאילתה לאיחוד כלל הממשחקים של יוזר והפנייה
                string myQueryUserGames = "SELECT phoneNum, first(fullName) as userName, sum(score) as userScore FROM users GROUP BY phoneNum ORDER BY sum(score) DESC;";

                //שליפה באמצעות פנייה למחלקה
                DataSet userGames = mySql.SQLSelect(myQueryUserGames);

                //אם יש משחקים
                if (userGames.Tables[0].Rows.Count != 0)
                {
                    //המרת הטבלה שחזרה מהשליפה לג'ייסון
                    string jsonGamesText = JsonConvert.SerializeObject(userGames);

                    context.Response.Write(jsonGamesText);
                }
                else
                {
                    context.Response.Write("noGamesFound");
                }
                break;

        }

    }

    public bool IsReusable
    {
        get
        {
            return true;
        }
    }
}
















