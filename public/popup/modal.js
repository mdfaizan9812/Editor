class Modal {
  constructor(data) {
    this.modalHTML = $(`<div id="modal">
          <div id="modal-overlay"></div>
          <div id="modal-body">
              <div id="modal-header"><span class="modal-close">&#10005;</span></div>
              <div id="modal-content"></div>
          </div>
          </div>`);

    // add customization
    this.html = data.html;
  }

  init() {
    // show model first time
    $("body").append(this.modalHTML);
    
    // close on click close button
    $(".modal-close").click(function () {
      $("#modal").remove();
    });

    // close on click overlay
    $("#modal-overlay").click(function () {
      $("#modal").remove();
    });

    // close on press esc key
    $(document).on("keydown", function (e) {
      if (e.keyCode === 27) {
        // ESC
        $("#modal").remove();
      }
    });

    // add user html content to model-content
    $("#modal-content").html(this.html);
  }

  close() {
    $("#modal").remove();
  }
}
