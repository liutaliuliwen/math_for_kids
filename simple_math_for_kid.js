(function(){
    //generate random number from m to n not include n
    function generateRandomNumber(m, n){
        return Math.floor(Math.random() * (n - m)) + m
    }


    //generate random boolean
    function generateRandomBoolean(){
        return Math.random() < 0.5
    }


    //1. 生成20道10以内的加减法
    //2. 倒计时5分钟

    function generateArithmeticQuestion(upper){
        let question = {}
        //产生两个随机数
        let number1 = generateRandomNumber(0, upper)
        let number2 = generateRandomNumber(0, upper)
        //答案
        //true 代表 + false 代表 -
        if(generateRandomBoolean()){
            question = {
                number1: number1,
                number2: number2,
                sign: '+',
                answer: number1 + number2
            }
        }else{       
            if(number1 >= number2){
                question = {
                    number1: number1,
                    number2: number2,
                    sign: '-',
                    answer: number1 - number2
                }
                
            }else{
                question = {
                    number1: number2,
                    number2: number1,
                    sign: '-',
                    answer: number2 - number1
                }            
            }
        }
        return question
    }



    // for(let i = 0; i < TOTAL_COUNT_QUESTIONS; i++){
    //     question = generateArithmeticQuestion()
    //     questions.push(question)
    // }



    function generateQuestions(questionsNum, upper) {
        const questions = []
        for(let i = 0; i < questionsNum; i++){        
            question = generateArithmeticQuestion(upper)
            questions.push(question)        
        }
        return questions
    }

    function checkQuestions(questions, answers){
        questions = questions.map((question, index) => ({...question, userAnswer: parseInt(answers[index])}))   
        return questions
        // let rightCount = 0
        // questions.forEach((question,index) => {
        //     if(question.answer === parseInt(answers[index])){
        //         rightCount ++
        //     }        
        // })
        // return rightCount
    }


    function getRightCount(questions){
        return questions.reduce((prev, curr) => prev + (curr.answer === curr.userAnswer ? 1 : 0), 0)
    }


    // 产生单行的数学题 {
        // q1:{
        //   index:1,
        // number1: 10,
        // number2: 4,
        // sign: '-',
        // answer: 6}}
    function generateRowDOM(questionsPair){
        const {q1, q2} = questionsPair
        const domString = 
        `<div class="row no-gutters">
            <div class="offset-2 col-4">
                <div class="question">
                    <label class="label" for="question${q1.index}">${q1.index}. </label>     
                    <div class="expression">
                        <span class="num1">${q1.number1}</span> 
                        <span class="sign">${q1.sign}</span>
                        <span class="num2">${q1.number2}</span>
                        <span class="equal">=</span>
                    </div>                 
                    <input class="form-control answer" id="question${q1.index}">  
                    <span class="check d-none"><img src="./assets/img/check.svg" alt="" width="32" height="32" title="Bootstrap"></span>    
                    <span class="check d-none"><img src="./assets/img/x.svg" alt="" width="32" height="32" title="Bootstrap"></span>                  
                </div>                
            </div>
            <div class="offset-1 col-5">                  
                <div class="question">
                    <label class="label" for="question${q2.index}">${q2.index}. </label>     
                    <div class="expression">
                        <span class="num1">${q2.number1}</span> 
                        <span class="sign">${q2.sign}</span>
                        <span class="num2">${q2.number2}</span>
                        <span class="equal">=</span>
                    </div>             
                    <input class="form-control answer" id="${q2.index}">     
                    <span class="check d-none"><img src="./assets/img/check.svg" alt="" width="32" height="32" title="Bootstrap"></span>    
                    <span class="check d-none"><img src="./assets/img/x.svg" alt="" width="32" height="32" title="Bootstrap"></span>                 
                </div>                                    
            </div>
        </div>`
        return domString
    }

    function arrayToPair(questions){
        return questions.reduce(
            (prev,curr,index) => {
                if(index % 2 == 1){
                    let last = prev.pop()            
                    return prev.concat({...last, q2: {...curr,index: index + 1}})
                }else{            
                    return prev.concat({q1: {...curr,index: index + 1}})
                }
            },[])  
    }

    function generateQuestionsDOM(questions){
        const pairQuestions = arrayToPair(questions)
        return pairQuestions.map(pairQuestion => 
            generateRowDOM(pairQuestion)
        ).join('')
    }


    let AMOUNT_SETTING = 20
    let TIME_SETTING = 0
    let RANGE_SETTING = 10
    //读取设置的初始化的值
    function init(){
        TIME_SETTING = +localStorage.getItem('timeSet') 
        AMOUNT_SETTING = +localStorage.getItem('amountSet') 
        RANGE_SETTING = +localStorage.getItem('rangeSet') 
    }
                 
    init()
    // const TOTAL_COUNT_QUESTIONS = 20
    // const TIME_SETTING = 0
    // const AMOUNT_SETTING = 10
    let questions = generateQuestions(AMOUNT_SETTING,RANGE_SETTING)
    // console.log(questions)
    // console.log(arrayToPair(questions))
    // console.log(generateQuestionsDOM(questions))
    document.querySelector('.questions').innerHTML = generateQuestionsDOM(questions)

    //检查题目是否正确
    let submitEl = document.getElementById('submit')
    submitEl.onclick = function () {
        let answers = []
        const inputEl = document.querySelectorAll('.questions input')
        inputEl.forEach(input => answers.push(input.value))    
        questions = checkQuestions(questions, answers)
        const rightAnswers = getRightCount(questions)
        document.querySelector('.score').innerText = rightAnswers * 5
        answers = questions.map(question => question.answer === question.userAnswer).reduce((prev, curr) => prev.concat(curr, !curr),[])
        const checkers = document.querySelectorAll('.check')
        checkers.forEach((checker,index) => {
            if(answers[index]){
                checker.classList.replace('d-none','d-block')
            }else{
                checker.classList.replace('d-block','d-none')
            }        
        })
    
    }


    //刷新页面
    let resetEl = document.getElementById('reset')
    resetEl.onclick = function() {
        window.location.reload();
    }

    //刷新时间
    setInterval(() => {
        document.querySelector('.time').innerText = +document.querySelector('.time').innerText + 1
    }, 1000)
})()


