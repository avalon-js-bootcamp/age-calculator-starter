'use client'
import styles from "./page.module.css";
import FillingContainer from "./filling-container";
export default function Home() {
 
  return (
    <main className={styles.main}>
      <div className="aaa">
        <div className="app">
          <FillingContainer />
        </div>
      </div>
    </main>
  );
}
