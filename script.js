const calculator=document.querySelector(".calculator")
const keys=calculator.querySelector(".keys")
const display=document.querySelector(".display")
// console.log(keys.classList)
keys.addEventListener("click",function(event,ind){
    if(event.target.matches("button")){
        const key=event.target
        const elements=key.dataset.source
        
        const keytext=key.textContent
        const displaytext=display.textContent

        if(!elements){
            if(display.textContent==0  || calculator.dataset.previouskeytype=="operator"){
                display.textContent=keytext
                if(calculator.dataset.previouskeytype=="operator"){
                    Array.from(key.parentNode.children).forEach(function(e){
                        e.classList.remove('is-depressed')
                    })
                }
                calculator.dataset.previouskeytype="number"
            }
            else{
                display.textContent=displaytext+keytext
                calculator.dataset.previouskeytype="number"
            }
        }
        if(elements==="back"){
            if(display.textContent!=0){
                var str=""
                //var z=parseFloat(displaytext)
                for(var i=0;i<(displaytext.length-1);i++){
                    str+=displaytext[i]
                }
                if(str.length>0){
                    display.textContent=str
                }
                else{
                    display.textContent=0
                }
            }
        }
        if(elements==="equals"){
            var secondval=displaytext
            var firstval=calculator.dataset.first
            const operator=calculator.dataset.operator
            if(calculator.dataset.first){
                // calculator.dataset.previouskeytype="equals"
                if(calculator.dataset.previouskeytype=="equals"){
                    firstval=display.textContent
                    secondval=calculator.dataset.modified
                }
                display.textContent=calculate(firstval,secondval,operator)
            }
            calculator.dataset.previouskeytype="equals"
            calculator.dataset.modified=secondval
        }
        if(elements!="clear"){
            const z=document.getElementsByClassName("item")
            z[0].textContent="CE"
        }
        else{
            if(key.textContent=="AC"){
                calculator.dataset.operator=''
                calculator.dataset.previouskeytype=''
                calculator.dataset.modified=''
                calculator.dataset.first=''
            }
            else{
                key.textContent="AC"
            }
            display.textContent=0;
            calculator.dataset.previouskeytype="clear"
        }
        if(elements==="decimal"){
            if(calculator.dataset.previouskeytype==="operator"){
                display.textContent=0
            }
            else if(!displaytext.includes('.')){
                display.textContent=displaytext+"."
            }
            calculator.dataset.previouskeytype="decimal"
        }

        // if(elements==="clear"){
        //     display.textContent=0
        //     calculator.dataset.previouskeytype="clear"
        // }
        
        if(elements==="add" || elements==="subtract" || elements==="divide" || elements==="multiply" || elements=="percent"){
            // if(previouskeytype==operator){

            //     key.classList.add('is-depressed')
            // }
            // else{
            //     Array.from(key.parentNode.children).forEach(function(e){
            //         e.classList.remove('is-depressed')
            //     })
            // }
            //console.log(key)
            const secondval=displaytext
            const firstval=calculator.dataset.first
            const operator=calculator.dataset.operator
            if(operator && firstval  &&  calculator.dataset.previouskeytype!="operator" && calculator.dataset.previouskeytype!="equals"){
                display.textContent=calculate(firstval,secondval,operator)
                //console.log(firstval)
                calculator.dataset.first=display.textContent
            }
            else{
                calculator.dataset.first=displaytext
            }
            key.classList.add('is-depressed')
            calculator.dataset.operator=elements
            calculator.dataset.previouskeytype="operator"
        }
        


        function calculate(n1,n2,opr){
            var res=0
            var m1=parseFloat(n1)
            var m2=parseFloat(n2)
            if(opr=="add") return m1+m2
            if(opr=="subtract") return m1-m2
            if(opr=="divide") return m1/m2
            if(opr=="multiply") return m1*m2
            if(opr=="percent") return m1%m2
            return res
        }
    }

    
})
