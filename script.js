var arr = [];
var inputArraySize;
const blue = "#F7ECE1";
const yellow = "#F5F749";
const red = "#D95D39";
const green = "#5BBA6F";
const black = "#1a66ff";

let isSorting = false;

//mint green A2FAA3

//general functions

function removeSpan() {
  var elem = document.getElementById("stopId");
  if (elem != null) elem.parentNode.removeChild(elem);
  else return;
}

function arraySizeHandler() {
  var ArraySize = Number(document.getElementById("arraysize").value);
  if (ArraySize > 100) {
    alert("Array size must be less than 100");
    return -1;
  }
  return ArraySize;
}
function swap(Array, first_Index, second_Index) {
  var temp = Array[first_Index];
  Array[first_Index] = Array[second_Index];
  Array[second_Index] = temp;
}

async function getAnimationSpeed() {
  var speed = Number(document.getElementById("animation_speed").value);
  speed = 1000 - speed;
  return speed;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//make all bars green when soretd then back to the noraml color
async function falshGreen() {
  var bars = Array.from(document.getElementById("addbarshere").children);
  for (var i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = green;
  }
  await sleep(1000);
  for (var i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = blue;
  }
}

async function falshRed() {
  var bars = Array.from(document.getElementById("addbarshere").children);
  for (var i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = red;
  }
  await sleep(1000);
  for (var i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = blue;
  }
}

async function makeGreen(low, high) {
  var bars = Array.from(document.getElementById("addbarshere").children);
  for (var x = low; x < high; x++) {
    bars[x].style.backgroundColor = green;
  }
}

async function resetColor(low, high) {
  var bars = Array.from(document.getElementById("addbarshere").children);
  for (var x = low; x < high; x++) {
    bars[x].style.backgroundColor = blue;
  }
}

//////

function resetArray() {
  var element = document.getElementById("addbarshere");
  var child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function sorted() {
  let arrCopy = [...arr];
  arrCopy.sort(function (a, b) {
    return a - b;
  });

  let ok = 1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != arrCopy[i]) {
      ok = 0;
      return ok;
    }
  }
  return ok;
}

function generateArray() {
  inputArraySize = arraySizeHandler();
  if (inputArraySize == -1) return;
  resetArray();
  arr.length = 0;

  for (var i = 0; i < inputArraySize; ++i) {
    var randomNumber = getRandomInt(200) + 7;
    arr.push(randomNumber);
    var addhere = document.getElementById("addbarshere");
    var newbar = document.createElement("div");
    newbar.className = "bar";
    newbar.style.height = randomNumber + "px";
    addhere.appendChild(newbar);
  }
}
function animationArrayForBinarySearch(Array) {
  var binarySearchAnimations = [];
  var start = 0;
  var end = Number(document.getElementById("arraysize").value);
  end = end - 1;
  var found = 0;
  var x = Number(document.getElementById("searchNumber").value);
  while (start <= end) {
    var mid = Math.floor((start + end) / 2);
    if (Array[mid] === x) {
      binarySearchAnimations.push({
        mid,
        state: "found",
      });
      console.log("match", Array[mid], x);
      found = 1;
      return binarySearchAnimations;
    }
    if (Array[mid] > x) {
      end = mid - 1;
      binarySearchAnimations.push({
        start,
        end,
        state: "searching",
      });
    } else {
      start = mid + 1;
      binarySearchAnimations.push({
        start,
        end,
        state: "searching",
      });
    }
  }
  if (!found) {
    binarySearchAnimations.push({
      start: start,
      end: end,
      state: "not found",
    });
    console.log("no match", x);
  }
  return binarySearchAnimations;
}

