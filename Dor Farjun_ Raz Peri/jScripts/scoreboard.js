$(document).ready(function () {

    $("#serchName").keyup(function () {
        $("#rowToDelete").remove();

        if ($("#serchName").val() == null) {
            for (var i = 1; i < tbody.length; i++) {
                    tbody.item(i).style.display = "table-row"

            }
        }
        var result = 0;
        var tbody = document.getElementById("userGamesDIV").getElementsByTagName("table").item(0).getElementsByTagName("tbody").item(0).getElementsByTagName("tr");
        for (var i = 1; i < tbody.length; i++) {
            if ((tbody.item(i).getElementsByTagName("td").item(1).innerHTML.includes(document.getElementById("serchName").value))) {
                tbody.item(i).style.display = "table-row"
                result++;
                //document.getElementById("noresult").style.display = "none";
            } else {
                tbody.item(i).style.display = "none"
            }
        }
        if (result == 0) {
            tr = document.createElement('tr');
            var td1 = document.createElement('td');
            var cellText = document.createTextNode(" לא נמצאו שחקנים 🥺");
            td1.appendChild(cellText);
            td1.setAttribute("colspan", "3");
            tr.appendChild(td1);
            tr.setAttribute("id", "rowToDelete");
            document.getElementById("userGamesDIV").getElementsByTagName("table").item(0).getElementsByTagName("tbody").item(0).appendChild(tr)

        }
    });

    var myLoginUsername = $("#showGamesUsernameTXT").val(); //קבלת שם המשתמש מהטופס

    $.ajax({
        method: "POST",
        url: "Handlers/Handler.ashx",
        data: { Action: "UserGames", username: myLoginUsername }
    })
        .done(function (data) { //ברגע שהפעולה הסתיימה  
            console.log(data);
            if (data == "noGamesFound") {   //אם ליוזר אין משחקים או שהיוזר לא נמצא ברשימה
                $("#userGamesDIV").html("לא נמצאו משחקים");
            }
            else {
                obj = JSON.parse(data);    //המרת המחרוזת שחזרה למשתנה מסוג ג'ייסון
                var tbl = document.createElement('table'); //יצירת טבלת נקודות
                tbl.style.width = '20%';
                tbl.style.height = '40%';
                tbl.setAttribute('border', '1');
                var tbdy = document.createElement('tbody');
                var tr = document.createElement('tr');
                var th0 = document.createElement('th');
                var cellText = document.createTextNode("");
                th0.appendChild(cellText);
                var th1 = document.createElement('th');
                cellText = document.createTextNode("שם השחקן");
                th1.appendChild(cellText);
                var th2 = document.createElement('th');
                cellText = document.createTextNode("נקודות");
                th2.appendChild(cellText);
                tr.appendChild(th0);
                tr.appendChild(th1);
                tr.appendChild(th2);
                tbdy.appendChild(tr)
                for (i = 0; i < obj.Table.length; i++) {   //מעבר על כל שמות ההמשתמשים שהגיעו מהקריאה
                    tr = document.createElement('tr');
                    var td1 = document.createElement('td');
                    var cellText = document.createTextNode(obj.Table[i].userName);
                    td1.appendChild(cellText);
                    var td2 = document.createElement('td');
                    cellText = document.createTextNode(obj.Table[i].userScore);
                    td2.appendChild(cellText);
                    var td0 = document.createElement('td');
                    if (i == 0) {
                        cellText = document.createTextNode("🏆");
                    }
                    else {
                        cellText = document.createTextNode(i + 1);
                    }
                    td0.appendChild(cellText);
                    tr.appendChild(td0);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tbdy.appendChild(tr);

                }
                tbl.appendChild(tbdy);
                $("#userGamesDIV").html(tbl)

            }
        })
        .fail(function (error) { //במצב של שגיאה  
            console.log("error");
        })
});