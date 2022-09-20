import React from 'react';
import _ from 'lodash';
import { styles } from './styles';

export default function PollResultList(props) {

    function showBar(extra) {
        const keys = [{ option: "A", color: "#7966FA", bgColor: "#7966fa1a" }, { option: "B", color: "#44CC88", bgColor: "#44cc881a" }, { option: "C", color: "#7966FA", bgColor: "#7966fa1a" }, { option: "D", color: "#44CC88", bgColor: "#44cc881a" }, { option: "E", color: "#7966FA", bgColor: "#7966fa1a" }, { option: "F", color: "#44CC88", bgColor: "#44cc881a" }, { option: "G", color: "#7966FA", bgColor: "#7966fa1a" }, { option: "H", color: "#44CC88", bgColor: "#44cc881a" }, { option: "", color: "", bgColor: "" }]
        const numResponders = extra.pollResultData.numResponders;
        let maxKey = 0;
        let max = 0;
        extra.pollResultData.answers.map((obj) => {
            if (obj.numVotes > max) {
                max = obj.numVotes;
                maxKey = obj.key;
            }
        })
        return (
            extra.pollResultData.answers.map((obj) => {

                const pct = Math.round(obj.numVotes / numResponders * 100);
                const pctFotmatted = `${Number.isNaN(pct) ? 0 : pct}%`;

                const calculatedWidth = {
                    width: pctFotmatted,
                    backgroundColor: (obj.key === maxKey ? "#44CC881A" : "#7966fa1a")
                };
                const boxStyle = {
                    border: `1px solid ${(obj.key === maxKey ? '#44CC88' : '#7966FA')}`
                };
                const backgroundStyle = {
                    backgroundColor: (obj.key === maxKey ? "#44CC88" : "#7966FA")
                }
                const textStyle = {
                    color: (obj.key === maxKey ? "#44CC88" : "#7966FA")
                }
                return (
                    <div className={styles.pollBar} style={boxStyle} key={_.uniqueId('stats-')}>
                        <div className={styles.pollLayer} style={calculatedWidth}></div>
                        <div className={styles.pollContent}>
                            <div className={styles.pollInline}>
                                <div style={backgroundStyle} className={styles.barOption}>
                                    {keys[obj.id].option}
                                </div>
                                <span style={textStyle}>
                                    {
                                        obj.key
                                    }
                                </span>
                            </div>
                            <span style={textStyle}>{pctFotmatted}</span>
                        </div>
                    </div>
                    // <div className={styles.pollBar1}
                    // >
                    //   <div className={styles.pollLayer} style={calculatedWidth}></div>
                    //   <div className={styles.pollContent1}>
                    //     <span>
                    //       {obj.key}
                    //     </span>
                    //     <span>{pctFotmatted}</span>
                    //   </div>
                    // </div>
                );
            })
        )
    }

    return (
        <>
            {
                props.newTimeWindowsValues.map((resObj) => {
                    return (
                        <div className={styles.pollResultWrapper}>
                        <div className={styles.pollResult}>
                            <h3>{resObj.extra.pollResultData.questionText}</h3>
                            {
                                showBar(resObj.extra)
                            }
                        </div>
                    </div>
                    )
                })
            }
        </>
    )
}