import React, { Component } from 'react';

/*
    formed list with Table tag and component
*/
class App3 extends Component {
    state = {
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
  
    render() {
        const { boards } = this.state;

        return (
           /*
            5)
              리스트 헤드를 작성.(맨위 대표 행.)          
          */
            <div>
                <table border="1">
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="300">Title</td>
                        <td width="100">Name</td>
                        <td width="100">Date</td>
                    </tr>
                    {

                      /*
                        6)
                          boards에 있는 데이터를 행으로 출력하도록 작성.

                          단, 각 행을 BoardItem 컴퍼넌트 사용해서 출력.!!

                          BoardItem 컴퍼넌트에 row 라는 변수로 boards의 행(row)을 하나씩 지정해서 넘겨줌

                            ㄴBoardItem 컴퍼넌트에서는 row 를 this.props로 받아서 사용.!!! (Board 컴퍼넌트 확인해봐.) 
                            ㄴBoardItm 컴퍼넌트를 사용한 이유는 -> React 의 특징으로 React 에서는 모든 기능을 컴퍼넌트로 구현하여 사용.!!

                          * 컴퍼넌트 자신이 사용 하는 것은 State.
                                     부모로부터 받은 것은 Props.    -> 이 개념만 잘 이해해도 React 의 주요개념 절반을 이해한 것.! *

                          * (1~6)글 리스트 기능을 구현하면서 React 의 컴퍼넌트 개념을 사용.*
                                                            ㄴ 는 기능을 세분화해서 컴퍼넌트로 구현하는 특징 있음.
                                                            ㄴ 는 부모(호출하는) 컴퍼넌트가 자식(호출 받는)컴퍼넌트에 값을 넘겨주고 받는, 방법을 정리.
                      */
                        boards.map(row =>
                            (<BoardItem key={row.brdno} row={row} />)
                        )
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


export default App3;
