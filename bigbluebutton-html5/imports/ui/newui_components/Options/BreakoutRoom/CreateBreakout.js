import React from "react";
import Cross from "./Icons/Cross";
import Button from '/imports/ui/components/button/component';
import { styles } from "./styles";
function CreateBreakout() {
    
    return (<div className={styles.centerAlign}>
        <div className={styles.createBreakOutBox}>
            <div className={styles.createBreakoutHeading}>Create breakout rooms</div>
            <div className={styles.BreakoutInput}>
                <div>
                    <div className={styles.InputHeadings}>Rooms</div>
                    <select className={styles.InputRooms}>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">8</option>
                        <option value="8">16</option>
                    </select>
                </div>
                <div className={styles.InputBox}>
                    <div className={styles.InputHeadings}>Duration</div>
                    <input className={styles.InputDuration} type="number" />
                    <label className={styles.mylabel}>Minutes</label>
                </div>
            </div>
            <div className={styles.centerAlign}>
                <div className={styles.Tick}><input type="checkbox" /></div>
                <div className={styles.Check}>Allow users to choose a breakout room to join</div>
            </div>
            <div className={styles.centerAlign}>
                <div className={styles.close}><Cross /></div>
                <div className={styles.create}>Create Room</div>
            </div>
        </div>
    </div>);
}
export default CreateBreakout;
