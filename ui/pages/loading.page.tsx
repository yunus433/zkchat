import React from "react";
import styles from '../styles/Loading.module.css';

export default function Loading({
  isReady
}: {
  isReady: boolean
}) {
  return isReady ? (
    <div className={styles.allWrapper}>
      <svg className={styles.loadingLogo} viewBox="0 0 479 164" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64.6187 121H4.53037V107.743L46.6066 40.45H18.0034V60.9117H4.53037V26.9769H63.3938V40.45L22.5424 107.599H51.4338V86.9211H64.6187V121ZM151.218 121H133.782L109.142 77.1946L102.945 84.5435V121H88.0315V26.9769H102.945V63.8657L132.197 26.9769H151.362L118.58 65.9551L151.218 121Z" fill="#5AB3AD"/>
        <path d="M224.926 108.175C221.084 112.594 216.424 116.125 210.949 118.767C205.473 121.36 199.349 122.657 192.576 122.657C187.389 122.657 182.802 121.793 178.815 120.063C174.829 118.334 171.586 115.933 169.089 112.859C166.639 109.736 165.006 106.038 164.189 101.763C163.325 97.4882 163.493 92.733 164.694 87.4975C165.799 82.4061 167.6 77.699 170.097 73.3761C172.595 69.0051 175.621 65.2826 179.175 62.2086C182.778 59.0865 186.885 56.6608 191.496 54.9317C196.155 53.1545 201.102 52.2659 206.338 52.2659C208.403 52.2659 210.444 52.5061 212.462 52.9864C214.479 53.4667 216.328 54.2112 218.01 55.2199C219.739 56.1805 221.204 57.3573 222.404 58.7503C223.653 60.0952 224.494 61.7042 224.926 63.5775L226.944 53.851H235.805L230.186 80.725H221.324C221.948 77.747 221.972 75.0332 221.396 72.5835C220.867 70.1339 219.835 68.0205 218.298 66.2433C216.809 64.4661 214.839 63.0972 212.39 62.1365C209.988 61.1278 207.322 60.6235 204.392 60.6235C200.358 60.6235 196.683 61.32 193.369 62.7129C190.103 64.1058 187.197 66.0031 184.651 68.4047C182.153 70.8063 180.04 73.6402 178.311 76.9064C176.63 80.1246 175.381 83.655 174.564 87.4975C173.7 91.3401 173.508 94.8945 173.988 98.1607C174.468 101.379 175.573 104.165 177.302 106.518C179.031 108.872 181.313 110.745 184.147 112.138C187.029 113.531 190.439 114.227 194.378 114.227C199.373 114.227 204.032 113.243 208.355 111.273C212.678 109.304 216.232 106.686 219.018 103.42L224.926 108.175ZM298.779 121H288.908L297.626 79.5722C298.923 73.5682 298.61 68.9091 296.689 65.5948C294.768 62.2806 290.901 60.6235 285.089 60.6235C281.439 60.6235 277.957 61.4641 274.642 63.1452C271.376 64.8263 268.398 67.0838 265.708 69.9177C263.067 72.7036 260.809 75.9218 258.936 79.5722C257.111 83.1746 255.79 86.9452 254.973 90.8838L248.633 121H238.762L258.648 26.9769H268.59L259.296 70.7103C266.645 58.414 276.42 52.2659 288.62 52.2659C305.143 52.2659 311.435 61.368 307.496 79.5722L298.779 121ZM316.505 102.844C317.37 98.617 319.147 95.0866 321.837 92.2527C324.575 89.3708 327.841 87.1133 331.636 85.4802C335.43 83.7991 339.633 82.5982 344.244 81.8778C348.855 81.1092 353.466 80.725 358.077 80.725C359.854 80.725 361.44 80.749 362.832 80.797C364.225 80.8451 365.546 80.9171 366.795 81.0132C368.092 81.1092 369.341 81.2293 370.542 81.3734C371.79 81.5175 373.207 81.6856 374.792 81.8778L375.801 77.0505C376.522 73.7843 376.378 71.0945 375.369 68.9811C374.408 66.8677 373.015 65.2106 371.19 64.0098C369.365 62.7609 367.371 61.8964 365.21 61.416C363.049 60.8877 361.175 60.6235 359.59 60.6235C354.547 60.6235 349.792 61.296 345.325 62.6409C340.858 63.9858 336.559 65.787 332.428 68.0445L329.474 60.6235C334.085 58.1739 339.081 56.1805 344.46 54.6435C349.84 53.0584 355.532 52.2659 361.536 52.2659C365.138 52.2659 368.62 52.7462 371.983 53.7069C375.345 54.6195 378.203 56.0604 380.556 58.0298C382.91 59.9511 384.567 62.4968 385.528 65.6669C386.536 68.837 386.584 72.6316 385.672 77.0505L376.378 121H366.507L368.885 109.76C366.627 111.922 364.225 113.819 361.68 115.452C359.182 117.085 356.636 118.43 354.043 119.487C351.449 120.496 348.855 121.264 346.261 121.793C343.716 122.369 341.362 122.657 339.201 122.657C330.363 122.657 324.022 120.952 320.18 117.542C316.337 114.131 315.112 109.232 316.505 102.844ZM341.002 114.227C345.133 114.227 348.975 113.627 352.53 112.426C356.132 111.177 359.254 109.64 361.896 107.815C364.586 105.99 366.795 104.045 368.524 101.979C370.253 99.9139 371.31 98.0406 371.694 96.3595L372.991 90.0192C369.869 89.5389 366.819 89.2747 363.841 89.2267C360.911 89.1787 358.365 89.1546 356.204 89.1546C352.65 89.1546 349.167 89.3948 345.757 89.8751C342.395 90.3554 339.369 91.148 336.679 92.2527C334.037 93.3094 331.78 94.7024 329.906 96.4315C328.033 98.1607 326.856 100.298 326.376 102.844C325.704 105.678 326.496 108.295 328.754 110.697C331.011 113.051 335.094 114.227 341.002 114.227ZM462.694 99.6016C460.437 106.662 456.474 112.282 450.806 116.461C445.187 120.592 438.774 122.657 431.569 122.657C427.631 122.657 424.172 122.009 421.194 120.712C418.265 119.415 415.887 117.614 414.062 115.308C412.284 113.003 411.084 110.241 410.459 107.023C409.883 103.756 409.979 100.202 410.747 96.3595L418.024 62.2806H402.822L404.551 53.851H419.754L425.517 26.9769H435.388L429.624 53.851H458.299L456.498 62.2806H427.895L420.69 96.3595C420.162 98.8091 420.042 101.115 420.33 103.276C420.666 105.438 421.363 107.335 422.419 108.968C423.524 110.601 424.965 111.898 426.742 112.859C428.567 113.771 430.777 114.227 433.371 114.227C438.27 114.227 442.689 112.714 446.628 109.688C450.566 106.614 453.328 102.652 454.913 97.8004L462.694 99.6016Z" fill="#5AB2AD"/>
        <path d="M12.6602 158.697H10.9375L9.49609 154.326H3.44922L2.03125 158.697H0.308594L5.39453 143.404H7.57422L12.6602 158.697ZM9.03906 152.908L6.47266 145.021L3.90625 152.908H9.03906ZM38.2422 155.216C38.1172 156.365 37.6641 157.279 36.8828 157.959C36.1094 158.631 35.1406 158.966 33.9766 158.966C33.3359 158.966 32.75 158.861 32.2188 158.65C31.6875 158.439 31.2344 158.146 30.8594 157.771C30.4844 157.396 30.1914 156.947 29.9805 156.424C29.7773 155.892 29.6758 155.314 29.6758 154.689V149.146H27.2031V147.775H29.6758V143.404H31.2812V147.775H35.9336V149.146H31.2812V154.689C31.2812 155.088 31.3438 155.463 31.4688 155.814C31.6016 156.166 31.7812 156.474 32.0078 156.74C32.2422 157.006 32.5234 157.216 32.8516 157.373C33.1797 157.521 33.5547 157.595 33.9766 157.595C34.7734 157.595 35.4375 157.349 35.9688 156.857C36.5078 156.357 36.8164 155.713 36.8945 154.924L38.2422 155.216ZM50.6289 149.31C50.0508 149.021 49.3633 148.877 48.5664 148.877C47.9102 148.877 47.3242 149.017 46.8086 149.299C46.293 149.58 45.8555 149.951 45.4961 150.412C45.1367 150.865 44.8594 151.388 44.6641 151.982C44.4766 152.568 44.3828 153.174 44.3828 153.799V157.326H46.8555V158.697H40.3047V157.326H42.7773V149.146H40.3047V147.775H44.3828V150.517C45.1172 148.517 46.5117 147.517 48.5664 147.517C49.1211 147.517 49.6016 147.552 50.0078 147.623C50.4219 147.693 50.8047 147.818 51.1562 147.998L50.6289 149.31ZM53.9805 147.775H55.5859V154.525C55.5859 155.502 55.7969 156.259 56.2188 156.799C56.6484 157.33 57.3359 157.595 58.2812 157.595C58.875 157.595 59.4102 157.459 59.8867 157.185C60.3633 156.912 60.7695 156.549 61.1055 156.095C61.4414 155.634 61.6953 155.111 61.8672 154.525C62.0469 153.931 62.1367 153.314 62.1367 152.674V147.775H63.7539V158.697H62.1367V155.966C61.3711 157.966 59.9961 158.966 58.0117 158.966C55.3242 158.966 53.9805 157.486 53.9805 154.525V147.775ZM75.2383 158.697H68.6875V157.326H71.1602V144.775H68.6875V143.404H72.7773V157.326H75.2383V158.697ZM90.8711 147.775L84.9648 161.463C84.6602 162.228 84.2305 162.728 83.6758 162.963C83.1211 163.205 82.5078 163.326 81.8359 163.326C81.0859 163.326 80.3359 163.189 79.5859 162.916L79.9023 161.533C80.2695 161.689 80.6289 161.799 80.9805 161.861C81.332 161.931 81.6172 161.966 81.8359 161.966C82.3672 161.966 82.7305 161.838 82.9258 161.58C83.1289 161.322 83.3047 161.017 83.4531 160.666L84.1211 159.013L79.2461 147.775H81.1445L85.082 157.326L88.9492 147.775H90.8711ZM105.789 155.744C105.789 155.056 105.961 154.482 106.305 154.021C106.648 153.552 107.098 153.185 107.652 152.92C108.215 152.646 108.855 152.451 109.574 152.334C110.301 152.209 111.039 152.146 111.789 152.146C112.078 152.146 112.336 152.15 112.562 152.158C112.797 152.166 113.016 152.177 113.219 152.193C113.43 152.209 113.641 152.228 113.852 152.252C114.062 152.275 114.293 152.302 114.543 152.334V151.549C114.543 151.017 114.426 150.58 114.191 150.236C113.965 149.892 113.684 149.623 113.348 149.427C113.012 149.224 112.66 149.084 112.293 149.006C111.926 148.92 111.613 148.877 111.355 148.877C110.543 148.877 109.793 148.986 109.105 149.205C108.418 149.424 107.777 149.716 107.184 150.084L106.457 148.877C107.113 148.478 107.848 148.154 108.66 147.904C109.48 147.646 110.379 147.517 111.355 147.517C111.949 147.517 112.531 147.595 113.102 147.752C113.68 147.9 114.195 148.134 114.648 148.455C115.109 148.767 115.477 149.181 115.75 149.697C116.023 150.213 116.16 150.83 116.16 151.549V158.697H114.543V156.869C114.262 157.22 113.941 157.529 113.582 157.795C113.23 158.06 112.859 158.279 112.469 158.451C112.078 158.615 111.688 158.74 111.297 158.826C110.906 158.92 110.535 158.966 110.184 158.966C108.738 158.966 107.645 158.689 106.902 158.134C106.16 157.58 105.789 156.783 105.789 155.744ZM110.184 157.595C110.855 157.595 111.457 157.498 111.988 157.302C112.527 157.099 112.984 156.849 113.359 156.552C113.734 156.256 114.023 155.939 114.227 155.603C114.438 155.267 114.543 154.963 114.543 154.689V153.658C114.02 153.58 113.516 153.537 113.031 153.529C112.555 153.521 112.141 153.517 111.789 153.517C111.211 153.517 110.652 153.556 110.113 153.634C109.582 153.713 109.117 153.841 108.719 154.021C108.32 154.193 108 154.42 107.758 154.701C107.516 154.982 107.395 155.33 107.395 155.744C107.395 156.205 107.617 156.631 108.062 157.021C108.516 157.404 109.223 157.595 110.184 157.595ZM129.262 158.697H127.645V151.959C127.645 150.982 127.434 150.224 127.012 149.685C126.59 149.146 125.906 148.877 124.961 148.877C124.367 148.877 123.828 149.013 123.344 149.287C122.867 149.56 122.461 149.927 122.125 150.388C121.789 150.841 121.531 151.365 121.352 151.959C121.18 152.545 121.094 153.158 121.094 153.799V158.697H119.488V147.775H121.094V150.517C121.867 148.517 123.246 147.517 125.23 147.517C127.918 147.517 129.262 148.998 129.262 151.959V158.697ZM143.219 153.271C143.219 154.123 143.082 154.896 142.809 155.591C142.543 156.287 142.156 156.884 141.648 157.384C141.148 157.877 140.547 158.263 139.844 158.545C139.141 158.826 138.355 158.966 137.488 158.966C136.637 158.966 135.859 158.826 135.156 158.545C134.453 158.263 133.848 157.877 133.34 157.384C132.84 156.884 132.453 156.287 132.18 155.591C131.914 154.896 131.781 154.123 131.781 153.271C131.781 152.443 131.914 151.674 132.18 150.963C132.453 150.244 132.84 149.634 133.34 149.134C133.848 148.627 134.453 148.232 135.156 147.951C135.859 147.662 136.637 147.517 137.488 147.517C138.355 147.517 139.141 147.662 139.844 147.951C140.547 148.232 141.148 148.627 141.648 149.134C142.156 149.634 142.543 150.244 142.809 150.963C143.082 151.674 143.219 152.443 143.219 153.271ZM141.613 153.271C141.613 152.646 141.52 152.072 141.332 151.549C141.152 151.017 140.883 150.552 140.523 150.154C140.164 149.756 139.727 149.443 139.211 149.216C138.703 148.99 138.129 148.877 137.488 148.877C136.848 148.877 136.27 148.99 135.754 149.216C135.246 149.443 134.816 149.756 134.465 150.154C134.113 150.552 133.844 151.017 133.656 151.549C133.477 152.072 133.387 152.646 133.387 153.271C133.387 153.896 133.477 154.474 133.656 155.006C133.844 155.529 134.113 155.982 134.465 156.365C134.816 156.748 135.246 157.049 135.754 157.267C136.27 157.486 136.848 157.595 137.488 157.595C138.129 157.595 138.703 157.486 139.211 157.267C139.727 157.049 140.164 156.748 140.523 156.365C140.883 155.982 141.152 155.529 141.332 155.006C141.52 154.474 141.613 153.896 141.613 153.271ZM155.465 158.697H153.848V151.959C153.848 150.982 153.637 150.224 153.215 149.685C152.793 149.146 152.109 148.877 151.164 148.877C150.57 148.877 150.031 149.013 149.547 149.287C149.07 149.56 148.664 149.927 148.328 150.388C147.992 150.841 147.734 151.365 147.555 151.959C147.383 152.545 147.297 153.158 147.297 153.799V158.697H145.691V147.775H147.297V150.517C148.07 148.517 149.449 147.517 151.434 147.517C154.121 147.517 155.465 148.998 155.465 151.959V158.697ZM169.48 147.775L163.574 161.463C163.27 162.228 162.84 162.728 162.285 162.963C161.73 163.205 161.117 163.326 160.445 163.326C159.695 163.326 158.945 163.189 158.195 162.916L158.512 161.533C158.879 161.689 159.238 161.799 159.59 161.861C159.941 161.931 160.227 161.966 160.445 161.966C160.977 161.966 161.34 161.838 161.535 161.58C161.738 161.322 161.914 161.017 162.062 160.666L162.73 159.013L157.855 147.775H159.754L163.691 157.326L167.559 147.775H169.48ZM182.242 158.697H180.637V150.845C180.637 150.22 180.527 149.736 180.309 149.392C180.09 149.049 179.773 148.877 179.359 148.877C178.75 148.877 178.301 149.197 178.012 149.838C177.73 150.478 177.59 151.377 177.59 152.533V158.697H175.973V150.845C175.973 150.22 175.859 149.736 175.633 149.392C175.414 149.049 175.098 148.877 174.684 148.877C174.301 148.877 173.996 148.99 173.77 149.216C173.543 149.443 173.363 149.732 173.23 150.084C173.105 150.435 173.023 150.826 172.984 151.256C172.945 151.685 172.926 152.111 172.926 152.533V158.697H171.32V147.775H172.926V149.357C173.262 148.131 173.992 147.517 175.117 147.517C176.188 147.517 176.914 148.052 177.297 149.123C177.828 148.052 178.578 147.517 179.547 147.517C180.477 147.517 181.156 147.795 181.586 148.349C182.023 148.896 182.242 149.728 182.242 150.845V158.697ZM195.625 153.271C195.625 154.123 195.488 154.896 195.215 155.591C194.949 156.287 194.562 156.884 194.055 157.384C193.555 157.877 192.953 158.263 192.25 158.545C191.547 158.826 190.762 158.966 189.895 158.966C189.043 158.966 188.266 158.826 187.562 158.545C186.859 158.263 186.254 157.877 185.746 157.384C185.246 156.884 184.859 156.287 184.586 155.591C184.32 154.896 184.188 154.123 184.188 153.271C184.188 152.443 184.32 151.674 184.586 150.963C184.859 150.244 185.246 149.634 185.746 149.134C186.254 148.627 186.859 148.232 187.562 147.951C188.266 147.662 189.043 147.517 189.895 147.517C190.762 147.517 191.547 147.662 192.25 147.951C192.953 148.232 193.555 148.627 194.055 149.134C194.562 149.634 194.949 150.244 195.215 150.963C195.488 151.674 195.625 152.443 195.625 153.271ZM194.02 153.271C194.02 152.646 193.926 152.072 193.738 151.549C193.559 151.017 193.289 150.552 192.93 150.154C192.57 149.756 192.133 149.443 191.617 149.216C191.109 148.99 190.535 148.877 189.895 148.877C189.254 148.877 188.676 148.99 188.16 149.216C187.652 149.443 187.223 149.756 186.871 150.154C186.52 150.552 186.25 151.017 186.062 151.549C185.883 152.072 185.793 152.646 185.793 153.271C185.793 153.896 185.883 154.474 186.062 155.006C186.25 155.529 186.52 155.982 186.871 156.365C187.223 156.748 187.652 157.049 188.16 157.267C188.676 157.486 189.254 157.595 189.895 157.595C190.535 157.595 191.109 157.486 191.617 157.267C192.133 157.049 192.57 156.748 192.93 156.365C193.289 155.982 193.559 155.529 193.738 155.006C193.926 154.474 194.02 153.896 194.02 153.271ZM198.098 147.775H199.703V154.525C199.703 155.502 199.914 156.259 200.336 156.799C200.766 157.33 201.453 157.595 202.398 157.595C202.992 157.595 203.527 157.459 204.004 157.185C204.48 156.912 204.887 156.549 205.223 156.095C205.559 155.634 205.812 155.111 205.984 154.525C206.164 153.931 206.254 153.314 206.254 152.674V147.775H207.871V158.697H206.254V155.966C205.488 157.966 204.113 158.966 202.129 158.966C199.441 158.966 198.098 157.486 198.098 154.525V147.775ZM221.254 155.674C221.254 156.314 221.094 156.845 220.773 157.267C220.453 157.689 220.039 158.025 219.531 158.275C219.031 158.525 218.469 158.701 217.844 158.802C217.227 158.912 216.621 158.966 216.027 158.966C215.035 158.966 214.047 158.822 213.062 158.533C212.078 158.244 211.227 157.865 210.508 157.396L211.223 156.013C212.027 156.521 212.82 156.912 213.602 157.185C214.383 157.459 215.191 157.595 216.027 157.595C218.441 157.595 219.648 156.97 219.648 155.72C219.648 155.416 219.547 155.17 219.344 154.982C219.148 154.787 218.883 154.631 218.547 154.513C218.211 154.388 217.824 154.291 217.387 154.22C216.957 154.15 216.504 154.084 216.027 154.021C215.418 153.935 214.812 153.834 214.211 153.716C213.609 153.599 213.059 153.424 212.559 153.189C212.066 152.955 211.668 152.642 211.363 152.252C211.066 151.861 210.918 151.345 210.918 150.705C210.918 150.158 211.055 149.685 211.328 149.287C211.609 148.888 211.98 148.556 212.441 148.291C212.91 148.025 213.457 147.83 214.082 147.705C214.707 147.58 215.355 147.517 216.027 147.517C216.988 147.517 217.848 147.631 218.605 147.857C219.363 148.076 220.047 148.392 220.656 148.806L220.012 150.06C219.387 149.623 218.754 149.318 218.113 149.146C217.473 148.966 216.777 148.877 216.027 148.877C215.691 148.877 215.316 148.908 214.902 148.97C214.496 149.025 214.117 149.127 213.766 149.275C213.414 149.416 213.117 149.603 212.875 149.838C212.641 150.064 212.523 150.353 212.523 150.705C212.523 151.009 212.621 151.256 212.816 151.443C213.02 151.623 213.289 151.775 213.625 151.9C213.961 152.017 214.344 152.111 214.773 152.181C215.211 152.252 215.668 152.318 216.145 152.381C216.738 152.466 217.336 152.568 217.938 152.685C218.547 152.802 219.098 152.974 219.59 153.201C220.09 153.427 220.492 153.736 220.797 154.127C221.102 154.517 221.254 155.033 221.254 155.674ZM247.34 156.611C246.879 157.33 246.246 157.904 245.441 158.334C244.645 158.756 243.695 158.966 242.594 158.966C241.742 158.966 240.961 158.826 240.25 158.545C239.539 158.263 238.93 157.873 238.422 157.373C237.922 156.865 237.531 156.263 237.25 155.568C236.969 154.873 236.828 154.099 236.828 153.248C236.828 152.42 236.957 151.654 237.215 150.951C237.473 150.24 237.84 149.634 238.316 149.134C238.793 148.627 239.375 148.232 240.062 147.951C240.758 147.662 241.527 147.517 242.371 147.517C242.707 147.517 243.051 147.556 243.402 147.634C243.754 147.713 244.086 147.834 244.398 147.998C244.711 148.154 244.992 148.345 245.242 148.572C245.492 148.791 245.68 149.052 245.805 149.357V147.775H247.246V152.146H245.805C245.805 151.662 245.715 151.22 245.535 150.822C245.363 150.424 245.125 150.08 244.82 149.791C244.516 149.502 244.152 149.279 243.73 149.123C243.309 148.959 242.855 148.877 242.371 148.877C241.715 148.877 241.141 148.99 240.648 149.216C240.164 149.443 239.758 149.752 239.43 150.142C239.102 150.533 238.852 150.994 238.68 151.525C238.516 152.049 238.434 152.623 238.434 153.248C238.434 153.873 238.527 154.451 238.715 154.982C238.91 155.506 239.188 155.959 239.547 156.341C239.914 156.724 240.352 157.029 240.859 157.256C241.375 157.482 241.953 157.595 242.594 157.595C243.406 157.595 244.129 157.435 244.762 157.115C245.395 156.795 245.879 156.369 246.215 155.838L247.34 156.611ZM260.277 158.697H258.66V151.959C258.66 150.982 258.449 150.224 258.027 149.685C257.605 149.146 256.922 148.877 255.977 148.877C255.383 148.877 254.844 149.013 254.359 149.287C253.883 149.56 253.477 149.927 253.141 150.388C252.805 150.841 252.547 151.365 252.367 151.959C252.195 152.545 252.109 153.158 252.109 153.799V158.697H250.504V143.404H252.109V150.517C252.883 148.517 254.262 147.517 256.246 147.517C258.934 147.517 260.277 148.998 260.277 151.959V158.697ZM263.008 155.744C263.008 155.056 263.18 154.482 263.523 154.021C263.867 153.552 264.316 153.185 264.871 152.92C265.434 152.646 266.074 152.451 266.793 152.334C267.52 152.209 268.258 152.146 269.008 152.146C269.297 152.146 269.555 152.15 269.781 152.158C270.016 152.166 270.234 152.177 270.438 152.193C270.648 152.209 270.859 152.228 271.07 152.252C271.281 152.275 271.512 152.302 271.762 152.334V151.549C271.762 151.017 271.645 150.58 271.41 150.236C271.184 149.892 270.902 149.623 270.566 149.427C270.23 149.224 269.879 149.084 269.512 149.006C269.145 148.92 268.832 148.877 268.574 148.877C267.762 148.877 267.012 148.986 266.324 149.205C265.637 149.424 264.996 149.716 264.402 150.084L263.676 148.877C264.332 148.478 265.066 148.154 265.879 147.904C266.699 147.646 267.598 147.517 268.574 147.517C269.168 147.517 269.75 147.595 270.32 147.752C270.898 147.9 271.414 148.134 271.867 148.455C272.328 148.767 272.695 149.181 272.969 149.697C273.242 150.213 273.379 150.83 273.379 151.549V158.697H271.762V156.869C271.48 157.22 271.16 157.529 270.801 157.795C270.449 158.06 270.078 158.279 269.688 158.451C269.297 158.615 268.906 158.74 268.516 158.826C268.125 158.92 267.754 158.966 267.402 158.966C265.957 158.966 264.863 158.689 264.121 158.134C263.379 157.58 263.008 156.783 263.008 155.744ZM267.402 157.595C268.074 157.595 268.676 157.498 269.207 157.302C269.746 157.099 270.203 156.849 270.578 156.552C270.953 156.256 271.242 155.939 271.445 155.603C271.656 155.267 271.762 154.963 271.762 154.689V153.658C271.238 153.58 270.734 153.537 270.25 153.529C269.773 153.521 269.359 153.517 269.008 153.517C268.43 153.517 267.871 153.556 267.332 153.634C266.801 153.713 266.336 153.841 265.938 154.021C265.539 154.193 265.219 154.42 264.977 154.701C264.734 154.982 264.613 155.33 264.613 155.744C264.613 156.205 264.836 156.631 265.281 157.021C265.734 157.404 266.441 157.595 267.402 157.595ZM287.172 155.216C287.047 156.365 286.594 157.279 285.812 157.959C285.039 158.631 284.07 158.966 282.906 158.966C282.266 158.966 281.68 158.861 281.148 158.65C280.617 158.439 280.164 158.146 279.789 157.771C279.414 157.396 279.121 156.947 278.91 156.424C278.707 155.892 278.605 155.314 278.605 154.689V149.146H276.133V147.775H278.605V143.404H280.211V147.775H284.863V149.146H280.211V154.689C280.211 155.088 280.273 155.463 280.398 155.814C280.531 156.166 280.711 156.474 280.938 156.74C281.172 157.006 281.453 157.216 281.781 157.373C282.109 157.521 282.484 157.595 282.906 157.595C283.703 157.595 284.367 157.349 284.898 156.857C285.438 156.357 285.746 155.713 285.824 154.924L287.172 155.216ZM308.887 145.595H306.707V143.404H308.887V145.595ZM311.066 158.697H304.516V157.326H306.988V149.146H304.516V147.775H308.605V157.326H311.066V158.697ZM326.066 155.674C326.066 156.314 325.906 156.845 325.586 157.267C325.266 157.689 324.852 158.025 324.344 158.275C323.844 158.525 323.281 158.701 322.656 158.802C322.039 158.912 321.434 158.966 320.84 158.966C319.848 158.966 318.859 158.822 317.875 158.533C316.891 158.244 316.039 157.865 315.32 157.396L316.035 156.013C316.84 156.521 317.633 156.912 318.414 157.185C319.195 157.459 320.004 157.595 320.84 157.595C323.254 157.595 324.461 156.97 324.461 155.72C324.461 155.416 324.359 155.17 324.156 154.982C323.961 154.787 323.695 154.631 323.359 154.513C323.023 154.388 322.637 154.291 322.199 154.22C321.77 154.15 321.316 154.084 320.84 154.021C320.23 153.935 319.625 153.834 319.023 153.716C318.422 153.599 317.871 153.424 317.371 153.189C316.879 152.955 316.48 152.642 316.176 152.252C315.879 151.861 315.73 151.345 315.73 150.705C315.73 150.158 315.867 149.685 316.141 149.287C316.422 148.888 316.793 148.556 317.254 148.291C317.723 148.025 318.27 147.83 318.895 147.705C319.52 147.58 320.168 147.517 320.84 147.517C321.801 147.517 322.66 147.631 323.418 147.857C324.176 148.076 324.859 148.392 325.469 148.806L324.824 150.06C324.199 149.623 323.566 149.318 322.926 149.146C322.285 148.966 321.59 148.877 320.84 148.877C320.504 148.877 320.129 148.908 319.715 148.97C319.309 149.025 318.93 149.127 318.578 149.275C318.227 149.416 317.93 149.603 317.688 149.838C317.453 150.064 317.336 150.353 317.336 150.705C317.336 151.009 317.434 151.256 317.629 151.443C317.832 151.623 318.102 151.775 318.438 151.9C318.773 152.017 319.156 152.111 319.586 152.181C320.023 152.252 320.48 152.318 320.957 152.381C321.551 152.466 322.148 152.568 322.75 152.685C323.359 152.802 323.91 152.974 324.402 153.201C324.902 153.427 325.305 153.736 325.609 154.127C325.914 154.517 326.066 155.033 326.066 155.674ZM350.371 158.697H343.82V157.326H346.293V144.775H343.82V143.404H347.91V157.326H350.371V158.697ZM365.945 153.271C365.945 154.123 365.809 154.896 365.535 155.591C365.27 156.287 364.883 156.884 364.375 157.384C363.875 157.877 363.273 158.263 362.57 158.545C361.867 158.826 361.082 158.966 360.215 158.966C359.363 158.966 358.586 158.826 357.883 158.545C357.18 158.263 356.574 157.877 356.066 157.384C355.566 156.884 355.18 156.287 354.906 155.591C354.641 154.896 354.508 154.123 354.508 153.271C354.508 152.443 354.641 151.674 354.906 150.963C355.18 150.244 355.566 149.634 356.066 149.134C356.574 148.627 357.18 148.232 357.883 147.951C358.586 147.662 359.363 147.517 360.215 147.517C361.082 147.517 361.867 147.662 362.57 147.951C363.273 148.232 363.875 148.627 364.375 149.134C364.883 149.634 365.27 150.244 365.535 150.963C365.809 151.674 365.945 152.443 365.945 153.271ZM364.34 153.271C364.34 152.646 364.246 152.072 364.059 151.549C363.879 151.017 363.609 150.552 363.25 150.154C362.891 149.756 362.453 149.443 361.938 149.216C361.43 148.99 360.855 148.877 360.215 148.877C359.574 148.877 358.996 148.99 358.48 149.216C357.973 149.443 357.543 149.756 357.191 150.154C356.84 150.552 356.57 151.017 356.383 151.549C356.203 152.072 356.113 152.646 356.113 153.271C356.113 153.896 356.203 154.474 356.383 155.006C356.57 155.529 356.84 155.982 357.191 156.365C357.543 156.748 357.973 157.049 358.48 157.267C358.996 157.486 359.574 157.595 360.215 157.595C360.855 157.595 361.43 157.486 361.938 157.267C362.453 157.049 362.891 156.748 363.25 156.365C363.609 155.982 363.879 155.529 364.059 155.006C364.246 154.474 364.34 153.896 364.34 153.271ZM367.82 155.744C367.82 155.056 367.992 154.482 368.336 154.021C368.68 153.552 369.129 153.185 369.684 152.92C370.246 152.646 370.887 152.451 371.605 152.334C372.332 152.209 373.07 152.146 373.82 152.146C374.109 152.146 374.367 152.15 374.594 152.158C374.828 152.166 375.047 152.177 375.25 152.193C375.461 152.209 375.672 152.228 375.883 152.252C376.094 152.275 376.324 152.302 376.574 152.334V151.549C376.574 151.017 376.457 150.58 376.223 150.236C375.996 149.892 375.715 149.623 375.379 149.427C375.043 149.224 374.691 149.084 374.324 149.006C373.957 148.92 373.645 148.877 373.387 148.877C372.574 148.877 371.824 148.986 371.137 149.205C370.449 149.424 369.809 149.716 369.215 150.084L368.488 148.877C369.145 148.478 369.879 148.154 370.691 147.904C371.512 147.646 372.41 147.517 373.387 147.517C373.98 147.517 374.562 147.595 375.133 147.752C375.711 147.9 376.227 148.134 376.68 148.455C377.141 148.767 377.508 149.181 377.781 149.697C378.055 150.213 378.191 150.83 378.191 151.549V158.697H376.574V156.869C376.293 157.22 375.973 157.529 375.613 157.795C375.262 158.06 374.891 158.279 374.5 158.451C374.109 158.615 373.719 158.74 373.328 158.826C372.938 158.92 372.566 158.966 372.215 158.966C370.77 158.966 369.676 158.689 368.934 158.134C368.191 157.58 367.82 156.783 367.82 155.744ZM372.215 157.595C372.887 157.595 373.488 157.498 374.02 157.302C374.559 157.099 375.016 156.849 375.391 156.552C375.766 156.256 376.055 155.939 376.258 155.603C376.469 155.267 376.574 154.963 376.574 154.689V153.658C376.051 153.58 375.547 153.537 375.062 153.529C374.586 153.521 374.172 153.517 373.82 153.517C373.242 153.517 372.684 153.556 372.145 153.634C371.613 153.713 371.148 153.841 370.75 154.021C370.352 154.193 370.031 154.42 369.789 154.701C369.547 154.982 369.426 155.33 369.426 155.744C369.426 156.205 369.648 156.631 370.094 157.021C370.547 157.404 371.254 157.595 372.215 157.595ZM391.293 158.697H389.676V157.689C389.215 158.103 388.707 158.42 388.152 158.638C387.605 158.857 387.043 158.966 386.465 158.966C385.598 158.966 384.82 158.826 384.133 158.545C383.445 158.263 382.863 157.873 382.387 157.373C381.918 156.865 381.555 156.259 381.297 155.556C381.047 154.853 380.922 154.084 380.922 153.248C380.922 152.42 381.047 151.654 381.297 150.951C381.555 150.24 381.918 149.634 382.387 149.134C382.863 148.627 383.445 148.232 384.133 147.951C384.82 147.662 385.598 147.517 386.465 147.517C387.043 147.517 387.605 147.623 388.152 147.834C388.707 148.037 389.215 148.345 389.676 148.759V144.775H387.496V143.404H391.293V158.697ZM389.676 150.318C389.215 149.81 388.711 149.443 388.164 149.216C387.625 148.99 387.051 148.877 386.441 148.877C385.801 148.877 385.234 148.99 384.742 149.216C384.258 149.443 383.852 149.752 383.523 150.142C383.195 150.533 382.945 150.994 382.773 151.525C382.609 152.049 382.527 152.623 382.527 153.248C382.527 153.873 382.609 154.451 382.773 154.982C382.945 155.506 383.195 155.963 383.523 156.353C383.852 156.744 384.258 157.052 384.742 157.279C385.234 157.506 385.801 157.619 386.441 157.619C387.676 157.619 388.754 157.131 389.676 156.154V150.318ZM400.598 145.595H398.418V143.404H400.598V145.595ZM402.777 158.697H396.227V157.326H398.699V149.146H396.227V147.775H400.316V157.326H402.777V158.697ZM417.496 158.697H415.879V151.959C415.879 150.982 415.668 150.224 415.246 149.685C414.824 149.146 414.141 148.877 413.195 148.877C412.602 148.877 412.062 149.013 411.578 149.287C411.102 149.56 410.695 149.927 410.359 150.388C410.023 150.841 409.766 151.365 409.586 151.959C409.414 152.545 409.328 153.158 409.328 153.799V158.697H407.723V147.775H409.328V150.517C410.102 148.517 411.48 147.517 413.465 147.517C416.152 147.517 417.496 148.998 417.496 151.959V158.697ZM430.598 158.58C430.598 159.33 430.469 159.998 430.211 160.584C429.953 161.17 429.59 161.666 429.121 162.072C428.66 162.478 428.113 162.787 427.48 162.998C426.855 163.216 426.156 163.326 425.383 163.326C424.297 163.326 423.371 163.123 422.605 162.716C421.848 162.31 421.191 161.724 420.637 160.959L421.762 160.091C422.098 160.599 422.582 161.025 423.215 161.369C423.848 161.713 424.57 161.884 425.383 161.884C426.492 161.884 427.367 161.603 428.008 161.041C428.656 160.486 428.98 159.681 428.98 158.627V157.455C428.027 158.299 426.941 158.72 425.723 158.72C424.012 158.72 422.668 158.232 421.691 157.256C420.715 156.279 420.227 154.943 420.227 153.248C420.227 152.42 420.352 151.658 420.602 150.963C420.859 150.259 421.223 149.654 421.691 149.146C422.168 148.631 422.746 148.232 423.426 147.951C424.105 147.662 424.871 147.517 425.723 147.517C426.316 147.517 426.891 147.623 427.445 147.834C428.008 148.037 428.52 148.345 428.98 148.759V147.775H430.598V158.58ZM428.98 150.318C428.52 149.81 428.012 149.443 427.457 149.216C426.91 148.99 426.332 148.877 425.723 148.877C425.082 148.877 424.516 148.99 424.023 149.216C423.539 149.443 423.137 149.752 422.816 150.142C422.496 150.533 422.25 150.998 422.078 151.537C421.914 152.068 421.832 152.638 421.832 153.248C421.832 154.498 422.156 155.494 422.805 156.236C423.453 156.978 424.426 157.349 425.723 157.349C426.332 157.349 426.91 157.236 427.457 157.009C428.012 156.775 428.52 156.4 428.98 155.884V150.318ZM439.902 158.697H437.723V156.517H439.902V158.697ZM453.004 158.697H450.824V156.517H453.004V158.697ZM466.105 158.697H463.926V156.517H466.105V158.697Z" fill="#6B5CAD"/>
      </svg>
    </div>
  ) : (<div></div>);
}