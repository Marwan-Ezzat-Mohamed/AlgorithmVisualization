var arr = [];
var inputArraySize;
const blue = '#F7ECE1';
const yellow = '#F5F749';
const red = '#D95D39';
const green = '#5BBA6F';
const black = '#423E3B';
//mint green A2FAA3

//general functions
function swap(arr, first_Index, second_Index){
  var temp = arr[first_Index];
  arr[first_Index] = arr[second_Index];
  arr[second_Index] = temp;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//make all bars green when soretd then back to the noraml color
async function falshGreen()
{
  var bars = Array.from(document.getElementById('addbarshere').children);
  for(var i=0;i<bars.length;i++)
  {
    bars[i].style.backgroundColor=green;
  }
  await sleep(1000);
  for(var i=0;i<bars.length;i++)
  {
    bars[i].style.backgroundColor=blue;
  }
}

//////

function resetArray() {
  var element = document.getElementById('addbarshere');
  var child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}
function generateArray() {
  resetArray();
  arr.length = 0;

  inputArraySize = Number(document.getElementById('arraysize').value);

  for (var i = 0; i < inputArraySize; ++i) {
    var randomNumber = getRandomInt(99) + 6;
    arr.push(randomNumber);
    var addhere = document.getElementById('addbarshere');
    var newbar = document.createElement('div');
    newbar.className = 'bar';
    newbar.style.height = randomNumber + 'px';
    addhere.appendChild(newbar);
  }
}
function animationArrayForBinarySearch(Array) {
  var binarySearchAnimations = [];
  var start = 0;
  var end = Number(document.getElementById('arraysize').value);
  end = end - 1;
  var found = 0;
  var x = Number(document.getElementById('searchNumber').value);
  while (start <= end) {
    var mid = Math.floor((start + end) / 2);
    if (Array[mid] === x) {
      binarySearchAnimations.push({
        mid,
        state: 'found',
      });
      console.log('match', Array[mid], x);
      found = 1;
      return binarySearchAnimations;
    }
    if (Array[mid] > x) {
      end = mid - 1;
      binarySearchAnimations.push({
        start,
        end,
        state: 'searching',
      });
    } else {
      start = mid + 1;
      binarySearchAnimations.push({
        start,
        end,
        state: 'searching',
      });
    }
  }
  if (!found) {
    binarySearchAnimations.push({
      start: start,
      end: end,
      state: 'not found',
    });
    console.log('no match', x);
  }
  return binarySearchAnimations;
}

async function doBinarySearch() {
  var animationArray = animationArrayForBinarySearch(arr);
  var previous;
  var bars = Array.from(document.getElementById('addbarshere').children);

  arr.sort((a, b) => a - b);
  bars.sort((a, b) => parseInt(a.style.height) - parseInt(b.style.height));

  for (var i = 0; i < animationArray.length; ++i) {
    var animationspeed = Number(
      document.getElementById('animation_speed').value
    );
    animationspeed = 1000 - animationspeed;

    var animation = animationArray[i];
    await sleep(animationspeed);
    if (previous) {
      if (previous.state === 'searching') {
        if (animation.start === previous.start) {
          bars[previous.end].style.backgroundColor = blue;
        } else bars[previous.start].style.backgroundColor = blue;
      } else {
        bars[previous.mid].style.backgroundColor = blue;
      }
    }
    if (animation.state === 'found') {
      bars[previous.start].style.backgroundColor = yellow;
      bars[previous.end].style.backgroundColor = yellow;
      bars[animation.mid].style.backgroundColor = green;
      await sleep(3000);
      bars[previous.start].style.backgroundColor = blue;
      bars[previous.end].style.backgroundColor = blue;
      bars[animation.mid].style.backgroundColor = blue;

      break;
    } else if (animation.state === 'searching') {
      bars[animation.start].style.backgroundColor = yellow;
      bars[animation.end].style.backgroundColor = yellow;
      await sleep(animationspeed);
    } else if (animation.state === 'not found') {
      bars[animation.start].style.backgroundColor = red;
      bars[animation.end].style.backgroundColor = red;
      console.log('not found');
      await sleep(3000);
      bars[animation.start].style.backgroundColor = blue;
      bars[animation.end].style.backgroundColor = blue;
      break;
    } else {
      bars[animation.mid].style.backgroundColor = red;
    }
    previous = animation;
  }
  if (Number.isInteger(previous.mid)) {
    await sleep(3000);
    bars[previous.mid].style.backgroundColor = blue;
  }
  return;
}

function animationArrayForBasicSort(Array) {
  var basicSortAnimations = [];

  for (var i = 0; i < Array.length; i++) {
    var min = i;
    basicSortAnimations.push({
      min: i,
      state: 'min',
    });
    for (var j = i + 1; j < Array.length; j++) {
      basicSortAnimations.push({
        min: min,
        j,
        state: 'compare',
      });
      if (Array[min] > Array[j]) {
        basicSortAnimations.push({
          min: j,
          state: 'min',
        });
        min = j;
      }
    }
    if (min !== i) {
      basicSortAnimations.push({
        min: min,
        i,
        state: 'swap',
      });
      var tmp = Array[i];
      Array[i] = Array[min];
      Array[min] = tmp;
    }
  }
  return basicSortAnimations;
}

async function doBasicSort() {
  var animationArray = animationArrayForBasicSort(arr);
  var previous;
  var bars = Array.from(document.getElementById('addbarshere').children);
  for (var i = 0; i < animationArray.length; ++i) {
    var animationspeed = Number(
      document.getElementById('animation_speed').value
    );
    animationspeed = 1000 - animationspeed;

    var animation = animationArray[i];
    await sleep(animationspeed);
    if (previous) {
      if (Number.isInteger(previous.min))
        bars[previous.min].style.backgroundColor = blue;
      if (Number.isInteger(previous.j))
        bars[previous.j].style.backgroundColor = blue;
      if (Number.isInteger(previous.i))
        bars[previous.i].style.backgroundColor = blue;
    }
    previous = animation;
    if (animation.state === 'compare') {
      bars[animation.min].style.backgroundColor = black;
      bars[animation.j].style.backgroundColor = yellow;
    } else if (animation.state === 'swap') {
      bars[animation.min].style.backgroundColor = red;
      bars[animation.i].style.backgroundColor = red;

      var temp = bars[animation.min].style.height;
      bars[animation.min].style.height = bars[animation.i].style.height;
      bars[animation.i].style.height = temp;
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
  falshGreen();
}
function animationArrayForLinearSearch(Array) {
  var LinearSearch = [];
  var x = Number(document.getElementById('searchNumber').value);
  var found = false;

  for (var i = 0; i < Array.length; i++) {
    if (Array[i] === x) {
      found = true;
      LinearSearch.push({
        idx: i,
        state: 'found',
      });
      break;
    } else {
      LinearSearch.push({
        idx: i,
        state: 'searching',
      });
    }
  }
  if (!found) {
    LinearSearch.push({
      idx: Array.length - 1,
      state: 'not-found',
    });
  }
  return LinearSearch;
}

async function dolinearSearch() {
  var animationArray = animationArrayForLinearSearch(arr);
  var previous;
  var bars = Array.from(document.getElementById('addbarshere').children);

  for (var i = 0; i < animationArray.length; ++i) {
    var animationspeed = Number(
      document.getElementById('animation_speed').value
    );
    animationspeed = 1000 - animationspeed;

    var animation = animationArray[i];
    await sleep(animationspeed);
    if (previous) {
      if (Number.isInteger(previous.idx))
        bars[previous.idx].style.backgroundColor = blue;
    }

    previous = animation;
    if (animation.state === 'found') {
      bars[animation.idx].style.backgroundColor = green;
      await sleep(1000);
      bars[animation.idx].style.backgroundColor = blue;
    } else if (animation.state === 'searching') {
      bars[animation.idx].style.backgroundColor = yellow;
    } else if (animation.state === 'not-found') {
      bars[animation.idx].style.backgroundColor = red;
      await sleep(1000);
      bars[animation.idx].style.backgroundColor = blue;
    }
  }
}

async function merge(a, low, m, high) {
  var i, j, k;
  var temp = [];
  var len = m - low;
  var bars = Array.from(document.getElementById('addbarshere').children);

  var animationspeed = Number(document.getElementById('animation_speed').value);
  animationspeed=1000-animationspeed;
  
  for (i = 0; i < len; i++) {
    temp[i] = a[low + i];
  }

  //the current sub array bieng sorted animations
  for (var x = low; x < high; x++) {                 
    bars[x].style.backgroundColor = red;
  }
  await sleep(animationspeed);
  for (var x = low; x < high; x++) {
    bars[x].style.backgroundColor = blue;
  }
  ///////////
  i = 0;
  j = m;
  k = low;
  while (i < len && j < high) {
    var animationspeed = Number(
      document.getElementById('animation_speed').value
    );
    animationspeed=1000-animationspeed;

    if (temp[i] <= a[j]) {
     var idx;
     for (var x = k; x < high; x++) {
       if (bars[x].style.height == temp[i] + 'px') {
         idx = x;
         break;
        }
        else
        {
          bars[x].style.backgroundColor=yellow;
          await sleep(animationspeed);
          bars[x].style.backgroundColor=blue;
          
        }
      }

      //the current value bieng compared animations
      bars[idx].style.backgroundColor = yellow;
      bars[k].style.backgroundColor = yellow;

      var temph = bars[k].style.height;
      bars[k].style.height = temp[i] + 'px';
      bars[idx].style.height = temph;
      
      await sleep(animationspeed);

      bars[k].style.backgroundColor = blue;
      bars[idx].style.backgroundColor = blue;
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
      ///////////
      a[k++] = a[j++];
    }
  }
  while (i < len) {
    var animationspeed = Number(
      document.getElementById('animation_speed').value
      );
      animationspeed=1000-animationspeed;
      
      var index;
      for (var x = low; x < high; x++) {
        if (bars[x].style.height == temp[i] + 'px') {
          index = x;
          break;
        }
        else
        {
          bars[x].style.backgroundColor=yellow;
          await sleep(animationspeed);
          bars[x].style.backgroundColor=blue;
          
        }
      }
      
    //the remaining values that are left out from the above loop animations
    bars[k].style.backgroundColor = yellow;
    bars[index].style.backgroundColor = yellow;

    var temph = bars[k].style.height;
    bars[k].style.height = temp[i] + 'px';
    bars[index].style.height = temph;

    await sleep(animationspeed);

    bars[k].style.backgroundColor = blue;
    bars[index].style.backgroundColor = blue;
      ///////////
    a[k++] = temp[i++];
  }
}

async function mergesort(a, low, high) {
  if (high - low > 1) {
    var m = low + ((high - low) >> 1);
    await mergesort(a, low, m);
    await mergesort(a, m, high);
    await merge(a, low, m, high);
  }
}

async function doMergeSort()
{
  await mergesort(arr,0,arr.length)
  await falshGreen();
}

//bubble sort



async function doBubbleSort(){
  var bars = Array.from(document.getElementById('addbarshere').children);

  var animationspeed = Number(document.getElementById('animation_speed').value);
  animationspeed=1000-animationspeed;

  for(var i=0;i<arr.length;i++)
  {
    for(var j=0;j<arr.length-i-1;j++)
    {
      if(arr[j]>arr[j+1])
      {
        swap(arr,j,j+1);
        bars[j].style.backgroundColor=yellow;
        bars[j+1].style.backgroundColor=yellow;
        
        var temph = bars[j].style.height;
        bars[j].style.height = bars[j+1].style.height;
        bars[j+1].style.height = temph;

        await sleep(animationspeed);
        bars[j].style.backgroundColor=blue;
        bars[j+1].style.backgroundColor=blue;

      }
      else{
        bars[j].style.backgroundColor=yellow;
        bars[j+1].style.backgroundColor=yellow;
        await sleep(animationspeed);
        bars[j].style.backgroundColor=blue;
        bars[j+1].style.backgroundColor=blue;
      }
      if(j+1===arr.length-i-1)
      {
        bars[j+1].style.backgroundColor=green;
        if(i===arr.length-1-1)
        {
          bars[0].style.backgroundColor=green;
        }
      }
    }
  }
  falshGreen()
}

