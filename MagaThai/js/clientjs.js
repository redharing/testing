
    

/*Change Title of App*/
$(".global a").html("อ่านการตูนย์");

/*Your Server Url*/
var serverurl = "http://www.excellentwebworld.com/app/";

var client = new WindowsAzure.MobileServiceClient(
        "https://testingred.azure-mobile.net/",
        "eWNRAfDKzmZaJWBuncCcwMjLePXcDs75"
    );

/*Change Title fo My Collection*/

$(".mycollection").html("การ์ตูนที่บันทึกไว้");
