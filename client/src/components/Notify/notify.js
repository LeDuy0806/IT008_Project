import * as React from 'react';
import styles from "./notify.module.css"

export default function Notify({isLan,text,isClose,color}) {
  

  return (
    <div className={styles["notify"]} style={{display : (isClose)?"flex":"none",borderLeft:`solid 8px ${color}`}}>
      <h4 style={{fontSize:"13px",color:(color)}}>{isLan?text["Eng"]:text["Vie"]}</h4>
      <button className={styles["notify_close"]} onClick={isClose}>
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}