'use client'
import Button from "@/components/Button";
import { HeaderItem, RowItem } from "@/components/RowItem";
import Auth from "@/security/Auth";
import Image from "next/image";
import { useState } from "react";


export default function Official() {

  const [sample, setSample] = useState([
    1,2,3,4,5,6
  ])
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

            <div className="d-flex align-items-center justify-content-center p-1 mt-2 align-self-center" style={{ backgroundColor: "white", width: "60%" }}>
              <span>Transformation,  <span>Lively,</span><span> and </span>  <span> Caring City</span>
              </span>



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

          <div className="col-lg-8 d-flex flex-column align-items-center justify-content-center" style={{}}>
            <div>

            </div>

            <div className="d-flex flex-column align-items-center justify-content-center w-100 p-5 rounded" style={{ backgroundColor: "green" }}>
              <h1 className="f-white">
                BARANGAY CENTRAL BICUTAN
              </h1>

              <span className="f-white">
                Sunflower Street, Taguig City, Metro Manila
              </span>
            </div>

            {/*  */}
            <div className="mt-3 d-flex flex-column  justify-content-center w-100 p-5 rounded" style={{ backgroundColor: "green" }} >

            <div className="border-bottom p-2 pb-4 mt-3">
                <h2 className="f-white">Current Barangay Officials</h2>
              </div>

              <div className="d-flex mt-4 justify-content-between pb-4 border-bottom">

                <div className="d-flex align-items-center">
                  <span className="f-white">Search:</span>
                  <input type="email" class="form-control rounded ms-2" id="exampleFormControlInput1" placeholder="Username" />
                </div>

                <div >
                  <Button>
                    <i className="bi bi-plus fw-bold" style={{ fontSize: "20px" }}></i>
                    <span className="fw-bold">Add official</span>
                  </Button>
                </div>
              </div>

            

              <div className="border-bottom p-2 pb-4 mt-3">

                {/* Table header */}
                <div className="d-flex col-lg-12 align-items-center justify-content-around border-bottom pb-4" style={{  }}>
                  <HeaderItem>
                    NAME
                  </HeaderItem>
                  <HeaderItem>
                    CHAIRMANSHIP
                  </HeaderItem>
                  <HeaderItem>
                    POSITION
                  </HeaderItem>
                  <HeaderItem>
                    STATUS
                  </HeaderItem>
                  <HeaderItem>
                    ACTION
                  </HeaderItem>
                </div>

                

                {/* Table body */}

                  <div className="d-flex flex-column  col-lg-12 align-items-center justify-content-between">
  
                      {
                        sample.map((i, k) => {
                          return(

                            // Put dynamic class
                              <div className='d-flex col-lg-12 justify-content-around p-2 row-item-container'>
                                <RowItem>
                                  <span className="f-white">
                                  John Doe
                                  </span>
                                </RowItem>
                                <RowItem>
                                <span className="f-white">
                                  John Doe
                                  </span>
                                </RowItem>
                                <RowItem>
                                <span className="f-white">
                                  John Doe
                                  </span>
                                </RowItem>
                                <RowItem>
                                <span className="f-white">
                                  John Doe
                                  </span>
                                </RowItem>
                                <RowItem>
                                <span className="f-white">
                                  John Doe
                                  </span>
                                </RowItem>
                                </div>
                         
                          )
                        })
                      }

                  </div>

                {/* Table body */}
              </div>

            </div>
            {/*  */}





          </div>


        </div>
      </Auth>
    </main>
  );
}
