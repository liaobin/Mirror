var _load=function(e,t,a,n){e="https://api.github.com"+e,t.access_token=config.token,$.ajax({type:"GET",url:e,data:t,success:function(e,t,n){a(e,n.getResponseHeader("link"))},error:function(e,t,a){n?n():alert("An error occurred ("+e.status+")")}})},_template={user:function(e){var t='<a target="_blank" class="icon-github" href="'+e.html_url+'"></a>';e.blog&&(t+='<a target="_blank" class="icon-link" href="'+e.blog+'"></a>'),e.email&&(t+='<a target="_blank" class="icon-email" href="mailto:'+e.email+'"></a>'),config.behance&&(t+='<a target="_blank" class="icon-behance" href="'+config.behance+'"></a>'),config.dribbble&&(t+='<a target="_blank" class="icon-dribbble" href="'+config.dribbble+'"></a>'),config.instagram&&(t+='<a target="_blank" class="icon-instagram" href="'+config.instagram+'"></a>');var a='<img src="https://o2mu9ei56.qnssl.com/7258927%20%281%29.png" /><p>'+config.info+"</p>";return a},issues:function(e){for(var t="",a=0;a<e.length;a++)t+='<a class="post" href="#'+e[a].number+'"><h1>'+e[a].title+"</h1><time>Updated at<span>"+e[a].updated_at.split("T")[0]+"</span></time></a>";return t},issue:function(e){for(var t,a,n="",s=0;s<e.labels.length;s++)n+='<mark style="background:#'+e.labels[s].color+'">#'+e.labels[s].name+"</mark>";return a=e.comments>0?'<button class="comment" data-id="'+e.number+'">View Comments</button>':'<a class="comment" href="'+e.html_url+'#new_comment_field" target="_blank">Add Comment</a>',t='<div id="back">&laquo; back to home</div><h1 class="title">'+e.title+'</h1><time class="time">Updated at<span>'+e.updated_at.split("T")[0]+'</span></time><section class="labels">'+n+'</section><section class="main hidden"><article class="content">'+marked(e.body)+"</article></section>"+a},comments:function(e){for(var t='<ul class="comment_list">',a="",n=0;n<e.length;n++)0===n&&(a=e[n].html_url.split("#")[0]),t+='<li><a href="'+e[n].user.html_url+'" target="_blank"><img src="https://o2mu9ei56.qnssl.com/7258927%20%281%29.png" /></a><section><header><a target="_blank" href="'+e[n].user.login+'">'+e[n].user.login+"</a><span>commented on "+e[n].updated_at.split("T")[0]+"</span></header><p>"+marked(e[n].body)+"</p></section></li>";return t+='</ul><a class="comment" href="'+a+'#new_comment_field" target="_blank">Add Comment</a>'}};$(function(e){function t(){_load(a,{creator:config.user,page:i,per_page:config.per_page},function(t,a){i%r===0?(e("#posts").html(_template.issues(t)),l=[]):e("#posts").append(_template.issues(t)),l=l.concat(t),a&&a.indexOf('rel="next"')>0?(e("#next").css("display","block").removeAttr("disabled").text("More Posts"),i++):e("#next").hide(),e("html").removeClass("loading")})}var a="/repos/"+config.user+"/"+config.repo+"/issues",n="/repos/"+config.user+"/"+config.repo+"/issues/",s="/users/"+config.user,i=1,o="lists",l=[],r=Math.ceil(30/parseInt(config.per_page));if(e("#next").on("click",function(){e(this).attr("disabled",!0).text("Loading..."),t()}),location.hash){o="single";var c=parseInt(location.hash.split("#")[1]);c&&(e("#switch > div").removeClass("transition"),setTimeout(function(){e("#switch").addClass("right")},0),_load(n+c,{},function(t){e("#post").html(_template.issue(t)),e("#post pre code").each(function(e,t){hljs.highlightBlock(t)}),e("html").removeClass("loading")},function(){location.href=""}))}else _load(s,{},function(a){e("#user").html(_template.user(a)),t()});e("body").on("click",function(t){t=e(t.target),t.hasClass("comment")&&"BUTTON"==t[0].tagName&&(t.text("Loading...").attr("disabled",!0),_load(a+"/"+t.data("id")+"/comments",{},function(e){t.parent().append(_template.comments(e)),t.remove()})),"back"==t.attr("id")&&("single"==o?location.href="/":history.back())}),e(window).on("hashchange",function(){if("single"==o)return void(location.href="/");var t,a=parseInt(location.hash.split("#")[1]);if(a){for(var n=0;n<l.length;n++)if(l[n].number==a){t=l[n];break}e("#post").html(_template.issue(t)),e("#post pre code").each(function(e,t){hljs.highlightBlock(t)}),window.scrollTo(0,0),setTimeout(function(){e("#switch").addClass("right"),setTimeout(function(){e("#main").height(window.innerHeight)},400)},0)}else e("#main").css("height","auto"),setTimeout(function(){e("#switch").removeClass("right"),setTimeout(function(){e("#post").html("")},400)},0)})});
