window.onload = function() {
  // When HomeButton Click, reload page
  document.getElementById("HomeButton").onclick = function() {
    location.reload();
  }

  // Dropdown button Start
  var toggle = 0;

  document.getElementById("dropdown_menu_wrapper").onclick = function() {
    if (toggle == 0) {
      this.style.display = "block";
      this.style.zIndex = 3;
      document.getElementById("dropdown_menu").style.display = "block";
      var player = document.getElementById("dropdown_menu").animate([{
          transform: 'translate(0px, -400px)'
        },
        {
          transform: 'translate(0px, 0px)'
        }
      ], 500);
      player.addEventListener('finish', function() {
        document.getElementById("dropdown_menu").style.transform = 'translate(0px, 0px)';
      });
      toggle = 1;
    } else {
      var player = document.getElementById("dropdown_menu").animate([{
          transform: 'translate(0px, 00px)'
        },
        {
          transform: 'translate(0px, -400px)'
        }
      ], 500);
      this.style.zIndex = 1;
      player.addEventListener('finish', function() {
        document.getElementById("dropdown_menu").style.transform = 'translate(0px, -400px)';
      });
      toggle = 0;
    }
  }
  // Dropdown button End

  // ImageSlide start
  var imgSlidelist = document.getElementsByClassName('slideImg');
  var imgIndiList = document.getElementsByClassName("slideIndicator button currentImg");
  var index = 0;
  slideImg();

  // Slide images periodically
  function slideImg() {
    var i;

    for (i = 0; i < imgSlidelist.length; i++) {
      imgSlidelist[i].style.display = "none";
      imgSlidelist[i].className = "slideImg";
    }

    imgSlidelist[index].style.display = "block";
    imgSlidelist[index].className = "slideImg slideOutRight animated";
    imgIndiList[index].style.background = "rgba( 255, 255, 255, 0 )";

    index++;
    if (index >= imgSlidelist.length) {
      index = 0;
    }
    imgSlidelist[index].style.display = "block";
    imgSlidelist[index].className = "slideImg slideInLeft animated";
    imgIndiList[index].style.background = "#ccc";

    setTimeout(slideImg, 5000); // Call slideImg() every 5 seconds
  }

  var nextSlideBtnList = document.getElementsByClassName("slideIndicator button Img");

  // When click '<', show left image on screen
  nextSlideBtnList[0].onclick = function() {
    var i;
    for (i = 0; i < imgSlidelist.length; i++) {
      imgSlidelist[i].style.display = "none";
      imgSlidelist[i].className = "slideImg";
    }

    imgSlidelist[index].style.display = "block";
    imgSlidelist[index].className = "slideImg slideOutLeft animated";
    imgIndiList[index].style.background = "rgba( 255, 255, 255, 0 )";

    index--;
    if (index < 0) {
      index = imgSlidelist.length - 1;
    }
    imgSlidelist[index].style.display = "block";
    imgSlidelist[index].className = "slideImg slideInRight animated";
    imgIndiList[index].style.background = "#ccc";

  }

  // When click '>', show right image on screen
  nextSlideBtnList[1].onclick = function() {
    var i;
    for (i = 0; i < imgSlidelist.length; i++) {
      imgSlidelist[i].style.display = "none";
    }

    imgSlidelist[index].style.display = "block";
    imgSlidelist[index].className = "slideImg slideOutRight animated";
    imgIndiList[index].style.background = "rgba( 255, 255, 255, 0 )";

    index++;
    if (index >= imgSlidelist.length) {
      index = 0;
    }
    imgSlidelist[index].style.display = "block";
    imgSlidelist[index].className = "slideImg slideInLeft animated";
    imgIndiList[index].style.background = "#ccc";
  }

  var currentSlideBtnList = document.getElementsByClassName("slideIndicator button currentImg");
  var x;

  // When click span, show corresponding image on screen
  for (x = 0; x < currentSlideBtnList.length; x++) {
    var currentSlideBtn = currentSlideBtnList[x];
    currentSlideBtn.onclick = function() {
      var temp = this.id.substr(3, 1);

      var imgIndex = parseInt(temp);
      index = imgIndex;

      for (i = 0; i < imgSlidelist.length; i++) {
        imgSlidelist[i].style.display = "none";
        imgSlidelist[i].className = "slideImg";
        imgIndiList[i].style.background = "rgba( 255, 255, 255, 0 )";
      }

      imgSlidelist[index].style.display = "block";
      imgIndiList[index].style.background = "#ccc";
    }
  }
  // ImageSlide End

  // Image gallery Start
  // Define localStorage
  if (typeof(Storage) !== "undefined") {
    Storage.prototype.setObj = function(key, obj) {
      return this.setItem(key, JSON.stringify(obj))
    }

    Storage.prototype.getObj = function(key) {
      return JSON.parse(this.getItem(key))
    }

    if (!sessionStorage[0])
      sessionStorage.setObj(0, "block");
    if (!sessionStorage[1])
      sessionStorage.setObj(1, "block");
    if (!sessionStorage[2])
      sessionStorage.setObj(2, "block");
    if (!sessionStorage[3])
      sessionStorage.setObj(3, "block");
    if (!sessionStorage[4])
      sessionStorage.setObj(4, "block");

  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }

  var imageParagraphList = document.getElementsByClassName('ImageParagraph');
  var imageList = document.getElementsByClassName('GalleryImage');
  var galleryList = document.getElementsByClassName('GalleryImageWrapper');

  // Set display value to localStorage value
  for (var x = 0; x < imageList.length; x++) {
    galleryList[x].style.display = sessionStorage[sessionStorage.key(x)];
  }

  // When onmouseover, display show paragraph
  for (var x in imageList) {
    imageList[x].onmouseover = function() {
      var paraIndex = parseInt(this.id);
      imageParagraphList[paraIndex].style.display = "block";
    }
  }

  // When onmouseout, display show paragraph
  for (var x in imageList) {
    imageList[x].onmouseout = function() {
      var paraIndex = parseInt(this.id);
      imageParagraphList[paraIndex].style.display = "none";
    }
  }

  for (var x in imageParagraphList) {
    imageParagraphList[x].onmouseover = function() {
      this.style.display = "block";
    }
  }

  // When button click, delete image
  var imgDelButtonList = document.getElementsByClassName("DeleteButton");
  for (var i in imgDelButtonList) {
    var imgDelBtn = imgDelButtonList[i];

    imgDelBtn.onclick = function() {
      this.parentNode.style.display = "none";
      sessionStorage[sessionStorage.key(parseInt(this.id[9]))] = "none";
    }
  }
  // Image Gallery End

  // modal Start
  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var list = document.getElementsByClassName("GalleryImage");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  var currentIndex;

  // Dislay modal on screen
  for (var x in list) {
    list[x].onclick = function() {
      currentIndex = parseInt(this.id);
      modal.style.display = "block";
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      captionText.innerHTML = this.alt;
    }
  }

  // Get the <span> element that closes the modal
  var close = document.getElementsByClassName("modalButton")[0];
  var left = document.getElementsByClassName("modalButton")[1];
  var right = document.getElementsByClassName('modalButton')[2];

  // When the user clicks on <span> (x), close the modal
  close.onclick = function() {
    modal.style.display = "none";
  }

  // Display left image on modal
  left.onclick = function() {
    var nextIndex = (currentIndex - 1) % list.length;
    if (nextIndex < 0)
      nextIndex = list.length-1;
    while (true) {
      if (galleryList[Math.abs(nextIndex)].style.display === "none")
      {
        nextIndex = (nextIndex - 1) % list.length;
        if (nextIndex < 0)
          nextIndex = list.length-1;
      }
      else
        break;
    }
    modalImg.src = list[Math.abs(nextIndex)].src;
    modalImg.alt = list[Math.abs(nextIndex)].alt;
    captionText.innerHTML = list[Math.abs(nextIndex)].alt;
    currentIndex = nextIndex;
  }

  // Display right image on modal
  right.onclick = function() {
    var nextIndex = (currentIndex + 1) % list.length;
    while (true) {
      if (galleryList[Math.abs(nextIndex)].style.display === "none")
        nextIndex = (nextIndex + 1) % list.length;
      else
        break;
    }
    modalImg.src = list[nextIndex].src;
    modalImg.alt = list[nextIndex].alt;
    captionText.innerHTML = list[nextIndex].alt;
    currentIndex = nextIndex;
  }
  // modal End
}

