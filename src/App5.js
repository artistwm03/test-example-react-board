import React, { Component } from 'react';

/*
  delete & update a Item(Row)
*/
    
/*
  삭제 1 기능은 글 추가하는 것과 같은 원리.!! 

    1) 삭제버튼은 각 항목(BoardItem)에 존재.
    2) 삭제버튼 클릭시 부모에 저장된 boards 에서 해당 글 삭제.
        ㄴ 2-2) 사용자가 선택한 글 번호에 해당하는 글 찾아서 삭제.
        ㄴ 2-3) 배열에서 값을 삭제할 때 filter 사용 하는 것을 권장.
*/

/*
  삭제 2 handleRemove 흐름, 삭제버튼 흐름 순서.

    #1. <td><button onClick={this.handleRemove}>X</button></td>
    #2.  handleRemove = () => {
            const { row, onRemove } = this.props;
            onRemove(row.brdno);
        }  
    #3.  boards.map(row =>
        (<BoardItem key={row.brdno} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow} />) )
    #4. handleRemove = (brdno) => { this.setState({ boards: this.state.boards.filter(row => row.brdno !== brdno) }) }
*/

/*
  수정 1 * 개념은 새글 작성과 동일, 하지만 가장 어려운 부분.!!! 
          삭제 처럼 코드를 글로 정리하기가 어려운 부분.!! 정리 한다고 해도 혼란스러운 부분.!!
          하지만 Redux 에서 좀 더 쉽고 간단하게 구현하니까 이해 안되면 일다 넘어가.
  
  1) 글 항목(행) 중에 하나를 선택.(handleSelectRow)
  2) 선택된 행의 값들을 입력상자에 (BoardForm) 뿌려줌.
  3) 사용자가 값 수정 후 저장 누르면 
      ㄴ 3-2) 글번호 값 있으면 수정,
      ㄴ 3-3) 글번호 값 없으면 신규저장.
  4) handleSelectRow 함수를 중심으로 살펴보기.!! 
*/

