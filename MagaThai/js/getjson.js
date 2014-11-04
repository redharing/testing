
var currentcategory = "";
var currentimagepath = "";
var currentcount = 0;
var currentcategoryslug;
var mangaMenu;

$(document).ready(function () {

    $.mobile.showPageLoadingMsg(); // show loading message
    gethotmanga();
    getManga();
    //getthumb($(".owl-item .item.itemdiv0"), 'allcat', 0);*/
    $(".owl-item .itemdiv0 h4").css("font-weight", "900");
    $(".menucategorylist .itemli0").css("background", "#EA4C88");


}); /*Device Ready End*/

function getManga() {
    //mangaMenu = $("#owl-example").owlCarousel({
    //    items: 10, //10 items above 1000px browser width
    //    itemsDesktop: [1000, 7], //5 items between 1000px and 901px
    //    itemsDesktopSmall: [900, 6], // betweem 900px and 601px
    //    itemsTablet: [600, 5], //2 items between 600 and 0
    //    itemsMobile: [400, 3], //2 items between 600 and 0
    //    pagination: false,
    //});
    CategorySliderSuccess(mangaData);

    //client.invokeApi("testing/MangaByPage", {
    //    body: null,
    //    method: "get",
    //    parameters: {
    //        spage: 1
    //    }
    //}).done(function (results) {
    //    //var message = results.result.length + " all image";

    //    CategorySliderSuccess(results.result);
    //}, function (error) {
    //    alert(error.message);
    //});

}


