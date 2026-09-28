const arrayInput = document.getElementById("arrayInput");
const targetInput = document.getElementById("targetInput");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const nextBtn = document.getElementById("nextBtn");

const error = document.getElementById("error");

const visualizationCard =
    document.getElementById("visualizationCard");

const arrayContainer =
    document.getElementById("arrayContainer");

const status =
    document.getElementById("status");

const lowValue =
    document.getElementById("lowValue");

const midValue =
    document.getElementById("midValue");

const highValue =
    document.getElementById("highValue");

const stepNumber =
    document.getElementById("stepNumber");

const stepMessage =
    document.getElementById("stepMessage");

const resultCard =
    document.getElementById("resultCard");

const resultTitle =
    document.getElementById("resultTitle");

const resultMessage =
    document.getElementById("resultMessage");

const comparisons =
    document.getElementById("comparisons");

const resultIcon =
    document.getElementById("resultIcon");


let numbers = [];

let target = 0;

let low = 0;

let high = 0;

let currentStep = 0;

let comparisonCount = 0;

let searchFinished = false;


/* Start button */

startBtn.addEventListener("click", startSearch);


/* Next step button */

nextBtn.addEventListener("click", performStep);


/* Reset button */

resetBtn.addEventListener("click", reset);


/* Start binary search */

function startSearch() {

    error.textContent = "";

    resultCard.style.display = "none";

    const input = arrayInput.value.trim();

    const targetValue = targetInput.value.trim();


    if (input === "") {

        showError("Please enter an array.");

        return;
    }


    if (targetValue === "") {

        showError("Please enter a target value.");

        return;
    }


    /*
        Convert input into numbers.
    */

    const values = input
        .split(",")
        .map(value => value.trim());


    /*
        Check whether every value is a number.
    */

    if (
        values.some(
            value => value === "" || isNaN(Number(value))
        )
    ) {

        showError(
            "Please enter valid numbers separated by commas."
        );

        return;
    }


    numbers = values.map(Number);


    target = Number(targetValue);


    /*
        Binary search requires a sorted array.
    */

    numbers.sort((a, b) => a - b);


    /*
        Initial values.
    */

    low = 0;

    high = numbers.length - 1;

    currentStep = 0;

    comparisonCount = 0;

    searchFinished = false;


    /*
        Display visualization.
    */

    visualizationCard.style.display = "block";

    nextBtn.style.display = "inline-block";

    resultCard.style.display = "none";


    status.textContent =
        "Ready to begin Binary Search";

    stepNumber.textContent = "0";

    stepMessage.textContent =
        "The array has been sorted. Click Next Step to begin.";

    renderArray();

    updatePointers();

}


/* Perform one binary search step */

function performStep() {

    if (searchFinished) {

        return;
    }


    /*
        Check if search range is empty.
    */

    if (low > high) {

        finishNotFound();

        return;
    }


    currentStep++;

    comparisonCount++;


    /*
        Calculate middle index.
    */

    const mid =
        Math.floor((low + high) / 2);


    /*
        Highlight array.
    */

    renderArray(mid);


    updatePointers(mid);


    stepNumber.textContent =
        currentStep;


    /*
        Compare target and middle value.
    */

    if (numbers[mid] === target) {

        finishFound(mid);

        return;
    }


    if (target < numbers[mid]) {

        stepMessage.innerHTML =
            `<strong>${target}</strong> is smaller than `
            + `<strong>${numbers[mid]}</strong>. `
            + `Search the <strong>LEFT half</strong>.`;

        status.textContent =
            "Target is in the left half";


        high = mid - 1;

    }

    else {

        stepMessage.innerHTML =
            `<strong>${target}</strong> is greater than `
            + `<strong>${numbers[mid]}</strong>. `
            + `Search the <strong>RIGHT half</strong>.`;

        status.textContent =
            "Target is in the right half";


        low = mid + 1;

    }


    /*
        Update pointers for next step.
    */

    setTimeout(() => {

        updatePointers();

    }, 100);

}


/* Render array */

function renderArray(mid = -1, foundIndex = -1) {

    arrayContainer.innerHTML = "";


    numbers.forEach((number, index) => {

        const item =
            document.createElement("div");


        item.classList.add("array-item");


        item.textContent = number;


        /*
            Highlight current search range.
        */

        if (
            index >= low &&
            index <= high
        ) {

            item.classList.add("active");

        }


        /*
            Highlight middle.
        */

        if (index === mid) {

            item.classList.add("mid");

        }


        /*
            Highlight found element.
        */

        if (index === foundIndex) {

            item.classList.remove("active");

            item.classList.remove("mid");

            item.classList.add("found");

        }


        arrayContainer.appendChild(item);

    });

}


/* Update LOW / MID / HIGH */

function updatePointers(mid = -1) {

    if (low >= 0 && low < numbers.length) {

        lowValue.textContent =
            `${numbers[low]} (index ${low})`;

    }

    else {

        lowValue.textContent = "-";

    }


    if (mid >= 0 && mid < numbers.length) {

        midValue.textContent =
            `${numbers[mid]} (index ${mid})`;

    }

    else {

        midValue.textContent = "-";

    }


    if (high >= 0 && high < numbers.length) {

        highValue.textContent =
            `${numbers[high]} (index ${high})`;

    }

    else {

        highValue.textContent = "-";

    }

}


/* Target found */

function finishFound(index) {

    searchFinished = true;


    renderArray(index, index);

    updatePointers(index);


    status.textContent =
        "Target Found!";


    stepMessage.innerHTML =
        `The target <strong>${target}</strong> `
        + `was found at index <strong>${index}</strong>.`;


    nextBtn.style.display = "none";


    resultCard.style.display = "block";


    resultIcon.textContent = "✓";

    resultIcon.style.background = "#dcfce7";

    resultIcon.style.color = "#16a34a";


    resultTitle.textContent =
        "Target Found";


    resultTitle.style.color =
        "#166534";


    resultMessage.textContent =
        `${target} was found at index ${index}.`;


    comparisons.textContent =
        comparisonCount;

}


/* Target not found */

function finishNotFound() {

    searchFinished = true;


    renderArray();


    updatePointers();


    status.textContent =
        "Target Not Found";


    stepMessage.innerHTML =
        `The target <strong>${target}</strong> `
        + `is not present in the array.`;


    nextBtn.style.display = "none";


    resultCard.style.display = "block";


    resultIcon.textContent = "✕";

    resultIcon.style.background = "#fee2e2";

    resultIcon.style.color = "#dc2626";


    resultTitle.textContent =
        "Target Not Found";


    resultTitle.style.color =
        "#b91c1c";


    resultMessage.textContent =
        `${target} does not exist in the given array.`;


    comparisons.textContent =
        comparisonCount;

}


/* Reset */

function reset() {

    arrayInput.value = "";

    targetInput.value = "";

    error.textContent = "";

    visualizationCard.style.display = "none";

    resultCard.style.display = "none";

    nextBtn.style.display = "none";


    numbers = [];

    target = 0;

    low = 0;

    high = 0;

    currentStep = 0;

    comparisonCount = 0;

    searchFinished = false;

}


/* Show error */

function showError(message) {

    error.textContent = message;

    visualizationCard.style.display = "none";

    resultCard.style.display = "none";

}