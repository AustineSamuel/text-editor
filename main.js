let view=false;
function editor(){
  //  $("#lines span").css("font-size",$("textarea").css("font-size"));
function getCursorPos(input) {
    if ("selectionStart" in input && document.activeElement == input) {
        return {
            start: input.selectionStart,
            end: input.selectionEnd
        };
    }
    else if (input.createTextRange) {
        var sel = document.selection.createRange();
        if (sel.parentElement() === input) {
            var rng = input.createTextRange();
            rng.moveToBookmark(sel.getBookmark());
            for (var len = 0;
                     rng.compareEndPoints("EndToStart", rng) > 0;
                     rng.moveEnd("character", -1)) {
                len++;
            }
            rng.setEndPoint("StartToStart", input.createTextRange());
            for (var pos = { start: 0, end: len };
                     rng.compareEndPoints("EndToStart", rng) > 0;
                     rng.moveEnd("character", -1)) {
                pos.start++;
                pos.end++;
            }
            return pos;
        }
    }
    return -1;
}
$("#myNav123 #download").click(function(){
    console.log(data);
message("preparing file for download",6000,500);    
$.post({
    url:"save.php",
    data:{"action":"save","data":$("textarea").val()},
error:function(){
message("download fail",5000,200);
},
success:function(e){
download(e);
function delFile(){
$.post({
url:"save.php",
data:{"action":"del","data":e},
success: function(e){
message(e)
},
error:function(){
alert("error");
}
});
}
warning("have file downloaded ?","click OK when file is completely downloaded","Cancel","Ok",delFile,delFile);
}
});
});
$("#myNav123 #save").click(function(){
    getData();
message("saved ready to preview",5000,500)
});
const HTMLsuggestions=["!doctype","body","i","button","cite","del","video","h1",
"h2","h3","h4","h5","h6",
"abbr","li","ul","ol","br","span",
"heading","nav","p","audio","video",
"mark","b","address","aside","div","footer",
"center",'strong',"big","small",'canvas',"head","title","body",
"html","script","form","select","option","datalist","table",'tr',
'td','td',"tfoot","th",'col','sup','sub',"noscript"
]//etc
var start=0;
var end=0;
let gab=[];
let lastGabWord=[]
function suggest(arr){
$("#bottomNav").html("");
arr.forEach((e)=>{
$("#bottomNav").append("<button>"+e+"</button>");
});
$("#bottomNav button").click(function(){
let e=$(this).html();
let code=e!="!doctype" ? "<"+e+">\n\n"+"</"+e+">"+"\t" :'<!DOCTYPE html>\n<html>\n<head>\n<title> </title>\n<style type="text/css">\n body{\n\n}\n</style></head>\n<body>\n\n</body>\n<script type="text/javascript" >\n\n//codes js\n\n</script></html>';
var html=$("textarea").val();
const text=$("textarea").val();
const left=text.slice(end-1,text.length);
const right=text.slice(0,start-1);
$("textarea").val("")
$("textarea").val(right+" "+code+" "+left)
});
}
suggest(HTMLsuggestions)
let words=["bi"];
$("textarea").on("keydown",function(e){
start=getCursorPos($(this)[0]).start;
end=getCursorPos($(this)[0]).end
view=true;
var key=e.keyCode||e.which;
var html=$(this).val();
if(key===13){
var lastNumber=parseInt($('#lines').children().last().html())+1
$("#lines").append("<span>"+lastNumber+"</span>");
}
words=$("textarea").val().split("\n");
gab=$("textarea").val().split(" ");
$('#lines').html("");
words.forEach((e,i)=>{
$("#lines").append("<span>"+parseInt(i+1)+"</span>");
});
//suggestions
//find current editing word
let w="";
for(let i=start -1;i>=0; i--){
if(html[i]=="<"||html[i]==">"){
break;
}
if(html[i]!=" "){
w+=html[i];
}
}//check word
let rv=""
for(let i=w.length -1;i>=0;i--){
rv+=w[i];
}
//end finding editable word
lastGabWord=rv;
lastGabWord=lastGabWord.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
if(lastGabWord.length>0 &&  lastGabWord){
const arr=HTMLsuggestions.filter((e)=>{
return e.toUpperCase().search(lastGabWord.toUpperCase())> -1 || e.toUpperCase().includes(lastGabWord.toUpperCase());
})
suggest(arr);
}
else{
suggest(HTMLsuggestions);
}

});
//click
$("textarea").on("click",function(e){
start=getCursorPos($(this)[0]).start;
end=getCursorPos($(this)[0]).end
});
}
editor();
let oldData='';
let data='';
function actions(){
$("#body").append('<div id="copy"><button onclick="copy()"id="copyNow" class="fa fa-clone"></button><button onclick="output()" id="output" class="fa fa-play"></button></div>');
}
function html(){
document.querySelector("html").innerHTML=oldData;
setTimeout(()=>{
$('textarea').val(data);
editor();
actions();
},500)
}
function backToCode(){
const body=document.querySelector("html").hasChildNodes("body")? "" : document.querySelector("html").appendChild(document.createElement("head"));
//const head=document.querySelector("html").hasChildNodes("head") ? "" : document.querySelector("html").appendChild(document.createElement("head"));
//document.querySelector("head").innerHTML='<script src="../coding/jquery.js" type="text/javascript"></script>';

setTimeout(()=>{
const btn=document.createElement("button");
btn.innerText='</code>';
btn.onclick=html;
btn.setAttribute("style","margin-top:-5px;padding:5px 10px;border:none;color:white; border-radius:5px;position:fixed;bottom:0; right:0; background:black;");
//$("body").append("<button onclick='html()' style="margin-top:-5px;padding:5px 50px;border:none;color:white; border-radius:5px;position:fixed;bottom:0; right:0; background:black;'>back</button>");
document.body.appendChild(btn);
},5);
}
//backToCode();
function getData(){
 oldData=$("html").html();
 data=$("textarea").val();
}
function copy(){
const data=document.querySelector("textarea");
data.select()
data.setSelectionRange(0,99999);
document.execCommand("copy");
message("copied",1000,400);
}

function output(){
if(view!=false){
document.querySelector("html").innerHTML=data;
backToCode();
setTimeout(() => {
    scriptCode=document.querySelector("script").innerHTML;
eval(scriptCode);
},500);
}
else{
message("please type something first");
}
}

onload=()=>{
$("textarea").val('<!DOCTYPE html>\n<html>\n<head>\n<title> </title>\n<style type="text/css">\n body{\n\n}\n\n/*css codes here*/\n\n</style></head>\n<body>\n\n</body>\n<script type="text/javascript">\n\n//codes js\n\n</script>\n</html>');
actions();
rmvHostingLogo()
}
