let global = "run";

let toggleLightAndDarkMode = () => {
  const lightMode = $(".light");
  const darkmode = $(".dark");
  const notepad = $("#notepad");
  const language = $(".code_block select");
  const editorTextarea = $("#editor_textarea");
  const inputBox = $(".input textarea");
  const outputBox = $(".output div");
  const code_block = $(".code_block");
  const input_output = $(".input_output");
  const input = $(".input>h4");
  const output = $(".output>h4");
  const select_file = $('.select-file>label')
  const body = $("body");

  // for dark mode
  darkmode.click(function () {
    lightMode.removeClass("hidden");
    darkmode.addClass("hidden");
    notepad.css({ "background-color": "#737373", color: "white" });
    language.css({ "background-color": "#737373", color: "white" });
    select_file.css({ "background-color": "#737373", color: "white" });
    editorTextarea.css({ "background-color": "#737373", color: "white" });
    inputBox.css({ "background-color": "#737373", color: "white" });
    outputBox.css({ "background-color": "#737373", color: "white" });
    input.css({ color: "white" });
    output.css({ color: "white" });
    code_block.css({ "background-color": "#28283e" });
    input_output.css({ "background-color": "#28283e" });
  });

  // for light mode
  lightMode.click(function () {
    darkmode.removeClass("hidden");
    lightMode.addClass("hidden");
    notepad.css({ "background-color": "white", color: "black" });
    language.css({ "background-color": "white", color: "black" });
    select_file.css({ "background-color": "white", color: "black" });
    editorTextarea.css({ "background-color": "white", color: "black" });
    inputBox.css({ "background-color": "white", color: "black" });
    outputBox.css({ "background-color": "white", color: "black" });
    input.css({ color: "black" });
    output.css({ color: "black" });
    code_block.css({ "background-color": "rgba(230, 228, 232, 0.968)" });
    input_output.css({ "background-color": "rgba(230, 228, 232, 0.968)" });
  });
};
function copyLink() {
  let copyButton = $("#btn_invite");
  let linkContent = $("#btn_invite");
  linkContent.val(document.location.href);
  copyButton.click(function () {
    linkContent.select();
    navigator.clipboard.writeText(linkContent.val());
    $.notify('Copied',{ className: "success", position:'top right'});
  });
}

function switchNotepadAndEditor() {
  let switchButton = $("#btn_switch");
  const notepad = $("#notepad");
  const editor = $("#editor");
  switchButton.click(function () {
    if (editor.hasClass("hidden")) {
      editor.removeClass("hidden");
      switchButton.html('<i class="fa-solid fa-laptop-code"></i> Editor');
    } else {
      editor.addClass("hidden");
      switchButton.html('<i class="fa-solid fa-laptop-code"></i> Editor');
    }
  });
}

async function runEditorCode() {
  try {
    let editor_textarea = $("#editor_textarea");
    let inputContainer = $(".input textarea");
    let outputContainer = $(".output div");
    let language = $(".code_block select").val();
    let editorValue = editor_textarea.val();
    let inputValue = inputContainer.val();
    let result = await axios.post(
      "/users/run",
      {
        editor_window: editorValue,
        language: language,
        input: inputValue,
      }
    );

    if (result && result.data.data.stdout) {
      global = result.data.data.stdout;
    } else if (result && result.data.data.stderr) {
      global = result.data.data.stderr;
    }
    return global;
  } catch (error) {
    console.log(error);
  }
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.

let download_file = () => {
  let download_btn = $("#dwn-btn");
  download_btn.click(function () {
    let language = $(".code_block select").val();
    let editorValue = $("#editor_textarea").val();
    let filename = `program.${language}`;
    download(filename, editorValue);
  });
};



//load the file from file manager
async function loadFileAsText() {
  let editor = $('#editor_textarea');
  let yetToUploadFile;
  
  $('#fileToLoad').change(function(e){
      yetToUploadFile = e.target.files[0];
      console.log(yetToUploadFile);
      
      let fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent){
          let textFromFileLoaded = fileLoadedEvent.target.result;
          editor.val(textFromFileLoaded)  
      };

      fileReader.readAsText(yetToUploadFile, "UTF-8");
  });

}



copyLink();
toggleLightAndDarkMode();
switchNotepadAndEditor();
loadFileAsText();
download_file();
export { runEditorCode };
