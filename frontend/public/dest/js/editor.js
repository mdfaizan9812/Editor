let global="run",toggleLightAndDarkMode=()=>{const o=$(".light"),t=$(".dark"),c=$("#notepad"),e=$(".code_block select"),a=$("#editor_textarea"),l=$(".input textarea"),d=$(".output div"),r=$(".code_block"),n=$(".input_output"),i=$(".input>h4"),s=$(".output>h4"),u=$(".select-file>label");$("body");t.click(function(){o.removeClass("hidden"),t.addClass("hidden"),c.css({"background-color":"#737373",color:"white"}),e.css({"background-color":"#737373",color:"white"}),u.css({"background-color":"#737373",color:"white"}),a.css({"background-color":"#737373",color:"white"}),l.css({"background-color":"#737373",color:"white"}),d.css({"background-color":"#737373",color:"white"}),i.css({color:"white"}),s.css({color:"white"}),r.css({"background-color":"#28283e"}),n.css({"background-color":"#28283e"})}),o.click(function(){t.removeClass("hidden"),o.addClass("hidden"),c.css({"background-color":"white",color:"black"}),e.css({"background-color":"white",color:"black"}),u.css({"background-color":"white",color:"black"}),a.css({"background-color":"white",color:"black"}),l.css({"background-color":"white",color:"black"}),d.css({"background-color":"white",color:"black"}),i.css({color:"black"}),s.css({color:"black"}),r.css({"background-color":"rgba(230, 228, 232, 0.968)"}),n.css({"background-color":"rgba(230, 228, 232, 0.968)"})})};function copyLink(){let o=$("#btn_invite"),t=$("#btn_invite");t.val(document.location.href),o.click(function(){t.select(),navigator.clipboard.writeText(t.val()),$.notify("Copied",{className:"success",position:"top right"})})}function switchNotepadAndEditor(){let o=$("#btn_switch");$("#notepad");const t=$("#editor");o.click(function(){t.hasClass("hidden")?t.removeClass("hidden"):t.addClass("hidden"),o.html('<i class="fa-solid fa-laptop-code"></i> Editor')})}async function runEditorCode(){try{let o=$("#editor_textarea"),t=$(".input textarea");$(".output div");var c=$(".code_block select").val(),e=o.val(),a=t.val(),l=await axios.post("/api/v1/compile/run",{editor_window:e,language:c,input:a},{baseURL:"http://localhost:8000/"});return l&&l.data.data.stdout?global=l.data.data.stdout:l&&l.data.data.stderr&&(global=l.data.data.stderr),global}catch(o){console.log(o)}}function download(o,t){var c=document.createElement("a");c.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),c.setAttribute("download",o),c.style.display="none",document.body.appendChild(c),c.click(),document.body.removeChild(c)}let download_file=()=>{let o=$("#dwn-btn");o.click(function(){download("program."+$(".code_block select").val(),$("#editor_textarea").val())})};async function loadFileAsText(){let c=$("#editor_textarea"),e;$("#fileToLoad").change(function(o){e=o.target.files[0],console.log(e);let t=new FileReader;t.onload=function(o){o=o.target.result;c.val(o)},t.readAsText(e,"UTF-8")})}copyLink(),toggleLightAndDarkMode(),switchNotepadAndEditor(),loadFileAsText(),download_file();export{runEditorCode};