import { useState, useEffect } from 'react'
import './App.css'
import io from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { checkExistRoom } from './handleAPI/room.js'
import axios from 'axios'
import { joinRoom, startRoom } from './handleAPI/room.js'

const socket = io('http://127.0.0.1:8000')
const _idquiz = "6625d773716ce163b417f911"
const IdRoom = "662697268332cf47c0985c94"
const Idowner = "661e1d89eada152f7cd5c050"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWUxZDg5ZWFkYTE1MmY3Y2Q1YzA1MCIsImlhdCI6MTcxMzc1NTk4OSwiZXhwIjoxNzIxNTMxOTg5fQ.lMt6AhfLA4FvemxwL0PH94oUI6pPptZyRXSCOmH1sAo"
function App() {

  const [nameUser, setName] = useState();
  const [codeRoom, setRoom] = useState();
  const [info, setInfo] = useState(false);
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState([]);
  const [scores, setScores] = useState([]);
  const [seconds, setSeconds] = useState();
  const [data, setData] = useState();
  const [players, setPlayers] = useState([])
  const [checkToken, setCheckToken] = useState(false);
  const [readyRoom, setReadyRoom] = useState();
  const [indexQuestion, setindexQuestion] = useState(0)

  async function handleCheckExistRoom(e) {
    e.preventDefault();
    const roomInfo = await checkExistRoom({ codeRoom })
    if (roomInfo.status == 'success') {
      setData(roomInfo.data.data);
      setReadyRoom(true);
    }
  }

  // ---------join Room
  const submitName = async (e) => {
    e.preventDefault();

    const dataRoom = await joinRoom({ codeRoom, nameUser })

    if (dataRoom) {
      setInfo(true)
      setPlayers(dataRoom.data.data.players);

      socket.emit('joinroom', nameUser, codeRoom)
    }

  }

  const startGame = async () => {
    const game = await startRoom({ _idquiz, IdRoom, Idowner, token })
    if (game.status !== 'success') {
      toast.error(game.message)
      return
    }

    socket.emit('asknewquestion', codeRoom, indexQuestion)
  }



  useEffect(() => {
    socket.on('messagejoined', (message) => {
      toast(`${message} joined`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })

    return () => {
      socket.off('messagejoined');
    }
  }, [])

  useEffect(() => {
    socket.on('newQuestion', (data) => {
      setQuestion(data.text);
      setOptions(data.options);

      console.log(`hien ra ngoài${data._id}`)
    });
  }, [socket])



  return (
    <div className='App'>
      {!readyRoom ?
        <div className='join-div'>
          <h1>QizClash</h1>
          <form >
            <input required placeholder='Enter your room' value={codeRoom} onChange={(e) => setRoom(e.target.value)} />
            <button onClick={handleCheckExistRoom} className='join-btn' type='submit'>Join</button>

          </form>
        </div> :
        (
          <div>
            {!info &&
              <div>
                <h1>{data.quizId.name}</h1>
                <div>
                  <p>
                    <span>{data.owner.name}</span>
                    <br />
                    mỗi câu :
                    <span>{data.quizId.points}</span>
                    <br />
                    trong thời gian
                    <span>{data.quizId.duration}</span>


                  </p>
                </div>
                <div>
                  <form onSubmit={submitName}>
                    <input required placeholder='Enter your name' value={nameUser} onChange={(e) => setName(e.target.value)} />
                    <button className='join-btn' type='submit'>Start</button>
                  </form>
                </div>
              </div>
            }

          </div>
        )
        // (
        //   <div>
        //     <h1>QuizClash</h1>
        //     <p className='room-id'>RoomId: {room}</p>
        //     <ToastContainer/>
        //     {question ? (
        //         <div className='quiz-div'>
        //           Remaning Time: {seconds}

        //           <div className='question'>
        //       <p className='question-text'>
        //           {question}
        //       </p>
        //     </div>
        //     <ul>
        //        {options.map((answer, index) => 
        //        (
        //           <li key={index}>
        //             <button className='selected'>
        //               {answer}

        //               </button>
        //           </li>
        //        ))
        //        }
        //     </ul>

        //     {scores.map((player, index) => {
        //       <p key={index}>{player.name}: {player.score}</p>
        //     })}
        //         </div>
        //     ):
        //     (
        //       <p>Loading question ...</p>
        //     )}

        //   </div>
        // )
      }

      {info &&
        <div>
          <h1>Đã vào phòng</h1>
          <ToastContainer />
          <div className="container">
            <div className="player-list">
              {/* <!-- Sử dụng map để render danh sách players --> */}
              {players.map(player => (
                <div key={player._id} className="player">
                  <p>Name: {player.name}</p>
                  <p>Result: {player.result}</p>
                  {/* <!-- Button kick với _id của player --> */}
                  <button onClick="handleKick('{player._id}')" className="kick-button">Kick</button>
                </div>
              ))}
            </div>
          </div>

          <button onClick={startGame} className='join-btn' type='submit'>startGame</button>
        </div>


      }

      {question &&
        <div className='quiz-div'>
          Remaning Time: {seconds}

          <div className='question'>
            <p className='question-text'>
              {question}
            </p>
          </div>
          <ul>
            {options.map((answer, index) =>
            (
              <li key={index}>
                <button className='selected'>
                  {answer.text}

                </button>
              </li>
            ))
            }
          </ul>

        </div>
      }



    </div>
  )
}

export default App
