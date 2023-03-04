const show_icon = document.querySelector("#icons");
const loginForm = document.querySelector("#login-form");
const userInput = loginForm.querySelector("#user-input");
const userName = document.querySelector("#user-name");
const pToDo = document.querySelector(".p-todo");
const kakaoUser = document.querySelector("#kakao-user");



const USER_KEY = "username";
const HIDDEN_NAME = "hidden"

// 로그인 구현
function submitLogin(event){
    event.preventDefault();
    const inputValue =userInput.value;
    localStorage.setItem(USER_KEY,inputValue);
    loginForm.classList.add(HIDDEN_NAME);
    paintResult(inputValue);
}

function paintResult(username){
    show_icon.classList.remove(HIDDEN_NAME);
    userName.innerText = `반갑습니다! ${username}님♡`;
    pToDo.classList.remove(HIDDEN_NAME);
    kakaoUser.innerText=`${username}`;
}

const saveduserName = localStorage.getItem(USER_KEY);

if(saveduserName === null){
    loginForm.classList.remove(HIDDEN_NAME);
    loginForm.addEventListener("submit",submitLogin);
}else{
    paintResult(saveduserName);
}


// 배경 랜덤
    const bgImg =["img1.jpg","img2.jpg","img3.jpg"];
    const ranBg = Math.floor(Math.random()*bgImg.length);
    const bg = document.createElement("img");
    const chosenImage = bgImg[ranBg];
    bg.src = `img/${chosenImage}`;
    bg.id="back";
    document.body.appendChild(bg);
// 시간
const days = document.querySelector("h1");
const clockResult = document.querySelector("h2");

function intervalclock(){
    const date = new Date();
    const Hours = String(date.getHours()).padStart(2,"0");
    const Minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");

    const year = date.getFullYear();
    const Month = date.getMonth();
    const dates = date.getDate();
    const day = date.getDay();
    let kday;
    
    switch(day){
        case 0:
            kday="월요일";
        case 1:
            kday="화요일";
        case 2:
            kday="수요일";
        case 3:
            kday="목요일";
        case 4:
            kday="금요일";
        case 5:
            kday="토요일";
        case 6:
            kday="일요일";
    }

    days.innerText = `${year}년 ${Month}월 ${dates}일 ${kday}`
    clockResult.innerText = `${Hours}:${Minutes}:${seconds}`;
}
intervalclock();
setInterval(intervalclock,1000);

// todolist
const clickFolder = document.querySelector("#clickfolder");
const todoContainer = document.querySelector("#todolist");
const exit = document.querySelector("#exit");
let todoList = [];
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form > input");
const todoUl = document.querySelector("ul");
const TODO_KEY = "todos";

// kakao 아이콘 눌렀을 때 todolist 창 생성
function clickTodo(){
    todoContainer.classList.remove(HIDDEN_NAME);
}
// X버튼 눌렀을 때 todolist창 사라짐
function todoExit(){
    todoContainer.classList.add(HIDDEN_NAME);
}
exit.addEventListener("click",todoExit);
clickFolder.addEventListener("click",clickTodo);

// todolist 기능 구현
// todolist localstorage에 저장
function savedToDo(){
    localStorage.setItem(TODO_KEY,JSON.stringify(todoList));
}
// todolist를 ul의 li로 화면에 출력
function paintToDo(newToDo){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const checkbox = document.createElement("input");
    const hr = document.createElement("hr");
    checkbox.type="checkbox";
    li.appendChild(checkbox);
    li.appendChild(span); 
    li.id = newToDo.id;
    span.innerText = newToDo.text;
    todoUl.appendChild(li);
    const button = document.createElement("button");
    button.innerText="X";
    li.appendChild(button);
    li.appendChild(hr);
    button.addEventListener("click",deleteToDo);
}
// input의 값을 서버로 제출했을 때 호출할 함수
function submitToDo(event){
    event.preventDefault();
    const todoValue = todoInput.value;
    todoInput.value = "";
    const newTodoObj = {
        id:Date.now(),
        text:todoValue
    };
    todoList.push(newTodoObj);
    savedToDo();
    paintToDo(newTodoObj);
}
// x버튼을 클릭했을 때 실행할 함수
function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    todoList = todoList.filter(item => item.id != parseInt(li.id));
    savedToDo();
}
const savedToDos = localStorage.getItem(TODO_KEY);
if(savedToDos){
    const parsedToDos =JSON.parse(savedToDos);
    parsedToDos.forEach(paintToDo);
    todoList=parsedToDos;
}

todoForm.addEventListener("submit",submitToDo);

// 날씨
const API_KEY = "b063659cdce817c85b4b1156a6e5922c";
function myweather(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(url).then(Response => Response.json()).then(data=>{
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText=data.name;
        weather.innerText=`${data.weather[0].main}/${data.main.temp}`;
    });
}
function weatherError(){
    const weather = document.querySelector("#weather span:first-child");
    weather.innerText="위치와 날씨를 알 수 없음";
}

navigator.geolocation.getCurrentPosition(myweather,weatherError);

