const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
const ops = ['/', '*', '-', '+']
const ids = {
  7: 'seven',
  8: 'eight',
  9: 'nine',
  4: 'four',
  5: 'five',
  6: 'six',
  1: 'one',
  2: 'two',
  3: 'three',
  0: 'zero',
  '/': 'divide',
  '*': 'multiply',
  '-': 'subtract',
  '+': 'add'
}


class App extends React.Component {
    
state = {
    lastPressed: undefined,
    preResult: '0',
    operation: undefined
}

          
handleClick = e => {
    const { preResult, lastPressed } = this.state
    const { innerText } = e.target
       
    console.log(innerText)
    
    switch(innerText) {
      case 'AC': {
        this.setState({
          preResult: '0'
        })
        break
      }
      case '=': {
        const evaluated = eval(preResult)
        this.setState({
          preResult: evaluated
        })
        break
      }
      case '.': {
        const splitted = preResult.split(/[\+\-\*\/]/)
        const last = splitted.slice(-1)[0]
        
        if(!last.includes('.')) {
          this.setState({
            preResult: preResult+'.'
          })
        }
        break
      }
        
      default: {
        let e = undefined
        //if input is included in operator 
        if(ops.includes(innerText)) {
            // only if input is -
          if(ops.includes(lastPressed) && innerText !== '-') {
            const lastNumberIdx = preResult.split('').reverse().findIndex(char => char !== ' ' && nums.includes(+char))
            e = preResult.slice(0, preResult.length - lastNumberIdx) + ` ${innerText} `
          } else {
            e = `${preResult} ${innerText} `
          }
        } else {
            e = (preResult === '0') ? innerText : (preResult + innerText)
        }
        
        this.setState({
          preResult: e,
        })
      }
    }
    
    this.setState({
      lastPressed: innerText
    })
  }
   

    render(){
        const {preResult} = this.state;
    return ( 
   
    <div className="container">
        
      <div className="Display" id="display">
        {preResult} 
        </div>   
        <div className="keyboard">
     <div className="number">
     <button className="btn btn-primary ac" onClick={this.handleClick} id="clear">AC</button>
     {nums.map(numb => (
         <button className={`dark-grey ${numb === 0 && 'big-h'}`} key={numb} onClick={this.handleClick} id={ids[numb]}>{numb} </button>
     ) ) }
     <button className="btn btn-success" onClick={this.handleClick} id="equals">=</button>
     </div>
     <div className="inputButton">
     <button className="btn btn-info decimal" onClick={this.handleClick} id="decimal">.</button>
     {ops.map(op => (
         <button className="operation" key={op} onClick={this.handleClick} id={ids[op]}> {op} </button>
     ) ) }
     
    </div>
</div>
   </div>
)
}
}





ReactDOM.render(<App/>, document.getElementById('app'))