class App5 extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }
    
    state = {
        maxNo: 3,
        boards: [
            {
                brdno: 1,
                brdwriter: 'Lee SunSin',
                brdtitle: 'If you intend to live then you die',
                brddate: new Date()
            },
            {
                brdno: 2,
                brdwriter: 'So SiNo',
                brdtitle: 'Founder for two countries',
                brddate: new Date()
            }
        ]
    }
    
    /*
      23)
      onSaveData 에 아래 함수가 들어가니까 아래 함수 보자..

      if구문 보면, 새글이면 위에꺼, 새글이 아니면 아래꺼 코드 실행
      위에코드는 글 작성하는 코드 그거니까 뭐.. 그냥 넘어가고.
      아래코드는 수정해주는코드야.

      data.brdno === row.brdno <<- 글번호가 같은 행을 찾는 방법.

      23번주석이 끝.!!

      App6은 각 컴포넌트를 별도의 파일로 만들어 놓은거. 
      -> 코드의 양이 늘어나면 저렇게 하는게 좋음.
      또 다른 파일에서 가져다쓸수도 있으니까.(import,export)
    */
    handleSaveData = (data) => {
        let boards = this.state.boards;
        if (data.brdno ===null || data.brdno==='' || data.brdno===undefined) {    // new : Insert
            this.setState({
                maxNo: this.state.maxNo+1,
                boards: boards.concat({brdno: this.state.maxNo, brddate: new Date(), ...data })
            });
        } else {                                                        // Update
            this.setState({
                boards: boards.map(row => data.brdno === row.brdno ? {...data }: row)
            })            
        }
    }
    
    handleRemove = (brdno) => {
        this.setState({
            boards: this.state.boards.filter(row => row.brdno !== brdno)
        })
    }
    
   /*
    18)
      하단의 handleSelectRow 실행
   */
    handleSelectRow = (row) => {
         this.child.current.handleSelectRow(row);
    }
    
    render() {
        const { boards } = this.state;

        return (
          /*
            19)
              행선택 -> 인풋창에 선택한 행의 정보 출력 

              입력상자는 BoardForm 에 존재, BoardFoarm 을 App5 컴퍼넌트(부모)가 알고 있어야 됨.
              따라서, 자식(BoardForm)의 핸들러를 App5 이 가지고 있어야 함.

              ref 속성 -> 각 컴포넌트의 핸들을 가지고오는 역할.!! 

              부모는 선택한 행의 데이터를
                    자식(this.child)의 handleSelectRow 를 호출하면서 파라미터로 넘겨준다.! (18번 주석아래 코드.)
          */
            <div>
                <BoardForm onSaveData={this.handleSaveData}  ref={this.child}/>
                <table border="1">
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="300">Title</td>
                        <td width="100">Name</td>
                        <td width="100">Date</td>
                    </tr>
                    {
                        boards.map(row =>
                            (<BoardItem key={row.brdno} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow} />)
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

class BoardItem extends React.Component {
    handleRemove = () => {
        const { row, onRemove } = this.props;
        onRemove(row.brdno);
    }    
    
     /*
      17)
        아래 handleSelectRow 실행. 
        그 다음은 
    */

    handleSelectRow = () => {
        const { row, onSelectRow } = this.props;
        onSelectRow(row);
    }    

    render() {
        console.log(this.props.row.brdno);
        return(
          /* 
            16)
            사용자가 글 항목 들 중에서 하나를 선택하면 하단의 
            가장먼저, <td><a onClick={this.handleSelectRow}>{this.props.row.brdtitle}</a></td>
            저 코드가 실행. 그 다음은 
          */
            <tr>
                <td>{this.props.row.brdno}</td>
                <td><a onClick={this.handleSelectRow}>{this.props.row.brdtitle}</a></td>
                <td>{this.props.row.brdwriter}</td>
                <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td>
                <td><button onClick={this.handleRemove}>X</button></td>
            </tr>
        );
    }
}

class BoardForm extends Component {
    state = {
        brdwriter:'',
        brdtitle:''        
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    

    /*
      20)
        입력폼 (BoardForm) 은 부모로 부터 받은 값을 
        그대로~ state 변수에 넣는다. 아래코드.!! 

        파라미터로 받은 값이 Json 이기 때문에 
        handleSubmit 처럼 변수:값 구조로 지정하지 않고 
            brdno:'',
            brdwriter:'',
            brdtitle:''

        한번에 넣어준다.
          this.setState(row);
    */
    handleSelectRow = (row) => {
        this.setState(row);
    }
    
    /*
      22)
        아래 handleSubmit 은 수정한 내용 저장하고,
        입력칸 초기화 시키는거 하는거야.(사용자가 입력한 값 초기화. 비워주는거.)

        onSaveData 로 넘어가보자..
    */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSaveData(this.state);
        this.setState({
            brdno:'',
            brdwriter:'',
            brdtitle:''
        });
    }
    
    render() {
        return (

          /*
            21)
             그러면 저 state의 변수를 입력상자(입력창)이 바라보고 있어야,
             저 state 를 참고해서 띄어주겠지.?

                <input placeholder="title" name="brdtitle" value={this.state.brdtitle} onChange={this.handleChange}/>
                <input placeholder="name" name="brdwriter" value={this.state.brdwriter} onChange={this.handleChange}/>
            
            위 코드에서 value={this.state.x} 이게 state를 참고해서 값 띄어주는거.
            BoardItem 과 같은 원리라는데
            BoardItem 보고 와..
            값 뿌려주는거 잖아. 배열에 있는거.
                
            이제.. 이제.. 다시 수정해서 저장하는 기능 넘어갈꺼야.......
          */
            <form onSubmit={this.handleSubmit}>
                <input placeholder="title" name="brdtitle" value={this.state.brdtitle} onChange={this.handleChange}/>
                <input placeholder="name" name="brdwriter" value={this.state.brdwriter} onChange={this.handleChange}/>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default App5;

