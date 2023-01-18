import moment from 'moment-timezone'

import React, { useState } from "react";
import styles from '../styles/Dashboard.module.css';

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export default function Loading({
  isReady,
  chats,
  chat,
  messages,
  username,
  createChat
}: {
  isReady: boolean,
  chats: {
    address: string,
    name: string,
    lastMessage: {
      username: string,
      text: string,
      time: number
    } | null
  }[],
  chat: {
    address: string,
    name: string,
    users: string[],
    lastMessage: {
      username: string,
      text: string,
      time: number
    } | null
  } | null,
  messages: {
    username: string,
    text: string,
    time: number
  }[],
  username: string,
  createChat: Function
}) {
  let [state, setState] = useState({
    createChatOpen: false,
    joinChatOpen: false
  });

  function stringToColor(str: string) {
    let hash = 0;
    for (var i = 0; i < str.length; i++)
      hash = str.charCodeAt(i) + ((hash << 5) - hash);

    let color = '#';
    for (var i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }

    return color;
  };
  
  function openCreateChat() {
    return setState({
      ...state,
      createChatOpen: true
    });
  };

  function closeCreateChat(event: React.MouseEvent) {
    event.preventDefault();

    if (event.target == event.currentTarget)
      return setState({
        ...state,
        createChatOpen: false
      });
  };

  function closeCreateChatButton() {
    return setState({
      ...state,
      createChatOpen: false
    });
  };

  function sendCreateChat() {

  };

  function openJoinChat() {
    return setState({
      ...state,
      joinChatOpen: true
    });
  };

  function closeJoinChat(event: React.MouseEvent) {
    event.preventDefault();

    if (event.target == event.currentTarget)
      return setState({
        ...state,
        joinChatOpen: false
      });
  };

  function closeJoinChatButton() {
    return setState({
      ...state,
      joinChatOpen: false
    });
  };

  return isReady ? (
    <div className={styles.allWrapper}>
      { state.createChatOpen ?
        <div onClick={closeCreateChat} className={styles.createChatOuterWrapper} >
          <div className={styles.createChatWrapper} >
            <div className={styles.createChatHeaderWrapper} >
              <span className={styles.createChatHeaderTitle} >Create a New Chat</span>
              <div className={styles.createChatCloseButton} onClick={closeCreateChatButton} >
                <span className={styles.createChatCloseButtonText} >CLOSE</span>
                <svg fill="var(--text-color)" className={styles.createChatCloseButtonIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/>
                </svg>
              </div>
            </div>
            <div className={styles.createChatContentWrapper} >
              <span className={styles.eachInputTitle} >Chat Name</span>
              <span className={styles.eachInputDescription} >You can change the chat name whenever you like from the chat settings.</span>
              <input type="text" className={styles.eachInput} placeholder="Choose the best name for your anonymous chat." />
              <span className={styles.eachInputTitle} >Chat Participants</span>
              <span className={styles.eachInputDescription} >Enter the Mina public key of each participant.</span>
              <textarea className={styles.eachInputLong} placeholder="Seperate the public keys with a space or an enter."></textarea>
              <button className={styles.sendCreateChatButton} >Create Chat</button>
            </div>
          </div>
        </div>
        :
        <div></div>
      }
      { state.joinChatOpen ?
        <div onClick={closeJoinChat} className={styles.joinChatOuterWrapper} >
          <div className={styles.joinChatCloseButton} >
            <span onClick={closeJoinChatButton} className={styles.joinChatCloseButtonText} >CLOSE</span>
            <svg fill="var(--text-color)" className={styles.joinChatCloseButtonIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/>
            </svg>
          </div>
          <div className={styles.joinChatWrapper} >
            <input autoFocus={state.joinChatOpen} className={styles.joinChatInput} type="text" placeholder="Enter the MINA address of the chat." />
            <button className={styles.joinChatSendButton} >JOIN</button>
          </div>
        </div>
        :
        <div></div>
      }
      <div className={styles.navbarWrapper} >
        <div className={styles.navbarHeader} >
          <svg className={styles.navbarHeaderLogo} viewBox="0 0 478 148" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M63.6187 121H3.53037V107.743L45.6066 40.45H17.0034V60.9117H3.53037V26.9769H62.3938V40.45L21.5424 107.599H50.4338V86.9211H63.6187V121ZM150.218 121H132.782L108.142 77.1946L101.945 84.5435V121H87.0315V26.9769H101.945V63.8657L131.197 26.9769H150.362L117.58 65.9551L150.218 121Z" fill="#5AB3AD"/>
            <path d="M223.926 108.175C220.084 112.594 215.424 116.125 209.949 118.767C204.473 121.36 198.349 122.657 191.576 122.657C186.389 122.657 181.802 121.793 177.815 120.063C173.829 118.334 170.586 115.933 168.089 112.859C165.639 109.736 164.006 106.038 163.189 101.763C162.325 97.4882 162.493 92.733 163.694 87.4975C164.799 82.4061 166.6 77.699 169.097 73.3761C171.595 69.0051 174.621 65.2826 178.175 62.2086C181.778 59.0865 185.885 56.6608 190.496 54.9317C195.155 53.1545 200.102 52.2659 205.338 52.2659C207.403 52.2659 209.444 52.5061 211.462 52.9864C213.479 53.4667 215.328 54.2112 217.01 55.2199C218.739 56.1805 220.204 57.3573 221.404 58.7503C222.653 60.0952 223.494 61.7042 223.926 63.5775L225.944 53.851H234.805L229.186 80.725H220.324C220.948 77.747 220.972 75.0332 220.396 72.5835C219.867 70.1339 218.835 68.0205 217.298 66.2433C215.809 64.4661 213.839 63.0972 211.39 62.1365C208.988 61.1278 206.322 60.6235 203.392 60.6235C199.358 60.6235 195.683 61.32 192.369 62.7129C189.103 64.1058 186.197 66.0031 183.651 68.4047C181.153 70.8063 179.04 73.6402 177.311 76.9064C175.63 80.1246 174.381 83.655 173.564 87.4975C172.7 91.3401 172.508 94.8945 172.988 98.1607C173.468 101.379 174.573 104.165 176.302 106.518C178.031 108.872 180.313 110.745 183.147 112.138C186.029 113.531 189.439 114.227 193.378 114.227C198.373 114.227 203.032 113.243 207.355 111.273C211.678 109.304 215.232 106.686 218.018 103.42L223.926 108.175ZM297.779 121H287.908L296.626 79.5722C297.923 73.5682 297.61 68.9091 295.689 65.5948C293.768 62.2806 289.901 60.6235 284.089 60.6235C280.439 60.6235 276.957 61.4641 273.642 63.1452C270.376 64.8263 267.398 67.0838 264.708 69.9177C262.067 72.7036 259.809 75.9218 257.936 79.5722C256.111 83.1746 254.79 86.9452 253.973 90.8838L247.633 121H237.762L257.648 26.9769H267.59L258.296 70.7103C265.645 58.414 275.42 52.2659 287.62 52.2659C304.143 52.2659 310.435 61.368 306.496 79.5722L297.779 121ZM315.505 102.844C316.37 98.617 318.147 95.0866 320.837 92.2527C323.575 89.3708 326.841 87.1133 330.636 85.4802C334.43 83.7991 338.633 82.5982 343.244 81.8778C347.855 81.1092 352.466 80.725 357.077 80.725C358.854 80.725 360.44 80.749 361.832 80.797C363.225 80.8451 364.546 80.9171 365.795 81.0132C367.092 81.1092 368.341 81.2293 369.542 81.3734C370.79 81.5175 372.207 81.6856 373.792 81.8778L374.801 77.0505C375.522 73.7843 375.378 71.0945 374.369 68.9811C373.408 66.8677 372.015 65.2106 370.19 64.0098C368.365 62.7609 366.371 61.8964 364.21 61.416C362.049 60.8877 360.175 60.6235 358.59 60.6235C353.547 60.6235 348.792 61.296 344.325 62.6409C339.858 63.9858 335.559 65.787 331.428 68.0445L328.474 60.6235C333.085 58.1739 338.081 56.1805 343.46 54.6435C348.84 53.0584 354.532 52.2659 360.536 52.2659C364.138 52.2659 367.62 52.7462 370.983 53.7069C374.345 54.6195 377.203 56.0604 379.556 58.0298C381.91 59.9511 383.567 62.4968 384.528 65.6669C385.536 68.837 385.584 72.6316 384.672 77.0505L375.378 121H365.507L367.885 109.76C365.627 111.922 363.225 113.819 360.68 115.452C358.182 117.085 355.636 118.43 353.043 119.487C350.449 120.496 347.855 121.264 345.261 121.793C342.716 122.369 340.362 122.657 338.201 122.657C329.363 122.657 323.022 120.952 319.18 117.542C315.337 114.131 314.112 109.232 315.505 102.844ZM340.002 114.227C344.133 114.227 347.975 113.627 351.53 112.426C355.132 111.177 358.254 109.64 360.896 107.815C363.586 105.99 365.795 104.045 367.524 101.979C369.253 99.9139 370.31 98.0406 370.694 96.3595L371.991 90.0192C368.869 89.5389 365.819 89.2747 362.841 89.2267C359.911 89.1787 357.365 89.1546 355.204 89.1546C351.65 89.1546 348.167 89.3948 344.757 89.8751C341.395 90.3554 338.369 91.148 335.679 92.2527C333.037 93.3094 330.78 94.7024 328.906 96.4315C327.033 98.1607 325.856 100.298 325.376 102.844C324.704 105.678 325.496 108.295 327.754 110.697C330.011 113.051 334.094 114.227 340.002 114.227ZM461.694 99.6016C459.437 106.662 455.474 112.282 449.806 116.461C444.187 120.592 437.774 122.657 430.569 122.657C426.631 122.657 423.172 122.009 420.194 120.712C417.265 119.415 414.887 117.614 413.062 115.308C411.284 113.003 410.084 110.241 409.459 107.023C408.883 103.756 408.979 100.202 409.747 96.3595L417.024 62.2806H401.822L403.551 53.851H418.754L424.517 26.9769H434.388L428.624 53.851H457.299L455.498 62.2806H426.895L419.69 96.3595C419.162 98.8091 419.042 101.115 419.33 103.276C419.666 105.438 420.363 107.335 421.419 108.968C422.524 110.601 423.965 111.898 425.742 112.859C427.567 113.771 429.777 114.227 432.371 114.227C437.27 114.227 441.689 112.714 445.628 109.688C449.566 106.614 452.328 102.652 453.913 97.8004L461.694 99.6016Z" fill="#5AB2AD"/>
          </svg>
          <span className={styles.navbarHeaderMotto} >A truly anonymous chat.</span>
        </div>
        <div className={styles.navbarContent} >
          {chats.map((chat, i) => (
            <div className={styles.eachNavbarItem} key={i} >
              <div className={styles.eachNavbarItemTitleWrapper} >
                <h1 className={styles.eachNavbarItemTitle} >{chat.name}</h1>
                <span className={styles.eachNavbarItemTime} >{chat.lastMessage ?
                    moment(new Date(chat.lastMessage.time)).tz('Europe/London').format('DD[.]MM[.]YYYY') == moment(new Date()).tz('Europe/London').format('DD[.]MM[.]YYYY') ?
                      moment(new Date(chat.lastMessage.time)).tz('Europe/London').format('HH[:]mm')
                      : ((new Date()).getTime() - (new Date(chat.lastMessage.time)).getTime() < ONE_WEEK_IN_MS ?
                        ((new Date()).getTime() - (new Date(chat.lastMessage.time)).getTime() < 2 * ONE_DAY_IN_MS ?
                          'Yesterday'
                          : moment(new Date(chat.lastMessage.time)).tz('Europe/London').format('dddd'))
                        : moment(new Date(chat.lastMessage.time)).tz('Europe/London').format('DD[.]MM[.]YYYY'))
                  : ''}</span>
              </div>
              { chat.lastMessage ? 
                <span className={styles.eachNavbarItemText} >{chat.lastMessage.username}: {chat.lastMessage.text}</span>
                :
                <span className={styles.eachNavbarItemText} ></span>
              }
            </div>
          ))}
        </div>
      </div>
      <div className={styles.contentWrapper} >
        <div className={styles.contentHeaderWrapper} >
          { chat ?
            <div className={styles.chatInfoWrapper} >
              <h1 className={styles.chatName} >{chat.name}</h1>
              <h3 className={styles.chatPeopleCount} >{chat.users.length} anonymous users.</h3>
            </div>
            :
            <div className={styles.chatInfoWrapper} ></div>  
          }
          <div className={styles.contentHeaderButtonsWrapper} >
            <button className={styles.joinChatButton} onClick={openJoinChat} >Join Chat</button>
            <button className={styles.createChatButton} onClick={openCreateChat} >New Chat</button>
          </div>  
        </div>
        <div className={styles.messagesWrapper} >
          <div className={styles.messagesInnerWrapper} >{
          messages.map((message, i) => {
            if (message.username == username) {
              return (
                <div className={styles.eachMessageOuterWrapper} key={i}>
                  { i > 0 && messages[i-1].username != message.username ?
                    <div className={styles.eachMessageGapLong} ></div>
                    :
                    <div className={styles.eachMessageGap} ></div>
                  }
                  <div className={styles.eachMessageWrapperFrom} >
                    <p className={styles.eachMessageTextFrom}>{message.text}</p>
                    <span className={styles.eachMessageTimeFrom}>{
                      moment(new Date(message.time)).tz('Europe/London').format('DD[.]MM[.]YYYY') == moment(new Date()).tz('Europe/London').format('DD[.]MM[.]YYYY') ?
                        moment(new Date(message.time)).tz('Europe/London').format('HH[:]mm')
                        : ((new Date()).getTime() - (new Date(message.time)).getTime() < ONE_WEEK_IN_MS ?
                          ((new Date()).getTime() - (new Date(message.time)).getTime() < 2 * ONE_DAY_IN_MS ?
                            'Yesterday'
                            : moment(new Date(message.time)).tz('Europe/London').format('dddd'))
                          : moment(new Date(message.time)).tz('Europe/London').format('DD[.]MM[.]YYYY'))
                    }</span>
                  </div>
                </div>
              )
            } else {
              return (
                <div className={styles.eachMessageOuterWrapper} key={i}>
                  { i > 0 && messages[i-1].username != message.username ?
                    <div className={styles.eachMessageGapLong} ></div>
                    :
                    <div className={styles.eachMessageGap} ></div>
                  }
                  <div className={styles.eachMessageWrapper} >
                    {i == 0 || messages[i-1].username != message.username ? <span className={styles.eachMessageUsername} style={{color: stringToColor(message.username)}} >{message.username}</span> : <div></div>}
                    <p className={styles.eachMessageText}>{message.text}</p>
                    <span className={styles.eachMessageTime}>{
                      moment(new Date(message.time)).tz('Europe/London').format('DD[.]MM[.]YYYY') == moment(new Date()).tz('Europe/London').format('DD[.]MM[.]YYYY') ?
                        moment(new Date(message.time)).tz('Europe/London').format('HH[:]mm')
                        : ((new Date()).getTime() - (new Date(message.time)).getTime() < ONE_WEEK_IN_MS ?
                          ((new Date()).getTime() - (new Date(message.time)).getTime() < 2 * ONE_DAY_IN_MS ?
                            'Yesterday'
                            : moment(new Date(message.time)).tz('Europe/London').format('dddd'))
                          : moment(new Date(message.time)).tz('Europe/London').format('DD[.]MM[.]YYYY'))
                    }</span>
                  </div>
                </div>
              )
            }
          })
        }</div>
        </div>
        { chat ?
          <div className={styles.sendMessageWrapper} >
            <input type="text" className={styles.sendMessageInput} placeholder="Write your message" />
            <button className={styles.sendMessageButton} >
              <span className={styles.sendMessageButtonText} >Send</span>
              <svg className={styles.sendMessageButtonIcon} fill="var(--text-color)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/>
              </svg>
            </button>
          </div>
          :
          <div></div>
        }
      </div>
    </div>
  ) : (<div></div>);
};
