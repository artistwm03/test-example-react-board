import React, { Component } from 'react';
/*
   글쓰기 기능 구현을 위해서는.
   
   HTML 컨트롤과 이벤트가 , React 와 연동되는 방법을 알아야 가능.

   따라서 이 예제에서 이해하기 어려운 부분. !! 제대로 이해하고 넘어가자.!
*/

/*
  15)
    React 의 값을 주고 받는 방식도 중요하지만,
    자식(BoardForm)에서 작성한 값을 부모에게 보내서, 저장하는 구조도 잘 기억해야 함.

              글작성         글리스트   글항목
              BoardFrom  ->  App4  ->  BoardItem

    부모(App4)의 state 에 있는 boards 에 모든값을 저장.!! 따라서 부모에게 사용자가 입력한 값을 전송한다.

    부모의 state 에 값을 저장,
    그 다음 state 변경 생기면,
    state(boards)의 값을 참조하고 있는 다른 놈들(자식 BoardItem)한테 
    값들이 자동으로 보내져야 변경된 내용이 화면에 출력된다.
*/
class App4 extends Component {
    
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
      13)
        호출받은 handleSaveData() 에서는 
                                        setstate 를 이용해서 state 에 있는 boards 배열에 값을 추가.(concat)한다.

        boards 배열에 concat 으로 추가하고
                                        boards 라는 이름으로 저장한다. 이 코드는 웹프라우저에서 오류 발생. 
                                                                      ㄴ setstate 사용 안했기 때문. brdno: this.state.maxNo++ 의 maxNo++ 때문.

        * 수정하면 *
        handleSaveData = (data) => {
        this.setState({
            maxNo: this.state.maxNo+1,
            boards: this.state.boards.concat({ brdno: this.state.maxNo, brddate: new Date(), ...data })
        });
              
            ㄴ 게시물 추가하 듯, maxNo 값을 증가 시키고 나서 maxNo 라는 이름으로 setState함수를 이용하여 저장. *

    }
    */

    /*
      14)
        저장을 하면,
                  brdno(글번호), brddate(작성일자)를 생성.
                                        ㄴ 작성일자 는 JavaScript Date 클래스로 현재 날짜 입력,
                                        ㄴ 글번호   는 state에 추가한 변수 maxNo의 값(maxNo: 3)을 사용. 

        기본적으로 boards 에 데이터 2건 존재. 
        따라서 maxNo 의 값을 3으로 지정,        -> (현재2건 데이터 있으니까 다음글은 3번글이 되므로 저렇게 maxNo을 3으로 만들어 놓음.)
        그 후 글을 추가하면 maxNo가 1 증가(++)한 값, (다음 글번호)을 저장.
    */

    handleSaveData = (data) => {
        this.setState({
            boards: this.state.boards.concat({ brdno: this.state.maxNo++, brddate: new Date(), ...data })
        });
    }
      
    /*
      12)
        값 입력받을 적당한 위치에 BoardForm 컴퍼넌트 생성, HTML 태그처럼 <BoardForm /> 으로 작성.

        파라미터로 handleSaveData() 함수를 onSaveData() 라는 이름으로 넘겨줌.
        이걸 자식 BoardForm 에서 this.props.onSaveData() 로 호출.
    */
    render() {
        const { boards } = this.state;

        return (
            
            <div>
                <BoardForm onSaveData={this.handleSaveData}/>
                <table border="1">
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="300">Title</td>
                        <td width="100">Name</td>
                        <td width="100">Date</td>
                    </tr>
                    {
                        boards.map(function(row){ 
                            return (<BoardItem key={row.brdno} row={row} />);
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

class BoardItem extends React.Component {
    render() {
        return(
            <tr>
                <td>{this.props.row.brdno}</td>
                <td>{this.props.row.brdtitle}</td>
                <td>{this.props.row.brdwriter}</td>
                <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td>
            </tr>
        );
    }
}
/*
  7)
    글을 작성할 공간 BoardForm 컴퍼넌트 생성.

    BoardForm 컴퍼넌트 내에는 
                          ㄴ 글쓰기에 사용할 state 변수도 작성.
                          ㄴ handleChange , handleSubmit 이벤트 핸들러를 작성.
                                                                ㄴ 두 이벤트 핸들러는 "화살표 함수" 로 작성한 상태.
                                                                ㄴ 화살표 함수 안쓰면... 코드 길어짐 (bind 처리)
                          handleChange 이벤트 핸들러
                              ㄴ 사용자가 값 입력할 때 마다(onChange 이벤트)..!! 입력하는 값을 받아서 state 변수에 
                                 각 컨트롤의 이름(brdtitle, brdwriter)으로 저장.!!

                              ㄴ e         는 JavaScript 의 change 이벤트에서 파라미터로 넘어오는 Event를 의미,
                                 e.target 은 현재 이벤트가 발생한 개체(즉, 값을 입력하는 입력상자를 의미.)
                          
                                      두 개의 입력상자가 각 각 brdtitle, brdwriter 로 지정 되어 있음. 
                                      따라서 각 각의 이름으로 변수가 생성되어 사용자가 입력한 값이 저장.
                                          ㄴ <input placeholder="title" name="brdtitle" onChange={this.handleChange}/>
                                             <input placeholder="name" name="brdwriter" onChange={this.handleChange}/>

                                          ㄴ state = { brdtitle: 값블라블라, brdwriter: 값블라 } 이렇게 저장.

                                              ㄴ 값 저장시
                                                      ㄴ"this.state.brdwriter=값블라블라" 혹은 "this.state[brdwriter]=값블라블라"
                                                        이렇게는 저장하지 않는다.

                                                setstate함수 사용. 
                                                      ㄴ this.setState({  [e.target.name]: e.target.value  })                    
                              
                            
*/
class BoardForm extends Component {
    state = {}
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    /*
      10)
        e.preventDefault(); 의미 -> 실제로 서버에 값을 보내는게 아니기 때문에. 저 함수를 사용해서 이벤트 중지.!!

        그 후,  onSaveDate 함수 호출하여 데이터를 저장.!! 
    */

    /*
      11)
        onSaveData() 는 BoardForm 컴퍼넌트에 없고 App4 컴퍼넌트에 존재. ->   <BoardForm onSaveData={this.handleSaveData}/>

        onSaveData() 는 부모한테 파라미터(this.state)를 받음. ->  <BoardForm onSaveData={this.handleSaveData}/>

                          ㄴ 부모한테 받은 것은 값,함수 뭐든 항상 props 를 사용.  ->   this.props.onSaveData(this.state);
                          ㄴ 저장할 값은 state 에 있음. 따라서 함수를 호출하면서 this.state를 넘겨준다. ->  this.props.onSaveData(this.state);
                                                              
    */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSaveData(this.state);
        this.setState({});
    }
    
    render() {
        return (

          /*
            8) <input placeholder="title" name="brdtitle" onChange={this.handleChange}/>

              입력상자 와 handleChange 를 연결 
              연결 시 handleChange 에 this 를 붙여서 사용,
                  ㄴ컴퍼넌트 내의 변수나 함수(이벤트 핸들러)를 참조할 때에는 this 붙여서 사용.
          */

          /*
            9) 
            handleSubmit 은 값을 서버로 전송할 때 발생하는 이벤트 처리를 하기 위한 핸들러.!
                                        ㄴ (=) 값을 저장할 때 (사용자가) 발생.
          */
            <form onSubmit={this.handleSubmit}>
                <input placeholder="title" name="brdtitle" onChange={this.handleChange}/>
                <input placeholder="name" name="brdwriter" onChange={this.handleChange}/>
                <button type="submit">Save</button>
            </form>


        );
    }
}

export default App4;

