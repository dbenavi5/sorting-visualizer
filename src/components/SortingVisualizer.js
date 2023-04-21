import React, { useState } from "react";
import "./SortingVisualizerStyles.css";

function SortingVisualizer() {
  const [mainArray, setMainArray] = useState([]);

  // generate new array
  function generateArray() {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push(randomIntFromInterval(5, 530));
    }
    setMainArray(arr);
    resetBarColors();
  }

  const resetBarColors = () => {
    const bars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#f50057";
    }
  };

  // sort array
  const sortArray = (sortingFunction) => {
    const sortedArray = sortingFunction(mainArray);
    animateSort(sortedArray);
  };

  // animation
  const animateSort = (sortedArray) => {
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < sortedArray.length; i++) {
      setTimeout(() => {
        const barStyle = arrayBars[i].style;
        barStyle.height = `${sortedArray[i]}px`;
        barStyle.backgroundColor = "blue";
      }, i * 10);
    }
  };

  // merge sort
  const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
  };

  const merge = (left, right) => {
    const result = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  };

  // quick sort
  const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) left.push(arr[i]);
      else right.push(arr[i]);
    }

    return quickSort(left).concat(pivot, quickSort(right));
  };

  // heap sort
  const heapSort = (arr) => {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      heapify(arr, i, 0);
    }
    return arr;
  };

  const heapify = (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
    if (largest !== i) {
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;
      heapify(arr, n, largest);
    }
  };

  // bubble sort
  const bubbleSort = (arr) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };
  return (
    <div className="sorting-visualizer">
      <nav className="navbar">
        <button onClick={generateArray}>Generate New Array</button>
        <button onClick={() => sortArray(mergeSort)}>Merge Sort</button>
        <button onClick={() => sortArray(quickSort)}>Quick Sort</button>
        <button onClick={() => sortArray(heapSort)}>Heap Sort</button>
        <button onClick={() => sortArray(bubbleSort)}>Bubble Sort</button>
      </nav>

      <div className="array-container">
        {mainArray.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          />
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