async function doBinarySearch() {
  if (isSorting) return;
  if (!sorted()) {
    alert("Array must be sorted\nUse any sorting method then try again");
    return;
  }

  removeSpan();
  var elem = document.getElementById("my-stopwatch");
  var timer = new Stopwatch(elem, { delay: 10 });
  timer.start();

  var animationArray = animationArrayForBinarySearch(arr);
  var previous;
  var bars = Array.from(document.getElementById("addbarshere").children);

  arr.sort((a, b) => a - b);
  bars.sort((a, b) => parseInt(a.style.height) - parseInt(b.style.height));

  for (const element of animationArray) {
    animationspeed = await getAnimationSpeed();

    let animation = element;
    await sleep(animationspeed);
    if (previous) {
      if (previous.state === "searching") {
        if (animation.start === previous.start) {
          if (bars[previous.end])
            bars[previous.end].style.backgroundColor = blue;
        } else if (bars[previous.start])
          bars[previous.start].style.backgroundColor = blue;
      } else {
        if (bars[previous.mid]) bars[previous.mid].style.backgroundColor = blue;
      }
    }
    if (animation.state === "found") {
      bars[previous.start].style.backgroundColor = yellow;
      bars[previous.end].style.backgroundColor = yellow;
      bars[animation.mid].style.backgroundColor = green;
      await sleep(animationspeed);
      bars[previous.start].style.backgroundColor = blue;
      bars[previous.end].style.backgroundColor = blue;
      bars[animation.mid].style.backgroundColor = blue;

      break;
    } else if (animation.state === "searching") {
      if (bars[animation.start])
        bars[animation.start].style.backgroundColor = yellow;
      if (bars[animation.end])
        bars[animation.end].style.backgroundColor = yellow;
      await sleep(animationspeed);
    } else if (animation.state === "not found") {
      if (bars[animation.start])
        bars[animation.start].style.backgroundColor = red;
      if (bars[animation.end]) bars[animation.end].style.backgroundColor = red;
      console.log("not found");
      await sleep(animationspeed);
      if (bars[animation.start])
        bars[animation.start].style.backgroundColor = blue;
      if (bars[animation.end]) bars[animation.end].style.backgroundColor = blue;
      break;
    } else {
      bars[animation.mid].style.backgroundColor = red;
    }
    previous = animation;
  }
  if (Number.isInteger(previous.mid)) {
    await sleep(animationspeed);
    bars[previous.mid].style.backgroundColor = blue;
  }
  timer.stop();
  return;
}

function animationArrayForBasicSort(Array) {
  var basicSortAnimations = [];

  for (var i = 0; i < Array.length; i++) {
    var min = i;
    basicSortAnimations.push({
      min: i,
      state: "min",
    });
    for (var j = i + 1; j < Array.length; j++) {
      basicSortAnimations.push({
        min: min,
        j,
        state: "compare",
      });
      if (Array[min] > Array[j]) {
        basicSortAnimations.push({
          min: j,
          state: "min",
        });
        min = j;
      }
    }
    if (min != i) {
      basicSortAnimations.push({
        min: min,
        i,
        state: "swap",
      });
      var tmp = Array[i];
      Array[i] = Array[min];
      Array[min] = tmp;
    } else if (min == i) {
      basicSortAnimations.push({
        min: i,

        state: "no",
      });
    }
  }
  return basicSortAnimations;
}

