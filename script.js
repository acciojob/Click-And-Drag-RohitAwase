
const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

cubes.forEach(cube => {
    cube.addEventListener("mousedown", startDrag);
});

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

function startDrag(event) {
    selectedCube = event.currentTarget;

    const cubeRect = selectedCube.getBoundingClientRect();

    offsetX = event.clientX - cubeRect.left;
    offsetY = event.clientY - cubeRect.top;

    // Preserve the cube's current position when dragging begins.
    const containerRect = container.getBoundingClientRect();

    selectedCube.style.position = "absolute";
    selectedCube.style.left =
        `${cubeRect.left - containerRect.left - container.clientLeft}px`;
    selectedCube.style.top =
        `${cubeRect.top - containerRect.top - container.clientTop}px`;

    selectedCube.style.margin = "0";
    selectedCube.classList.add("dragging");

    // Move the selected cube above the other cubes.
    selectedCube.style.zIndex = 10;
}

document.addEventListener("mousemove", dragCube);
document.addEventListener("mouseup", stopDrag);

function dragCube(event) {
    if (!selectedCube) return;

    const containerRect = container.getBoundingClientRect();

    // Mouse position relative to the container's inner border.
    let x = event.clientX - containerRect.left
        - container.clientLeft - offsetX;

    let y = event.clientY - containerRect.top
        - container.clientTop - offsetY;

    // Keep the entire cube inside the container.
    const maxX = container.clientWidth - selectedCube.offsetWidth;
    const maxY = container.clientHeight - selectedCube.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    selectedCube.style.left = `${x}px`;
    selectedCube.style.top = `${y}px`;
}

function stopDrag() {
    if (!selectedCube) return;

    selectedCube.classList.remove("dragging");
    selectedCube.style.zIndex = 1;
    selectedCube = null;
}