function getthumb(e, slug, i) {
    $.mobile.showPageLoadingMsg(); // show loading message
    $(".menucategorylist li").css("background", "#353535");
    $(".menucategorylist li.itemli" + i).css("background", "#ea4c88");
    $(".owl-item h4").css("font-weight", "normal");
    $(".owl-item h4").css("background", "none");
    $(e).css("font-weight", "900");
    $(e).css("background", "url(../images/arrow.png) no-repeat scroll 0 100%;");
    $(e).addClass("owlactiveslider");

    gethtml(slug);
}
function unserialize(data) {

    var that = this,
      utf8Overhead = function (chr) {
          // http://phpjs.org/functions/unserialize:571#comment_95906
          var code = chr.charCodeAt(0);
          if (code < 0x0080) {
              return 0;
          }
          if (code < 0x0800) {
              return 1;
          }
          return 2;
      };
    error = function (type, msg, filename, line) {
        throw new that.window[type](msg, filename, line);
    };
    read_until = function (data, offset, stopchr) {
        var i = 2,
          buf = [],
          chr = data.slice(offset, offset + 1);

        while (chr != stopchr) {
            if ((i + offset) > data.length) {
                error('Error', 'Invalid');
            }
            buf.push(chr);
            chr = data.slice(offset + (i - 1), offset + i);
            i += 1;
        }
        return [buf.length, buf.join('')];
    };
    read_chrs = function (data, offset, length) {
        var i, chr, buf;

        buf = [];
        for (i = 0; i < length; i++) {
            chr = data.slice(offset + (i - 1), offset + i);
            buf.push(chr);
            length -= utf8Overhead(chr);
        }
        return [buf.length, buf.join('')];
    };
    _unserialize = function (data, offset) {
        var dtype, dataoffset, keyandchrs, keys, contig,
          length, array, readdata, readData, ccount,
          stringlength, i, key, kprops, kchrs, vprops,
          vchrs, value, chrs = 0,
          typeconvert = function (x) {
              return x;
          };

        if (!offset) {
            offset = 0;
        }
        dtype = (data.slice(offset, offset + 1))
          .toLowerCase();

        dataoffset = offset + 2;

        switch (dtype) {
            case 'i':
                typeconvert = function (x) {
                    return parseInt(x, 10);
                };
                readData = read_until(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'b':
                typeconvert = function (x) {
                    return parseInt(x, 10) !== 0;
                };
                readData = read_until(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'd':
                typeconvert = function (x) {
                    return parseFloat(x);
                };
                readData = read_until(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'n':
                readdata = null;
                break;
            case 's':
                ccount = read_until(data, dataoffset, ':');
                chrs = ccount[0];
                stringlength = ccount[1];
                dataoffset += chrs + 2;

                readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 2;
                if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
                    error('SyntaxError', 'String length mismatch');
                }
                break;
            case 'a':
                readdata = {};

                keyandchrs = read_until(data, dataoffset, ':');
                chrs = keyandchrs[0];
                keys = keyandchrs[1];
                dataoffset += chrs + 2;

                length = parseInt(keys, 10);
                contig = true;

                for (i = 0; i < length; i++) {
                    kprops = _unserialize(data, dataoffset);
                    kchrs = kprops[1];
                    key = kprops[2];
                    dataoffset += kchrs;

                    vprops = _unserialize(data, dataoffset);
                    vchrs = vprops[1];
                    value = vprops[2];
                    dataoffset += vchrs;

                    if (key !== i)
                        contig = false;

                    readdata[key] = value;
                }

                if (contig) {
                    array = new Array(length);
                    for (i = 0; i < length; i++)
                        array[i] = readdata[i];
                    readdata = array;
                }

                dataoffset += 1;
                break;
            default:
                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
                break;
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)];
    };

    return _unserialize((data + ''), 0)[2];
}  // function end for serilsie

function getthumbmenu(e, slug, i) {
    $.mobile.showPageLoadingMsg(); // show loading message
    $(".owl-item h4").css("font-weight", "normal");
    $(".owl-item h4").css("background", "none");
    $(".owl-item .itemdiv" + i + " h4").css("font-weight", "900");
    $(".menucategorylist li").css("background", "#353535");
    $(e).css("background", "#ea4c88");
    gethtml(slug);
    setTimeout(function () {
        $("#owl-example").trigger('owl.jumpTo', i + 1);
        $("#homepanel").panel("close");
    }, 500);

}

function gethotmanga() {
    var htmlHotManga = "";
    $.ajax({
        type: "get",
        beforeSend: function (request) {
            request.setRequestHeader("X-ZUMO-APPLICATION", z);
        },
        url: server + "/api/testing/GetHotReleaseManga",
        processData: false,
        success: function (results) {
            window.localStorage.setItem('HotReleaseManga', JSON.stringify(results));
            var mcount = 0;
            var counter = 0;
            $.each(results, function (i, hotmanga) {
                /*this condition will get feature image*/
                //htmlHotManga += '<div style="display: inline-block;" class="item mix ' + hotmanga.mangaName + '"  onclick="getdetail(\'' + hotmanga.chapterImagePath + '\',\'' + 'onepiece' + '\',' + counter + ',' + mcount + ')"><img src="' + hotmanga.chapterImagePath + '"></div>';
                var showDate = "1/1/1"; //hotmanga.modifyDate.replace("T", " เวลา ");
                //var showDate = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear
                htmlHotManga += '<li class="itemli' + (i + 1) + '" onclick="selectMangaChapter(\'' + hotmanga.mangaName + '\');" ><a href="#"><img src="' + hotmanga.chapterImagePath + '"><h2>' + hotmanga.chapterName + '</h2><p>ออกเมื่อ ' + showDate + '</p></a></a></li>';
                counter++;
                mcount++;
            });

            $("#newReleaseManga").html(htmlHotManga);
            $("#newReleaseManga").listview('refresh');
            //$(".gallerydiv").show();
            $.mobile.hidePageLoadingMsg(); // hide loading message
            //setTimeout(function(){
            //$('#Container').mixItUp();
        },
        error: function (error) {
            alert(error.message);
        }
    });
}

//function getpage(manga, chapter) {

//    var html = "";
//    var response = "";
//    var array;
//    var slugmaster = "";
//    $(".gallerydiv").html('');
//    //clearappCache();   // for clear cache....
//    var ajaxurl = "";
//    if (categoryname == "allcat") {
//        ajaxurl = serverurl + '?json=get_posts';
//        slugmaster = "allcat";
//    }
//    else {
//        ajaxurl = serverurl + '?json=get_category_posts&slug=' + categoryname;
//    }

//    $.ajax({
//        type: "get",
//        beforeSend: function (request) {
//            request.setRequestHeader("X-ZUMO-APPLICATION", z);
//        },
//        url: server + "/api/testing/GetMangaImages?manganame=" + manga + "&schapter=" + chapter,
//        processData: false,
//        success: function (results) {
//            window.localStorage.setItem('currentslider', JSON.stringify(results));
//            var mcount = 0;
//            var counter = 0;
//            $.each(results, function (i, image) {
//                /*this condition will get feature image*/
//                html += '<div style="display: inline-block;" class="item mix ' + slugmaster + '"  onclick="getdetail(\'' + image + '\',\'' + 'onepiece' + '\',' + counter + ',' + mcount + ')"><img src="' + image + '"></div>';
//                counter++;
//                mcount++;
//            });

//            $(".gallerydiv").html(html);
//            $(".gallerydiv").show();
//            $.mobile.hidePageLoadingMsg(); // hide loading message
//            //setTimeout(function(){
//            $('#Container').mixItUp();
//        },
//        error: function (error) {
//            alert(error.message);
//        }
//    });

//    //client.invokeApi("testing/GetMangaImages", {
//    //    body: null,
//    //    method: "get",
//    //    parameters: {
//    //        manganame: "onepiece",
//    //        schapter: 700
//    //    }
//    //}).done(function (results) {

//    //    //	},1000);
//    //}, function (error) {

//    //});


//    //$.ajax({ 
//    //			dataType: "jsonp",
//    // 	       type: 'POST',
//    // 		   cache:false,
//    //			url :ajaxurl,
//    //		//url :'test1.json',
//    //			success: function(data)
//    //			{

//    //				window.localStorage.setItem('currentslider', JSON.stringify(data));
//    //                var mcount=0;
//    //				$.each(data.posts,function(i,datamaster){
//    //					/*this condition will get feature image*/
//    //					$.each(datamaster.categories,function(j,subdata){
//    //						var counter=0;
//    //						if(categoryname=="allcat")
//    //						{

//    //								slugmaster=subdata.slug;
//    //						}
//    //						else
//    //						{
//    //								slugmaster=data.category.slug;
//    //						}
//    //						if(subdata.app_field!=null)
//    //						{
//    //						if(datamaster.thumbnail_images!=undefined)
//    //						{
//    //								html+='<div style="display: inline-block;" class="item mix '+slugmaster+'"  onclick="getdetail(\''+datamaster.thumbnail_images.full.url+'\',\''+categoryname+'\','+counter+','+mcount+')"><img src="'+datamaster.thumbnail_images.thumbnail.url+'"></div>';
//    //								counter++;
//    //                                mcount++;
//    //						}

//    //						response=unserialize(datamaster.custom_fields.dfiFeatured);
//    //						if(response!="")	
//    //						{
//    //							$.each(response,function(j,imgdata){
//    //								array=null;
//    //								array=imgdata.split(",");
//    //								html+='<div style="display: inline-block;" class="item mix '+slugmaster+'" onclick="getdetail(\''+serverurl+"wp-content/uploads"+array[0]+'\',\''+categoryname+'\','+counter+','+mcount+')"><img src="'+serverurl+"wp-content/uploads"+array[0]+'"></div>';
//    //								counter++;
//    //                                mcount++;
//    //							});
//    //						}// end if condition response

//    //							} // if condition of app_field
//    //						}); // for each for data.category

//    //						});


//    //				$(".gallerydiv").html(html);
//    //				$(".gallerydiv").show();
//    //				$.mobile.hidePageLoadingMsg(); // hide loading message
//    //				//setTimeout(function(){
//    //					$('#Container').mixItUp();
//    //     			//	},1000);

//    //			},error: function(){
//    //				$.mobile.hidePageLoadingMsg(); // hide loading message
//    //				checkConnection();
//    //			}
//    //		}); /* Json CAll End Here */// JavaScript Document

//}

function CategorySliderSuccess(mangas) {

    //var html = "";
    var lihtml = "";

    //html += '<button class="filter" onclick="selectcat(\'hot\');" data-filter="hot">Hot Mangas</button>';
    lihtml += '<li class="itemli0" onclick="selectcat(\'hot\');"><button class="filter" data-filter="hot" onclick="closemenu();">Hot Mangas</button></li>';
    $.each(mangas, function (i, manga) {
        if (manga != null) {
            //html += '<button class="filter" onClick="selectcat(\'' + manga.name + '\');" data-filter=".' + manga.name + '">' + manga.nameDisplay + '</button>';

            lihtml += '<li class="itemli' + (i + 1) + '" onclick="selectcat(\'' + manga.Name + '\');" ><button class="filter" data-filter=".' + manga.Name + '" onclick="closemenu();">' + manga.NameDisplay + '</button></li>';
        }
    });

    //$("#owl-example").html(html);
    $(".menucategorylist").html(lihtml);
    $.mobile.hidePageLoadingMsg(); // hide loading message
    //$('#Container').mixItUp();
}

function selectMangaChapter() {
    $.mobile.changePage("#mangaChapterDetail", { changeHash: false });
    TouchNSwipe.init();
}

function selectcat(current) {
    $.mobile.showPageLoadingMsg();
    currentcategoryslug = current;
    var chapterContent = "";
    $.ajax({
        type: "get",
        beforeSend: function (request) {
            request.setRequestHeader("X-ZUMO-APPLICATION", "eWNRAfDKzmZaJWBuncCcwMjLePXcDs75");
        },
        url: server + "/api/testing/GetMangaChapterByPage?manganame=" + current + "&page=1",
        processData: false,
        success: function (cs) {
            $.each(cs, function (i, c) {
                chapterContent += '<li ><a href"#">' + c.chapterName + '</a></li>';
            });


            $.mobile.hidePageLoadingMsg(); // hide loading message
            $.mobile.changePage("#mangachapter", { changeHash: false });
            $("#mangachapterContent").html(chapterContent);
            $("#mangachapterContent").listview('refresh');
        }
    });


} // store current category for global
function getdetail(imagepath, categoryname, count, mcount) {
    //alert(currentcategoryslug);
    $.mobile.showPageLoadingMsg(); // show loading message
    currentimagepath = imagepath;
    currentcategory = categoryname;
    $(".bigimage").html('');
    $(".bigimage").html('<div id="owl-big-demo" class="owl-carousel"></div>');

    var dataManga;

    dataManga = JSON.parse(window.localStorage.getItem('currentslider'));


    var array;
    var detailhtml = "";
    var screenheight = parseInt($(window).height() - 105);
    var screenwidth = parseInt($(window).width());

    $.each(dataManga, function (i, data) {
        //		alert(data.categories.slug+"=="+currentcategoryslug);
        detailhtml += ' <div class="item" style="height:' + screenheight + 'px !important;width:' + screenwidth + 'px !important;vertical-align: middle; display: table-cell;"><img style="margin-top:0px;height:auto;width:100%" class="lazyOwl" data-src="' + data + '" alt="Lazy Owl Image"></div>';
    });


    $("#owl-big-demo").html(detailhtml);
    $("#owl-big-demo").owlCarousel({
        navigation: false, // Show next and prev buttons
        singleItem: true,
        pagination: false,
        addClassActive: true,
        lazyLoad: true
    });

    setTimeout(function () {
        //		alert(currentcategoryslug+"=="+count+"=="+mcount);
        if (currentcategoryslug == 'all' || currentcategoryslug != "undefined") {
            $("#owl-big-demo").trigger('owl.jumpTo', parseInt(mcount));
        }
        else {
            $("#owl-big-demo").trigger('owl.jumpTo', parseInt(count));
        }
        $.mobile.changePage("#detail", { changeHash: false });
        //$.mobile.hidePageLoadingMsg(); // hide loading message	
    }, 1000);



}

function shareimage() {
    var image = $("#owl-big-demo .owl-item.active img").attr("src");
    $.mobile.showPageLoadingMsg(); // show loading message
    window.plugins.socialsharing.share('Message and image', null, image, null);
    $.mobile.hidePageLoadingMsg(); // hide loading message	
}
function sharegalleryimage(gallerypath) {
    $.mobile.showPageLoadingMsg(); // show loading message
    window.plugins.socialsharing.share('Message and image', null, gallerypath, null);
    $.mobile.hidePageLoadingMsg(); // hide loading message
}
function setwallpaper() {
    $.mobile.showPageLoadingMsg(); // show loading message

    // prep some variables
    var imagePath = currentimagepath;             // Mention the complete path to your image. If it contains under multiple folder then mention the path from level "www" to the level your image contains with its name including its extension.
    var imageTitle = "GallaryImg_" + Math.floor(100000000 + Math.random() * 900000000) + ".jpg";                     // Set title of your choice.
    var folderName = "gall";                  // Set folder Name of your choice. 


    // For setting wallpaper & saving image
    //wallpaper.setImage(imagePath, imageTitle, folderName, success, error);

    cordova.exec(
               function () { window.plugins.toast.show("Wallpaper set successfully..", 'short', 'center', function (a) { console.log('toast success: ' + a) }, function (b) { }); }, 	// success callback function
              function () { alert("Sorry Something is wrong..."); }, 		// error callback function
              'Wallpaper', 		// mapped to our native Java class called "Wallpaper"
              'setwallpaper', 	// with this action name
              [{                  // and this array of custom arguments to create our entry
                  "imagePath": imagePath,
                  "imageTitle": imageTitle,
                  "folderName": folderName
              }]
          );
    $.mobile.hidePageLoadingMsg(); // hide loading message



    // For saving image
    // wallpaper.saveImage(imagePath, imageTitle, folderName, success, error);   
}
function addtofavorite() {
    $.mobile.showPageLoadingMsg(); // show loading message
    // prep some variables
    var imagePath = currentimagepath;             // Mention the complete path to your image. If it contains under multiple folder then mention the path from level "www" to the level your image contains with its name including its extension.
    var randomnumber = Math.floor(Math.random() * 10000001);
    var imagename = "GallaryImg_" + randomnumber + ".jpg";
    var imageTitle = imagename;
    var folderName = "gall";                  // Set folder Name of your choice. 
    cordova.exec(
         function () { window.plugins.toast.show("Saved to Gallery..", 'short', 'center', function (a) { console.log('toast success: ' + a) }, function (b) { }); }, 	// success callback function
           function (e) { alert(JSON.stringify(e) + "Sorry Something is wrong..."); }, 		// error callback function
           'Wallpaper', 		// mapped to our native Java class called "Wallpaper"
           'savewallpaper', 	// with this action name
           [{                  // and this array of custom arguments to create our entry
               "imagePath": imagePath,
               "imageTitle": imageTitle,
               "folderName": folderName
           }]
       );

    $.mobile.hidePageLoadingMsg(); // hide loading message
}
function clearappCache() {
}

function getgallerypic() {
    //	clearappCache();   // for clear cache....
    getFileSystem();
    //showImage();
}


function gotFS(fileSystem) {
    var reader = fileSystem.root.createReader();
    reader.readEntries(gotList, function () { alert("fail"); });
}

function gotList(entries) {
    var i;
    for (i = 0; i < entries.length; i++) {
        if (entries[i].name.indexOf(".svg") != -1) {
            // alert(entries[i].fullPath);
        }
    }
}

function closemenu() {
    $("#homepanel").panel("close");
}
function sendemail(subject) {
    var options = {
        to: [''],
        subject: subject,
        body: '',
        isHtml: true
    };
    var callbackFn = null,
    options = options || {};
    var defaults = { subject: null, body: null, to: null, cc: null, bcc: null, attachments: null, isHtml: true }
    for (var key in defaults) {
        if (options[key] !== undefined) {
            defaults[key] = options[key];
        }
    }
    cordova.exec(null, null, 'EmailComposer', 'open', [options]);
} // composeMail End