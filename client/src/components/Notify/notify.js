import * as React from 'react';
import styles from "./notify.module.css"

export default function Notify({isLan,text,isClose}) {
  

  return (
    <div className={styles["notify"]} style={{display : (isClose)?"flex":"none"}}>
      <h4 style={{fontSize:"13px",color:"rgb(234, 77, 77)"}}>{isLan?text["Eng"]:text["Vie"]}</h4>
      <button className={styles["notify_close"]} onClick={isClose}>
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}