async function doBasicSort() {
  if (isSorting) return;
  removeSpan();
  var elem = document.getElementById("my-stopwatch");
  var timer = new Stopwatch(elem, { delay: 10 });
  timer.start();
  var animationArray = animationArrayForBasicSort(arr);
  var previous;
  var bars = Array.from(document.getElementById("addbarshere").children);

  for (var i = 0; i < animationArray.length; ++i) {
    animationspeed = await getAnimationSpeed();

    var animation = animationArray[i];
    await sleep(animationspeed);
    if (previous) {
      if (Number.isInteger(previous.min) && previous.state != "no")
        bars[previous.min].style.backgroundColor = blue;
      if (Number.isInteger(previous.j))
        bars[previous.j].style.backgroundColor = blue;
    }
    previous = animation;
    if (animation.state === "compare") {
      bars[animation.min].style.backgroundColor = black;
      bars[animation.j].style.backgroundColor = yellow;
    } else if (animation.state === "swap") {
      bars[animation.min].style.backgroundColor = red;
      bars[animation.i].style.backgroundColor = red;

      var temp = bars[animation.min].style.height;
      bars[animation.min].style.height = bars[animation.i].style.height;
      bars[animation.i].style.height = temp;
      bars[animation.i].style.backgroundColor = green;
    } else {
      bars[animation.min].style.backgroundColor = green;
    }
  }
  if (previous) {
    if (Number.isInteger(previous.min))
      bars[previous.min].style.backgroundColor = blue;
    if (Number.isInteger(previous.j))
      bars[previous.j].style.backgroundColor = blue;
    if (Number.isInteger(previous.i))
      bars[previous.i].style.backgroundColor = blue;
  }
  timer.stop();
  falshGreen();
}
function animationArrayForLinearSearch(Array) {
  var LinearSearch = [];
  var x = Number(document.getElementById("searchNumber").value);
  console.log(x);
  if (x == null || x == "") {
    return -1;
  }
  var found = false;

  for (var i = 0; i < Array.length; i++) {
    if (Array[i] === x) {
      found = true;
      LinearSearch.push({
        idx: i,
        state: "found",
      });
      break;
    } else {
      LinearSearch.push({
        idx: i,
        state: "searching",
      });
    }
  }
  if (!found) {
    LinearSearch.push({
      idx: Array.length - 1,
      state: "not-found",
    });
  }
  return LinearSearch;
}

async function dolinearSearch() {
  if (isSorting) return;
  isSorting = true;
  var animationArray = animationArrayForLinearSearch(arr);
  if (animationArray == -1) {
    alert("Please enter a number to search for...");
    return;
  }
  removeSpan();
  var elem = document.getElementById("my-stopwatch");
  var timer = new Stopwatch(elem, { delay: 10 });
  timer.start();

  var previous;
  var bars = Array.from(document.getElementById("addbarshere").children);
  let found = 0;
  animationspeed = await getAnimationSpeed();

  for (var i = 0; i < animationArray.length; i++) {
    animationspeed = await getAnimationSpeed();

    var animation = animationArray[i];
    await sleep(animationspeed);
    if (previous) {
      if (Number.isInteger(previous.idx))
        bars[previous.idx].style.backgroundColor = blue;
    }

    previous = animation;
    if (animation.state === "found") {
      bars[animation.idx].style.backgroundColor = green;
      found = 1;
      timer.stop();
      await sleep(2000);
      bars[animation.idx].style.backgroundColor = blue;
      break;
    } else if (animation.state === "searching") {
      bars[animation.idx].style.backgroundColor = yellow;
    }
  }
  if (!found) {
    timer.stop();
    falshRed();
  }
  isSorting = false;
}

