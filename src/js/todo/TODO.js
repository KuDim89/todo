const removeAll = document.getElementById("footerClear");
const mainList = document.getElementById("mainList");
const footer = document.getElementById("footer");
const allCheckWrap = document.getElementById("allCheckWrap");
const allCheck = document.getElementById("allCheck");
const allElements = document.getElementById("allElements");
const activeElements = document.getElementById("activeElements");
const completedElements = document.getElementById("completedElements");
const arrTodo = JSON.parse(localStorage.todo);
let checkToggle;
let todolist = [];
let isCheckAllBtn;


if (localStorage.getItem('todo') !== null) {
    todolist = JSON.parse(localStorage.getItem('todo'));
    isCheckAllBtn = JSON.parse(localStorage.getItem('allCheck'));

    item();
    addFooter();
    counter();

}

document.getElementById('headerInput').onkeyup = function (event) {
    let inputValue = document.getElementById('headerInput').value.trim();
    if (event.keyCode === 13 && inputValue !== "") {
        let temp = {};
        temp.id = getRandomId();
        temp.todo = inputValue;
        temp.check = false;

        let arrayLength = todolist.length;
        todolist[arrayLength] = temp;
        localStorage.setItem('todo', JSON.stringify(todolist))
        clean();
        item();
        addFooter();
        counter();
        btnClick();


    }
};

function btnClick() {
    const btn = document.querySelectorAll('.close');

    for (let i = 0; i < btn.length; i++) {
        const _button = btn[i];
        _button.addEventListener('click', function (event) {
            const wrapper = _button.parentElement;
            let localTasks = JSON.parse(window.localStorage.getItem('todo'));
            const taskID = Number(wrapper.getAttribute('data-id'));
            const filteredTasks = localTasks.filter(el => el.id !== taskID);
            wrapper.remove();
            todolist = filteredTasks;
            localStorage.setItem('todo', JSON.stringify(filteredTasks));
            counter();
        })
    }

}
btnClick();

function addFooter() {

    if (mainList.childNodes.length > 0) {
        footer.classList.remove("hidden")
    }
}

function clean() {
    document.getElementById("headerInput").value = "";
}


function item() {
    while (mainList.hasChildNodes()) {
        mainList.removeChild(mainList.firstChild);
    }
    allCheck.checked = isCheckAllBtn;
    for (let i = 0; i < todolist.length; i++) {
        const template = `
            <li data-id="${todolist[i].id}">
                <div class="toggle">
                    <label>
                        <input class="toggle-checkbox" type="checkbox" > //checked="${todolist[i].check}
                        <span></span>
                    </label>
                </div>
                <div class="text">${todolist[i].todo}</div>
                <button class="close"></button>
            </li>`;

        mainList.innerHTML += template;
    }

    checkToggle = document.querySelectorAll(".toggle-checkbox");
    for (let [i, element] of checkToggle.entries()) {
        element.checked = todolist[i].check;
        element.addEventListener('change', function (event) {
            element.checked = event.target.checked;
            todolist[i].check = event.target.checked;
            localStorage.setItem('todo', JSON.stringify(todolist));
        });
    }
    localStorage.setItem('todo', JSON.stringify(todolist))
}

function counter() {
    const footerCount = document.getElementById("count");
    const itemCount = mainList.children.length;
    footerCount.innerHTML = itemCount;

    if (itemCount === 0){
        footer.classList.add("hidden");
    }

    if (itemCount >= 2){
        allCheckWrap.classList.remove("hidden");
    }

    if (itemCount < 2){
        allCheckWrap.classList.add("hidden");
    }
}

removeAll.addEventListener('click', function () {
    localStorage.clear();
    footer.classList.add("hidden");
    allCheckWrap.classList.add("hidden");
    while (mainList.firstChild) {
        mainList.removeChild(mainList.firstChild);
    }
    todolist = [];
});

function getRandomId() {
    return (new Date()).getMilliseconds()+Math.floor(Math.random()*1000);
}




// allCheck.addEventListener('click', function (e) {
//     e.stopPropagation();
//     let arrTodo = JSON.parse(localStorage.todo);
//     //debugger;
//
//     if (e.target.checked) {
//         console.log(e.target.checked);
//
//         arrTodo.map((item) => {
//             item.check = true;
//         });
//
//         for (let item of mainList.children) {
//             const currentInput = item.querySelector('input');
//             currentInput.checked = true;
//         }
//
//     } else if (!e.target.checked) {
//         console.log(e.target.checked);
//         arrTodo.map((item) => {
//             item.check = false;
//         });
//
//         for (let item of mainList.children) {
//             const currentInput = item.querySelector('input');
//             currentInput.checked = false;
//
//         }
//
//     }
//     localStorage.setItem('allCheck', JSON.stringify(e.target.checked));
//     localStorage.setItem('todo', JSON.stringify(arrTodo));
//     console.log(arrTodo);
//
// });
// activeElements.addEventListener('click', function () {
//     item();
//     for (let itemActive = 0; itemActive < arrTodo.length; itemActive++) {
//         const currentInput = mainList.children[itemActive].querySelector('input');
//         if(currentInput.checked){
//             currentInput.closest("li").remove();
//         }
//     }
//     counter();
// });
//
// completedElements.addEventListener('click', function () {
//     item();
//     for (let itemCompleted = 0; itemCompleted < arrTodo.length; itemCompleted++) {
//         const currentInput = mainList.children[itemCompleted].querySelector('input');
//
//         if(!currentInput.checked){
//             currentInput.closest("li").remove();
//         }
//     }
//     counter();
// });
//
// allElements.addEventListener('click', function () {
//     item();
//     counter();
// });





