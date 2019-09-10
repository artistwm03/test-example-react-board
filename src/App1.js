import React, { Component } from 'react';
/*
  1)
    state 변수를 가장 먼저 선언.!
    state 변수는 게시판 데이터를 배열로 가지는 boards 배열을 구성원(Json)으로 가지고 있다.

    boards 는 brdno(글번호), brdwriter(작성자), brdtitle(글제목), brddate(작성일자) 로 구성되어 있다.
    (아래 코드를 보면 boards는 2개의 데이터가 등록 되어 있다.)
    (데이터베이스 관점에서 보면 4개의 필드, 2개의 행이 있는 것.)
  */
class App1 extends Component {
  state = {
    boards: [
      {
        brdno: 1,
        brdwriter: 'Lee SunSin',
        brdtitle: 'If you intend to live then you die',
        brddate: new Date(),
      },
      {
        brdno: 2,
        brdwriter: 'So SiNo',
        brdtitle: 'Founder for two countries',
        brddate: new Date(),
      },
    ],
  };
  /*
  2)
    위 데이터(state)를 render() 에서 출력.
    
    render() 는 React 에서 화면을 생성하기 위해 실행하는 이벤트.!

    App1 컴퍼넌트에 있는 state을 

    render() 에서 사용하기위해서 this.state로 지정.!

          -> const { boards } = this.state;

              ㄴthis 는 자바스크립트에서 자기자신(Component)를 의미.!
              ㄴthis.state 에 있는 것 중에서 하나를 가지고 올 때 사용하는 것이 대괄호({}) 로 state 에 있는 데이터(boards) 를 boards에 저장.

                    대괄호({})는 state에 변수가 많을 때 사용하는 코드.

                     ㄴ const { boards } = this.state;         (state에 변수가 많을 때.) 
                     ㄴ const   boards   = this.state.boards;  (state에 변수가 하나일 때.)
  */
  render() {
    const { boards } = this.state;

    /*
        3)
          가지고온 데이터(boards)를 map() 메서드를 이용해서
          2개 행의 글번호, 작성자를 묶어서 하나의 문자열(list)로 작성.

          이 값을 화면에 출력 
            -> return (  ... {list} ... );

                                ㄴ 값을 출력할 때 대괄호({})가 사용된 것을 확인 가능.

                                                  ㄴ 대괄호는 JavaScript 에서 함수의 범위가 되기도하고 Json이기도 하지만,

                                                             #1.변수내의 수 많은 변수 중 일부를 빼내서 사용할 때도 사용.
                                                                -> const { boards } = this.state;
                                                            혹은 #2.React 의 문법으로 태그(div) 사이에서 값을 출력할 때에도 사용.

                                                  ㄴ 대괄호는 여러가지 의미로 사용되므로 잘 기억하기.!
        */
    const list = boards.map(function(row) {
      return row.brdno + row.brdwriter;
    });

    return <div>{list}</div>;

    /*
        4)
          결론(정리)
          render() 시작부터 return 이전 코드는 : JavaScript 영역.!!

          return() 내부는 HTML 영역으로 생각할 수 있다.(React 정의라 조금 다름..)
                          ㄴ HTML 영역에서 JavaScript 사용 할 때에는 대괄호({})를 사용한다.

        */
  }
}

export default App1;