async function merge(a, low, m, high) {
  var i, j, k;
  var temp = [];
  var len = m - low;
  var bars = Array.from(document.getElementById("addbarshere").children);

  animationspeed = await getAnimationSpeed();

  for (i = 0; i < len; i++) {
    temp[i] = a[low + i];
  }
  //the current sub array bieng sorted animations
  for (var x = low; x < high; x++) {
    bars[x].style.backgroundColor = red;
  }
  await sleep(animationspeed);
  for (var x = low + 1; x < high; x++) {
    bars[x].style.backgroundColor = blue;
  }
  bars[low].style.backgroundColor = black;
  bars[high - 1].style.backgroundColor = black;
  ///////////
  i = 0;
  j = m;
  k = low;
  while (i < len && j < high) {
    animationspeed = await getAnimationSpeed();

    if (temp[i] <= a[j]) {
      var idx;
      for (var x = k; x < high; x++) {
        animationspeed = await getAnimationSpeed();
        if (bars[x].style.height == temp[i] + "px") {
          idx = x;
          break;
        }
      }

      //the current value bieng compared animations

      if (idx != low && idx != high - 1)
        bars[idx].style.backgroundColor = yellow;
      if (k != low && k != high - 1) bars[k].style.backgroundColor = yellow;

      var temph = bars[k].style.height;
      bars[k].style.height = temp[i] + "px";
      bars[idx].style.height = temph;

      await sleep(animationspeed);

      bars[k].style.backgroundColor = blue;
      bars[idx].style.backgroundColor = blue;

      bars[low].style.backgroundColor = black;
      bars[high - 1].style.backgroundColor = black;
      ///////////
      a[k++] = temp[i++];
    } else {
      //the current value bieng compared animations
      bars[k].style.backgroundColor = yellow;
      bars[j].style.backgroundColor = yellow;

      var temph = bars[k].style.height;
      bars[k].style.height = bars[j].style.height;
      bars[j].style.height = temph;

      await sleep(animationspeed);

      bars[k].style.backgroundColor = blue;
      bars[j].style.backgroundColor = blue;
      bars[low].style.backgroundColor = black;
      bars[high - 1].style.backgroundColor = black;
      ///////////
      a[k++] = a[j++];
    }
  }
  while (i < len) {
    animationspeed = await getAnimationSpeed();
    var index;
    for (var x = low; x < high; x++) {
      animationspeed = await getAnimationSpeed();
      if (bars[x].style.height == temp[i] + "px") {
        index = x;
        break;
      }
    }

    //the remaining values that are left out from the above loop animations
    bars[k].style.backgroundColor = yellow;
    bars[index].style.backgroundColor = yellow;

    var temph = bars[k].style.height;
    bars[k].style.height = temp[i] + "px";
    bars[index].style.height = temph;

    await sleep(animationspeed);

    bars[k].style.backgroundColor = blue;
    bars[index].style.backgroundColor = blue;

    bars[low].style.backgroundColor = black;
    bars[high - 1].style.backgroundColor = black;
    ///////////
    a[k++] = temp[i++];
  }
  bars[low].style.backgroundColor = blue;
  bars[high - 1].style.backgroundColor = blue;

  await makeGreen(low, high);
  await sleep(animationspeed);
  await resetColor(low, high);
}

async function mergesort(a, low, high) {
  if (high - low > 1) {
    var m = Math.round((low + high) / 2);
    await mergesort(a, low, m);
    await mergesort(a, m, high);
    await merge(a, low, m, high);
  }
}

async function doMergeSort() {
  if (isSorting) return;
  isSorting = true;
  removeSpan();
  var elem = document.getElementById("my-stopwatch");
  var timer = new Stopwatch(elem, { delay: 10 });
  timer.start();
  await mergesort(arr, 0, arr.length);
  timer.stop();
  await falshGreen();
  isSorting = false;
}

//bubble sort

async function doBubbleSort() {
  removeSpan();
  var elem = document.getElementById("my-stopwatch");
  var timer = new Stopwatch(elem, { delay: 10 });
  timer.start();
  var bars = Array.from(document.getElementById("addbarshere").children);

  animationspeed = await getAnimationSpeed();

  for (var i = 0; i < arr.length; i++) {
    animationspeed = await getAnimationSpeed();
    for (var j = 0; j < arr.length - i - 1; j++) {
      animationspeed = await getAnimationSpeed();
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        bars[j].style.backgroundColor = yellow;
        bars[j + 1].style.backgroundColor = yellow;

        var temph = bars[j].style.height;
        bars[j].style.height = bars[j + 1].style.height;
        bars[j + 1].style.height = temph;

        await sleep(animationspeed);
        bars[j].style.backgroundColor = blue;
        bars[j + 1].style.backgroundColor = blue;
      } else {
        bars[j].style.backgroundColor = yellow;
        bars[j + 1].style.backgroundColor = yellow;
        await sleep(animationspeed);
        bars[j].style.backgroundColor = blue;
        bars[j + 1].style.backgroundColor = blue;
      }
      if (j + 1 === arr.length - i - 1) {
        bars[j + 1].style.backgroundColor = green;
        if (i === arr.length - 1 - 1) {
          bars[0].style.backgroundColor = green;
        }
      }
    }
  }
  falshGreen();
  timer.stop();
}

