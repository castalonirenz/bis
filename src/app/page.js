import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="container">

        <div className="row">

          <div className="col-lg-9" style={{backgroundColor: "blue"}}>
            May image dito
          </div>

          <div className="col-lg-3" style={{backgroundColor: "red"}}>
      
            <h3>
              BARANGAY CENTRAL BICUTAN
            </h3>
            <h3>
              DOCUMENT REQUEST SYSTEM
            </h3>
          </div>
        </div>
     
      </div>
    </main>
  );
}