// hide dropdown_menu
function dropdown_menu_hide() {
  document.getElementById("dropdown_menu").style.display = "none";
}

// show dropdown_menu
function dropdown_menu_show() {
  document.getElementById("dropdown_menu").style.display = "block";
}

// When menu button click, move to area
function menuButtonClick(a) {
  var x = document.getElementById(a);
  x.scrollIntoView(true);
}

// When mouseover, change background-color
function menuMouseOver(obj) {
  var x = obj;
  x.style.background = "#17A590";
}

// When mouseout, change background-color
function menuMouseOut(obj) {
  var x = obj;
  x.style.background = "#3c404c";
}

// When button click, create div
function appendDiv() {
  var wrapper = document.getElementById("Guestbook_contents_wrapper");
  var inputAuthor = document.getElementById("input_author").value;
  var inputContents = document.getElementById("input_contents").value;
  var innerDiv = document.createElement('div');
  var commentButton = document.createElement('button');
  var contentsDiv = document.createElement('div');
  var d = new Date();

  // must input author and contents both
  if (inputAuthor === "" || inputContents === "")
    alert("Must input author and contents");
  else {
    commentButton.innerHTML = "Comment";
    commentButton.onclick = function() { // When click comment button, create div
      var commentDiv = document.createElement('div');
      commentDiv.className = "commentBox";
      var inputString = prompt("Input Comment", "Comment");

      // When comment include url, get meta information of url
      if (inputString.includes("http://") || inputString.includes("https://")) {

        $.ajaxSetup({
          crossOrigin: true,
          dataType: "text/javascript",
          contentType: "application/javascript"
        });


        $.getJSON(inputString, null, function(data) {
          var el = $('<div></div>').html(data);
          var title = el.find('meta[property="og:title"]'); // get meta og title
          var img = el.find('meta[property="og:image"]'); // get meta og img
          var description = el.find('meta[property="og:description"]'); // get meta description
          var url = el.find('meta[property="og:url"]'); // get meta url
          var ogpDiv = document.createElement('div');
          var ogpImg = document.createElement('img');
          var br1 = document.createElement('br');
          var br2 = document.createElement('br');

          // append meta information to commentDiv
          ogpImg.id = "ogpImg";
          if (img[0] == undefined)
            ogpImg.src = "../img/guestbook/imagenotfound.png"
          else
            ogpImg.src = img[0].getAttribute('content');
          ogpDiv.append(ogpImg);
          if (title[0] != undefined)
            ogpDiv.append(title[0].getAttribute('content'));
          ogpDiv.appendChild(br1);
          if (description[0] != undefined)
            ogpDiv.append(description[0].getAttribute('content'));
          ogpDiv.appendChild(br2);
          if (url[0] != undefined)
            ogpDiv.append(url[0].getAttribute('content'));
          commentDiv.appendChild(ogpDiv);

          // When click commentDiv, open page of url
          ogpDiv.onclick = function() {
            window.open(inputString);
          }
        });
      } else {
        commentDiv.append("Comment : " + inputString);
      }
      innerDiv.appendChild(commentDiv);
      this.style.display = "none";
    };

    innerDiv.className = "Guestbook";
    innerDiv.id = "Guestbook_contents";
    contentsDiv.className = "contentsBox";
    innerDiv.appendChild(contentsDiv);

    contentsDiv.append(d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate() +
      " / " + d.getHours() + " : " + d.getMinutes() + " : " + d.getSeconds() +
      " Author : " + inputAuthor + " Contents : " + inputContents);
    innerDiv.appendChild(commentButton);

    wrapper.appendChild(innerDiv);
  }
}