//quick sort
// logic code from : https://www.guru99.com/quicksort-in-javascript.html

async function partition(left, right, mid) {
  var bars = Array.from(document.getElementById("addbarshere").children);

  animationspeed = await getAnimationSpeed();
  await sleep(animationspeed);
  var pivot = arr[mid], //middle element
    i = left, //left pointer
    j = right; //right pointer
  let tempJ,
    tempI,
    needed = 0;
  while (i <= j) {
    animationspeed = await getAnimationSpeed();
    bars[mid].style.backgroundColor = black;

    await sleep(animationspeed);
    while (arr[i] < pivot) {
      animationspeed = await getAnimationSpeed();
      await sleep(animationspeed);
      bars[j].style.backgroundColor = yellow;
      bars[i].style.backgroundColor = yellow;
      await sleep(animationspeed);
      bars[i].style.backgroundColor = blue;

      i++;
    }
    await sleep(animationspeed);
    bars[i].style.backgroundColor = blue;
    while (arr[j] > pivot) {
      animationspeed = getAnimationSpeed();
      await sleep(animationspeed);
      bars[i].style.backgroundColor = yellow;
      bars[j].style.backgroundColor = yellow;
      await sleep(animationspeed);
      bars[j].style.backgroundColor = blue;

      j--;
    }
    await sleep(animationspeed);
    bars[j].style.backgroundColor = blue;
    if (i <= j) {
      // if (j == mid || i == mid) {
      //   await sleep(animationspeed);
      //   bars[j].style.backgroundColor = blue;
      //   bars[i].style.backgroundColor = blue;
      //   await sleep(animationspeed);
      //   var temp = arr[i];
      //   arr[i] = arr[j];
      //   arr[j] = temp;
      //   needed = 1;
      //   tempI = i;
      //   tempJ = j;
      //   i++;
      //   j--;
      //   continue;
      // }
      await sleep(animationspeed);
      bars[j].style.backgroundColor = red;
      bars[i].style.backgroundColor = red;
      await sleep(animationspeed);

      var temph = bars[i].style.height;
      bars[i].style.height = bars[j].style.height;
      bars[j].style.height = temph;
      await sleep(animationspeed);
      bars[j].style.backgroundColor = blue;
      bars[i].style.backgroundColor = blue;

      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    }
  }
  // if (needed == 1) {
  //   await sleep(animationspeed);
  //   bars[tempJ].style.backgroundColor = red;
  //   bars[tempI].style.backgroundColor = red;

  //   var temph = bars[tempI].style.height;
  //   bars[tempI].style.height = bars[tempJ].style.height;
  //   bars[tempJ].style.height = temph;
  //   await sleep(animationspeed);
  //   bars[tempJ].style.backgroundColor = blue;
  //   bars[tempI].style.backgroundColor = blue;

  //   var temp = arr[tempJ];
  //   arr[tempI] = arr[tempJ];
  //   arr[tempJ] = temp;
  // }
  await sleep(animationspeed);
  bars[mid].style.backgroundColor = blue;
  return i;
}

async function quickSort(left, right) {
  var bars = Array.from(document.getElementById("addbarshere").children);
  var index;

  if (arr.length > 1) {
    let mid = Math.floor((right + left) / 2);
    console.log(mid);
    index = await partition(left, right, mid); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await quickSort(left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await quickSort(index, right);
    }
    bars[Math.floor((right + left) / 2)].style.backgroundColor = blue;
  }
  return;
}

async function doQuickSort() {
  removeSpan();
  var elem = document.getElementById("my-stopwatch");
  var timer = new Stopwatch(elem, { delay: 10 });
  timer.start();
  await quickSort(0, arr.length - 1);
  timer.stop();
  await falshGreen();
}
