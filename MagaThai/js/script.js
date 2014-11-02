// handling document ready and phonegap deviceready
window.addEventListener('load', function () {
    document.addEventListener('deviceready', onDeviceReady, false);
}, false);
var images = new Array();
var currentimagehtml="";
// Phonegap is loaded and can be used
function onDeviceReady(){

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){ // success get file system
		fileSystem.root.getDirectory('gall',{create:true,exclusive:false}, function(dcim){
			console.log("Directory Created...");
		}, function(error){
			console.log("Directory Created...");
		})
	}, function(evt){ // error get file system
		console.log(evt.target.error.code);
	});
	

}
/* make operations on the file system */
function getFileSystem(){
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){ // success get file system
		var sdcard = fileSystem.root;
		sdcard.getDirectory('gall',{create:false}, function(dcim){
			
			var gallery = $('#gallery');
			listDir(dcim, gallery);
		}, function(error){
			alert(error.code);
		})
	}, function(evt){ // error get file system
		console.log(evt.target.error.code);
	});
}

/* list on console the content of a directory*/
function listDir(directoryEntry, domParent){

	$.mobile.showPageLoadingMsg(); // show loading message
	
var screenheight=parseInt($(window).height()-105);
var screenwidth=parseInt($(window).width());

	$(".mygallerydiv").html('');
	var html="";
	currentimagehtml="";
	var directoryReader = directoryEntry.createReader();
	directoryReader.readEntries(function(entries){ // success get files and folders
		for(var i=0; i<entries.length; ++i){

		html+='<div onclick="getdetailslider(\'file:///sdcard/'+entries[i].fullPath+'\',\'galleryimage\','+i+')"><img src="file:///sdcard/'+entries[i].fullPath+'"></div>';
		currentimagehtml+='<div style="height:'+screenheight+'px !important;width:'+screenwidth+'px !important;vertical-align: middle; display: table-cell;" class="item"><img style="margin-top:0px;height:'+screenheight+'px !important;width:'+screenwidth+'px !important;" src="file:///sdcard/'+entries[i].fullPath+'"></div>';
			//console.log(entries[i].name);
		}
		$("#mygalleryContent").html(html);

		$.mobile.hidePageLoadingMsg(); // hide loading message
		$.mobile.changePage("#gallery", {changeHash: false });
	}, function(error){ // error get files and folders
		alert(error.code);
	});
}
function getdetailslider(imagepath,categoryname,count)
{

	$("#detailgallery .bigimage").html();
	$("#detailgallery .bigimage").html('<div id="owl-big-demo-gallery" class="owl-carousel"></div>');
	$("#detailgallery #owl-big-demo-gallery").html(currentimagehtml);
				

	$("#detailgallery #owl-big-demo-gallery").owlCarousel({
				navigation : false, // Show next and prev buttons
				singleItem:true,
				pagination:false
  			});

	setTimeout(function()
	{	
	$("#detailgallery #owl-big-demo-gallery").trigger('owl.jumpTo',count); 
	$.mobile.changePage("#detailgallery", {changeHash: false });
	},1000);
}


$(window).load(function(){
  $('#dvLoading').fadeOut(2000);
  $('#dvLoading').hide();
});
