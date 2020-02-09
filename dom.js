let leffEl = document.querySelector('#questions .left')
const leftHTML = questions.slice(0, 10)
.map(question => 
`<div> <label class="col-sm-2 col-form-label">${question.number1} ${question.sign} ${question.number2} = </label><div class="col-sm-10"><input/> </div></div>`).join(' ')
leffEl.innerHTML = leftHTML
let rightEl = document.querySelector('#questions .right')
const rightHTML = questions.slice(10, 20).map(question => `<div>${question.number1} ${question.sign} ${question.number2} = <input/> </div>`).join(' ')
rightEl.innerHTML = rightHTML

// 产生单行的数学题
questions = 
`<div class="row no-gutters">
<div class="col-6">
    <div class="text-center question">
        <label for="question${index+1}"><span>${index+1}. </span>${question.number1} ${question.sign} ${question.number1} =</label>                       
        <input class="form-control" id="question${index+1}">                      
    </div>                
</div>
<div class="col-6">                  
    <div class="text-center question">
        <label for="question1"><span>1. </span>1 + 1 =</label>                       
        <input class="form-control" id="question1">                      
    </div>                                    
</div>
</div>`

let submitEl = document.getElementById('submit')
submitEl.onclick = function () {
    let answers = []
    const leftEl = document.querySelectorAll('.left div input')
    leftEl.forEach(input => answers.push(input.value))
    const rightEl = document.querySelectorAll('.right div input')
    rightEl.forEach(input => answers.push(input.value))
    let rightAnswers = checkQuestions(questions, answers)
    document.querySelector('.score').innerText = rightAnswers * 5
}
//刷新时间
setInterval(() => {
    document.querySelector('.time').innerText = +document.querySelector('.time').innerText + 1
}, 1000)
