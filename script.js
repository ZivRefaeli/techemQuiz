// Created By: Ziv Refaeli

var table = document.getElementById("table")
var qustionDiv = document.getElementById("qustions")
var qustionContent = document.getElementById("qus_content")
var startBtn = document.getElementById("startBtn")
var clock = document.getElementById("timer")
var scores = [0, 0], time = [0, 0]
var timer = 0, totalQustions = 0
var onTd = false, qustionOpen = false, gameOn = false

var qustions = {
    1: ['למה יהיה שווה a?<br />a = (10 % 3)+5 * 2', 'אם נתון ש a=3, b=6 מה תהיה התוצאה של:<br />(2*a)+(b-a)^2' , 'אם נתון ש a=8, b=5 מה תהיה התוצאה של: (a*b^2)?'],
    2: ['מהו קובץ עם סיומת mp3?', 'מהו IP?', 'כמה Byte יש ב kb אחד?'],
    3: ['בלוח האם של המחשב יש סוללה קטנה, למה היא משמשת?', 'מהו מעבד?', 'המעבדים הנפוצים של אינטל הם']
}

startBtn.addEventListener("click", () => {
    gameOn = true
    startBtn.style.display = "none"
    startGameTimer()
})

let startGameTimer = () => {
    let interTime = setInterval(() => {
        time[0]++
        if (time[0] == 60) {
            time[1]++
            time[0] = 0
        }
        
        if (time[1] < 10)
            clock.innerHTML = `0${time[1]}:`
        else
            clock.innerHTML = time[1] + ":"

        if (time[0] < 10)
            clock.innerHTML += '0' + time[0]
        else
            clock.innerHTML += time[0]

        if (totalQustions == 9){
            clearInterval(interTime)
            alertTimer("סיימתם את כל השאלות!", 1) // done all qustions!
        }
    }, 1000)
}

table.addEventListener("mouseover", (element) => {
    if (gameOn) {
        let onElement = element.path[0]
        if (onElement.nodeName == 'TD' && onElement.info == undefined) {
            onElement.style.background = "rgb(48, 110, 134)"
            onTd = true
        }
    }
})

table.addEventListener("mouseout", (element) => {
    if (gameOn) {
        let onElement = element.path[0]
        if (onElement.nodeName == 'TD' && onElement.info == undefined) {
            onElement.style.background = "lightseagreen"
            onTd = false
        }
    }   
})

table.addEventListener("click", (element) => {
    if (gameOn) {
        let onElement = element.path[0]
        if (onElement.nodeName == 'TD' && onTd && qustionOpen == false) {
            onElement.style.background = "lightseagreen"
            onElement.info = 'done'
            onElement.style.opacity = '0.2'
            onElement.style.cursor = 'initial'

            onTd = false
            qustionOpen = true
            startQustion(onElement.getAttribute("qus").split('|'))
        }
    }
    else alert("לחצו על ✪ כדי להתחיל")
})

let showQustion = (show) => {
    let opacity = 0
    qustionDiv.style.display = 'table'

    if (show)
        qustionDiv.style.opacity = '0'
    else {
        opacity = 10
        qustionDiv.style.opacity = '1'
    }

    let inter = setInterval(() => {
        if (show)
            opacity++
        else
            opacity--
        qustionDiv.style.opacity = `${opacity / 10}`

        if ((opacity == 10 && show) || (opacity == 0 && !show)){
            clearInterval(inter)
            if (!show) 
                qustionDiv.style.display = "none"
        }
    }, 20)
}

let startQustion = (value) => {
    showQustion(true)

    let col = parseInt(value[0]), val = parseInt(value[1][0])
    qustionContent.innerHTML = qustions[col][3 - val] + "<br /><br />"
    qustionContent.innerHTML += "<b id='qusTimer'>00:30</b><br />"

    qustionContent.innerHTML += `<button onclick='addScore(1, ${val * 100})' class='button_score'>קבוצה 1</button>`
    qustionContent.innerHTML += `<button onclick='teko()' class='button_score'>תיקו</button>`
    qustionContent.innerHTML += `<button onclick='addScore(2, ${val * 100})' class='button_score'>קבוצה 2</button>`

    startTimer(30)
}

let addScore = (teamNumber, score) => {
    scores[teamNumber - 1] += score
    document.getElementById(`score${teamNumber}`).innerHTML = scores[teamNumber - 1]

    qustionContent.innerHTML = ""
    qustionDiv.style.display = 'none'
    totalQustions++

    qustionOpen = false
    clearInterval(timer)
    showQustion(false)
}

let startTimer = (time) => {
    // 0 < time < 60
    let timerDiv = document.getElementById("qusTimer")
    timer = setInterval(() => {
        time -= 1

        if (time < 10)
            timerDiv.innerHTML = "00:0" + time
        else
            timerDiv.innerHTML = "00:" + time
        
        if (time <= 10) {
            if (time % 2 == 0)
                timerDiv.style.color = 'red'
            else
                timerDiv.style.color = 'black'
        }

        if (time == 0) {
            clearInterval(timer)
            teko()
        }
    }, 1000)
}

let teko = () => {
    totalQustions++
    qustionOpen = false
    clearInterval(timer)
    showQustion(false)
}

let alertTimer = (text, sec) => {
    let count = 0
    let inter = setInterval(() => {
        count++;
        if (count == sec) {
            clearInterval(inter)
            alert(text)
        }
    }, sec * 1000)
}
