

const number = [0, 1 , 2, 3, 4, 5, 6, 7, 8, 9];
const operation = ['=', '+','-','/','*','AC', '.'];



class App extends React.Component {
    
state = {

    lastPressed:undefined,
    currentNumber: '0',
    preResult: undefined,
    operator: undefined

}


    handleClcik = (e) => {
       const {lastPressed, currentNumber, preResult, operator} = this.state;
        const {innerText} = e.target;

        this.setState({
            lastPressed: innerText
        })

        if(!Number.isNaN(Number(innerText))){
            if (currentNumber === '0'){
                this.setState({
                    currentNumber: innerText,
                   
                }  );
            }else {
            this.setState({
                currentNumber: currentNumber + innerText,
                
            })
        } 
        return ;
        }

       switch(innerText){    
        case 'AC': {

            this.setState({

                currentNumber: '0',
                preResult: undefined,
                operator: undefined
            })
            break
        }
        case '.': {
            if (!currentNumber.includes('.')){
                this.setState({
                    currentNumber: currentNumber + innerText
                })
                
            }break
        }
        default: {

            if(!operator){
                this.setState({
                    operator: innerText,
                    preResult: currentNumber,
                    currentNumber: ''

                });
            } else if (innerText === '='){
                const total = eval(`${preResult} ${operator} ${currentNumber}`);
                this.setState({
                    operator: undefined,
                    preResult: total,
                    currentNumber: total
                })

                } else {
                    const total = eval(`${preResult} ${operator} ${currentNumber}`);

                    this.setState({
                        operator: innerText,
                        preResult: total,
                        currentNumber: total
                    })
                }
            
        }    

      }
  

    }

    render(){
        const {currentNumber, preResult, operator} = this.state;
    return ( 
    <div className="container">
        <p style={{position: 'absolute', top:0}}>{JSON.stringify(this.state, null, 2)}</p>
     <div className="Display">
         <div className="miniDisplay">{preResult} {operator}</div>
         {currentNumber}</div>   
     <div className="number">
     {number.map(numb => (
         <button className="numbers" key={numb} onClick={this.handleClcik}>{numb} </button>
     ) ) }
     </div>
     <div className="inputButton">
     {operation.map(op => (
         <button className="operation" key={op} onClick={this.handleClcik}>{op} </button>
     ) ) }
    </div>

   </div>
)
}
}





ReactDOM.render(<App/>, document.getElementById('app'))
