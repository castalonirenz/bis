import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={`container-fluid ${styles.fullHeight}`}>
      <div className="row vh-100">

        <div className="col-lg-7 d-flex align-items-center justify-content-center" style={{ backgroundColor: "blue" }}>
          May image dito
        </div>

        <div className="col-lg-5 p-5 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "green" }}>
          <h3 className="f-white fw-bold">
            BARANGAY CENTRAL BICUTAN
          </h3>
          <h4 className="f-white">
            DOCUMENT REQUEST SYSTEM
          </h4>

          <div class="mb-3 mt-5 w-100">
            <input type="email" class="form-control rounded-pill" id="exampleFormControlInput1" placeholder="Username" />
          </div>

          <div class="mb-3 w-100">
            <input type="email" class="form-control rounded-pill" id="exampleFormControlInput1" placeholder="Password" />
          </div>

      
          <div className="d-flex flex-column align-items-center" style={{width:"80%"}}>
          <button type="button" class="btn fw-bold f-white w-100" style={{backgroundColor: "yellow"}}>SIGN IN</button>
            <span className="f-white align-self-end">
              Forgot password?
            </span>
          </div>

        </div>


      </div>
    </main>
  );
}
