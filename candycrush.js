document.addEventListener("DOMContentLoaded", () => {
  let Place = document.querySelector(".place");
  let Colors = [
    "imgs/apple.png",
    "imgs/lemon.png",
    "imgs/neww.png",
    "imgs/orange.png",
    "imgs/qeuey.png",
  ];
  let randomColor = [];
  const width = 8;
  let dragItem;
  let dropItem;
  let score = 0;
  for (let i = 0; i < width * width; i++) {
    let randomitem = Colors[Math.floor(Math.random() * Colors.length)];
    randomColor.push(randomitem);
  }
  function createMap() {
    Place.innerHTML = "";
    randomColor.map((li, index) => {
      let div = document.createElement("img").cloneNode();
      div.setAttribute("data-id", index);
      div.setAttribute("draggable", true);
      div.style.cssText = `
      display: flex;justify-content:center;
      align-items:center
      `;
      document.querySelector(".score").innerText = `score: ${score}`;
      div.src = li;
      div.className = "item";

      div.addEventListener("dragstart", (e) => {
        dragItem = e.target;
      });
      div.addEventListener("drop", (e) => {
        dropItem = e.target;
      });
      div.addEventListener("dragend", (e) => {
        let x = dragItem;
        let dragItemId = parseInt(x.getAttribute("data-id"));
        let x_ = dropItem;
        let dropItemId = parseInt(x_.getAttribute("data-id"));
        randomColor[dragItemId] = dropItem.getAttribute("src");
        randomColor[dropItemId] = dragItem.getAttribute("src");
        let allowableMove = [
          dragItemId - 1,
          dragItemId + 1,
          dragItemId + width,
          dragItemId - width,
          dragItemId + width + 1,
          dragItemId + width - 1,
          dragItemId - width - 1,
          dragItemId - width + 1,
        ];

        if (allowableMove.includes(dropItemId) && checkOfThree() !== 0) {
          let x = setInterval(() => {
            checkOfThree();
            moveToShine();
            fallColor();
            createMap();
            moveToShine();
            fallColor();
            createMap();
            if (checkOfThree() === 0) clearInterval(x);
          }, 100);
        }
      });
      div.addEventListener("dragleave", (e) => {
        e.preventDefault();
      });
      div.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      div.addEventListener("dragenter", (e) => {
        e.preventDefault();
      });

      Place.appendChild(div);
    });
  }

  createMap();
  function moveToShine() {
    for (let i = 0; i < 64 - width; i++) {
      if (randomColor[i + width] === "") {
        randomColor[i + width] = randomColor[i];
        randomColor[i] = "";
      }
    }
  }
  function fallColor() {
    for (let i = 0; i < 48; i++) {
      if (randomColor[i] === "") {
        randomColor[i] =
          randomColor[Math.floor(Math.random() * randomColor.length)];
      }
    }
  }
  function checkOfFour() {
    let blockCheckLeft = [
      5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
      54, 55, 61, 62, 63,
    ];
    let blockCheckRight = [
      0, 1, 2, 8, 9, 10, 16, 17, 18, 24, 25, 26, 32, 33, 34, 40, 41, 42, 48, 49,
      50, 56, 57, 58,
    ];
    let isCheck = 0;
    for (let i = 0; i < 64; i++) {
      let itemsRow = [i, i + 1, i + 2, i + 3];
      let itemsColumn = [i, i + width, i + 2 * width, i + 3 * width];
      if (!blockCheckLeft.includes(i) && i < 39) {
        if (
          itemsRow.every((li) => randomColor[li] === randomColor[i]) &&
          itemsColumn.every((li) => randomColor[i] == randomColor[li])
        ) {
          itemsColumn.map((li) => (randomColor[li] = ""));
          itemsRow.map((li) => (randomColor[li] = ""));
          score += 8;
        }
      } else if (!blockCheckLeft.includes(i)) {
        if (itemsRow.every((li) => randomColor[li] === randomColor[i])) {
          itemsRow.map((li) => (randomColor[li] = ""));
          isCheck++;
          score += 4;
        }
      } else if (i < 39) {
        if (itemsColumn.every((li) => randomColor[i] == randomColor[li])) {
          itemsColumn.map((li) => (randomColor[li] = ""));
          isCheck++;
          score += 4;
        }
      }
    }
    return isCheck;
  }

  function checkOfFive() {
    let blockCheckLeft = [
      4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38,
      39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63,
    ];
    let blockCheckRight = [
      0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18, 19, 24, 25, 26, 27, 32, 33, 34, 35,
      40, 41, 42, 43, 48, 49, 50, 51, 56, 57, 58, 59,
    ];

    for (let i = 0; i < 64; i++) {
      let itemsRow = [i, i + 1, i + 2, i + 3, i + 4];
      let itemsColumn = [
        i,
        i + width,
        i + 2 * width,
        i + 3 * width,
        i + 4 * width,
      ];

      if (!blockCheckLeft.includes(i)) {
        if (itemsRow.every((li) => randomColor[li] === randomColor[i])) {
          itemsRow.map((li) => (randomColor[li] = ""));
          score += 5;
        }
      }

      if (i < 32) {
        if (itemsColumn.every((li) => randomColor[i] == randomColor[li])) {
          itemsColumn.map((li) => (randomColor[li] = ""));
        }
      }
    }
  }

  function checkOfThree() {
    checkOfFive();
    checkOfFour();
    let blockCheckLeft = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
    ];
    let blockCheckRight = [
      0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57,
    ];
    let isCheck = 0;
    for (let i = 0; i < 64; i++) {
      let itemsRow = [i, i + 1, i + 2];
      let itemsColumn = [i, i + width, i + 2 * width];

      if (!blockCheckLeft.includes(i)) {
        if (itemsRow.every((li) => randomColor[li] === randomColor[i])) {
          itemsRow.map((li) => (randomColor[li] = ""));
          isCheck++;
          score += 3;
        }
      }

      if (i <= 47) {
        if (itemsColumn.every((li) => randomColor[i] == randomColor[li])) {
          itemsColumn.map((li) => (randomColor[li] = ""));
          isCheck++;
          score += 3;
        }
      }
    }
    return isCheck;
  }

  let x = setInterval(() => {
    checkOfThree();
    moveToShine();
    fallColor();
    createMap();
    fallColor();
    createMap();
    if (checkOfThree() === 0) {
      clearInterval(x);
    }
  }, 500);
});
