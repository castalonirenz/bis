'use client'
import Button from "@/components/Button";
import Auth from "@/security/Auth";
import Image from "next/image";


export default function Official() {
  const login = () => {
    router.push('/Admin/Official', { scroll: false })
  }


  return (
    <main className={`container-fluid`}>
      <Auth>
        <div className="row vh-100">

          <div className="col-lg-4 p-5 d-flex flex-column" style={{ backgroundColor: "green" }}>

            <div className="d-flex flex-column align-items-center">
              <h4 className="f-white">
                BARANGAY CENTRAL BICUTAN
              </h4>
              <span className="f-white">DOCUMENT REQUEST SYSTEM</span>
            </div>


            {/* Navigation */}

              <div className="flex-column mt-5">


                <div className="p-4 w-100 rounded active-nav">
                    <span className="f-white">
                      Barangay Officials
                    </span>
                </div>


                <div className="p-4 w-100 rounded mt-4">
                    <span className="f-white">
                      Manage Residents
                    </span>
                </div>


                <div className="p-4 w-100 rounded mt-4">
                    <span className="f-white">
                      Schedules
                    </span>
                </div>

                

              </div>
            {/* Navigation */}

          </div>

          <div className="col-lg-8 d-flex align-items-center justify-content-center" style={{ backgroundColor: "blue" }}>
            Tables
          </div>


        </div>
      </Auth>
    </main>
  );
}
