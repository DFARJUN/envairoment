function sendScore(){
    var player = GetPlayer();
    var myphoneNum = player.GetVar("phoneNum");
    var myfullName = player.GetVar("fullName");
    var myscore = player.GetVar("score");
    console.log("itshappen");
    $.ajax({
        method: "POST",
        url: "../Handlers/Handler.ashx",
        data: { Action: "registerNewUser", phoneNum: myphoneNum, fullName: myfullName, score: myscore }
    })

        .done(function (data) { //ברגע שהפעולה הסתיימה   
            if (data == "actionSucceed") {
                console.log("המשתמש נוסף בהצלחה");
            }
            else {
                console.log("המשתמש לא נוצר");
            }

        })
};
