import styles from "./room.module.scss";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import UsersList from "../usersList/usersList";

const Container = styled.div`
  display: flex;
  height: 90%;
  width: 90%;
  margin: 2%;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  margin: 40px 50px;
  height: 35%;
  width: 40%;
`;
/**
 * Start streaming video
 * @param {Object} props - Recive <ForwardRef />, Array(0) 
 * @returns {Object}
 */
const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  return <StyledVideo playsInline autoPlay muted controls ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};
/**
 * Room meeting, space to display video, users list, URL and log out actions.
 * @param {Object} props - Room history, location, match and roomID properties
 * @returns {Object}
 */
function Room(props) {
  const [peers, setPeers] = useState([]);
  const [userNames, setuserNames] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = props.roomID;
  var actualURL = window.location.href;
  const [showUrl, setShowUrl] = useState(true);
  const [showName, setShowName] = useState(true);
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [roomName, setroomName] = useState("ROOM NAME");
  const [userName, setUserName] = useState("");

  let useNameLol = userName;
  let names = [];
  names.push(useNameLol);
  /**
   * Asigned the button with styles.arrow to log out from room
   */
  function logOut() {
    props.history.push("/back-soon");
    window.location.reload(true);
  }
  /**
   * Asigned to x button with styles.close 
   */
  const handleModalClose = () => {
    setShowUrl(false);
  };
  /**
   * Asigned to button with styles.link
   */
  const handleModalOpen = () => {
    setShowUrl(true);
  };
  /**
   * Asigned to Ok! button with id buttonOk
   */
  const handleSecondModalClose = () => {
    socketRef.current.emit("join name", userName);
    setShowName(false);
  };
  /**
   * Asigned to room name input
   * @param {Object} e - Event handler to detect input area.
   */
  const onClickOutSide = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false);
      socketRef.current.emit("set room name", {
        roomID: roomID,
        roomName: roomName,
      });
    }
  };
  /**
   * Deactivate input's room name
   */
  useEffect(() => {
    if (inputVisible) {
      document.addEventListener("mousedown", onClickOutSide);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  });
  /**
   * Socket io actions
   */
  useEffect(() => {
    socketRef.current = io.connect("/");
    /**
     * Turn on audio and video
     */
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.emit("get room name", roomID);
        socketRef.current.on("room name", (roomName) => {
          setroomName(roomName);
        });
        /**
         * Identify userId and add them in a peer
         */
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });
        /**
         * Detected the participants in the peer 
         */
        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });
        /**
         * Back the peer signal
         */
        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
        /**
         * Create uses list names
         */
        socketRef.current.on("get names", (usersName) => {
          setuserNames(usersName);
        });
      });
  }, [roomID]);
  /**
   * Create a Peer
   * @param {String} userToSignal 
   * @param {String} callerID 
   * @param {Object} stream - Active status and Id
   * @returns {String[]}
   */
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }
/**
 * Add a Peer 
 * @param {String} incomingSignal 
 * @param {Object} callerID 
 * @param {String} stream 
 * @returns {String[]}
 */
  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div
      className={[styles.room, showUrl || showName ? styles.modalBG : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.linkPopUp} hidden={!showUrl}>
        <h3 className={styles.permission}>Permissions</h3>
        <div className={styles.close} onClick={handleModalClose}></div>
        <p className={styles.instructions}>
          <mark>Edit the name of the room. As you wish!</mark>
          <br />
          Share the code with your guests.
          <br />
          And your meeting is ready!
        </p>
        <div className={styles.urlContainer}>
          <h3 className={styles.url}>{actualURL}</h3>
          {
            <div
              className={styles.copyIcon}
              onClick={() => navigator.clipboard.writeText(actualURL)}
            ></div>
          }
        </div>
      </div>
      <div className={styles.welcomecontainer} hidden={!showName}>
        <p className={styles.welcomemessage}>
          {" "}
          Welcome!
          <br />
          <span className={styles.enterName}>
            Enter your name o nickname to start!
            <span />
          </span>{" "}
          <br />
          <br />
          <br />
          <br />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Name"
            className={styles.inputNickname}
          ></input>
        </p>
        <button
          id="buttonOk"
          onClick={handleSecondModalClose}
          className={styles.okButton}
        >
          OK!
        </button>
      </div>
      <div className={styles.roomcontainer}>
        <div className={styles.roomname}>
          {inputVisible ? (
            <input
              ref={inputRef}
              value={roomName}
              onChange={(e) => {
                socketRef.current.emit("set room name", {
                  roomID: roomID,
                  roomName: roomName,
                });
                setroomName(e.target.value);
              }}
            />
          ) : (
            <span onClick={() => setInputVisible(true)}>{roomName}</span>
          )}
        </div>
        <div className={styles.logodown}></div>
        <div className={styles.link} onClick={handleModalOpen}></div>
        <div className={styles.arrow} onClick={logOut}></div>
        <UsersList userNames={userNames}/>
        <Container>
          <StyledVideo
            muted
            controls
            autoPlay
            playsInline
            ref={userVideo}
            className={styles.host}
          />
          {peers.map((peer, index) => {
            console.log(peers);
            return (
              <Video
                muted
                controls
                autoPlay
                playsInline
                key={index}
                peer={peer}
              />
            );
          })}
        </Container>
      </div>
    </div>
  );
}

export default Room;