let result = [{a:1,b:2},{a:2,b:1},{a:3,b:0}].reduce(
    (prev,curr,index) => {
        if(index % 2 == 1){
            let last = prev.pop()            
            return prev.concat({...last, p2: {...curr,index}})
        }else{            
            return prev.concat({p1: {...curr,index}})
        }
    },[])

console.log(result)