const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message-box span");
const searchForm = document.querySelector(".search");
const resetSearch = document.querySelector(".reset");


function updateMessage(){
    const taskCount = tasks.children.length;
    messageSpan.textContent = `You have ${taskCount} pending tasks`;
}

updateMessage();

addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = addForm.task.value.trim();

    if (value.length){
        tasks.innerHTML += ` <li>
                        <span>${value}</span>
                        <i class="bi bi-trash-fill delete"></i>
                    </li>`
        addForm.reset();
        updateMessage();
    }
    else{
        addForm.reset();
        updateMessage();
    }
})

tasks.addEventListener("click", event => {
    if (event.target.classList.contains("delete")){
        event.target.parentElement.remove();
    }
    updateMessage();
});

clearAll.addEventListener("click", () => {
    const taskItems = tasks.querySelectorAll("li");
    taskItems.forEach(item => {
        item.remove();
    });
    updateMessage();
})

function filterTask(term){
    const list = Array.from(tasks.children)
    .filter(task =>{
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(element =>{
        element.classList.add("hide");
    });
    
    Array.from(tasks.children)
    .filter(task => {
        return task.textContent.toLowerCase().includes(term);
    })

    .forEach(element => {
        element.classList.remove("hide");
    })

}

searchForm.addEventListener("keyup", event => {
    const term = searchForm.task.value.trim().toLowerCase();
    filterTask(term)
})

resetSearch.addEventListener("click", () => {
    searchForm.reset();
    const term = searchForm.task.value.trim().toLowerCase();
    filterTask(term)
})