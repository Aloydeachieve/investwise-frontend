import React from "react";
import styles from "./InvestmentGraph.module.css";

const InvestmentGraph = () => {
  return (
    <div className={styles.graphContainer}>
      <div className={styles.labels}>Investment | Profit</div>
      <svg className={styles.svg} viewBox="0 0 300 60">
        <path
          d="M0,40 Q50,30 100,35 T200,25 T300,20"
          className={styles.profitLine}
        />
        <path
          d="M0,50 Q50,45 100,40 T200,35 T300,30"
          className={styles.investmentLine}
        />
      </svg>
    </div>
  );
};

export default InvestmentGraph;
