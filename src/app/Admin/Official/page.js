'use client'
import Button from "@/components/Button";
import { HeaderItem, RowItem } from "@/components/RowItem";
import { loadOfficials } from "@/redux/reducer/officials";
import { LogOut } from "@/redux/reducer/user";
import Auth from "@/security/Auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Official() {
  const dispatch = useDispatch();
  const router = useRouter()
  const officials = useSelector(state => state)
  const token = useSelector(state => state.user)
  const [sample, setSample] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9
  ])

  const [selectedItem, setSelectedItem] = useState(null)


  // 0 - BO   MR -1    SCHEDULES - 2
  const [tab, seTab] = useState(0)


  useEffect(() => {
    const fetchData = async () => {

      try {
        const result = await dispatch(loadOfficials(token.token)).unwrap();

        // Handle success, e.g., navigate to another page
      } catch (error) {

        // Handle error, e.g., show an error message
      }
    };

    fetchData();
  }, []);
  console.log(officials.officials.list, "--> CHECK ME")
  useEffect(() => {

  }, [])



  const changeTab = (v) => {
    seTab(v)
  }



  return (
    <main className={`container-fluid`}>
      <Auth>
        <div className="row vh-100">

          <div className="col-lg-4 p-5 d-flex flex-column bg-green side-bg">

            <div className="d-flex flex-column align-items-center logo-bg col-lg-12" style={{ height: "100px" }}>

            </div>



            {/* Navigation */}

            <div className="flex-column mt-5">


              <div onClick={() => changeTab(0)} className={`p-4 w-100 rounded ${tab == 0 ? 'active-nav' : ''} pointer`}>
                <span className="f-white">
                  Barangay Officials
                </span>
              </div>


              <div onClick={() => changeTab(1)} className={`p-4 w-100 rounded ${tab == 1 ? 'active-nav' : ''} pointer`}>
                <span className="f-white">
                  Manage Residents
                </span>
              </div>


              <div onClick={() => changeTab(2)} className={`p-4 w-100 rounded ${tab == 2 ? 'active-nav' : ''} pointer`}>
                <span className="f-white">
                  Schedules
                </span>
              </div>



            </div>
            {/* Navigation */}

          </div>

          <div className="col-lg-8 d-flex flex-column align-items-center justify-content-center" style={{}}>
            <div>
              <button onClick={async () => {

                try {
                  const result = await dispatch(LogOut());
                  router.replace('/', { scroll: false })
                  // Handle success, e.g., navigate to another page
                } catch (error) {

                  // Handle error, e.g., show an error message
                }

              }}>
                LOGOUT
              </button>
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center w-100 p-5 rounded bg-green">
              <h1 className="f-white">
                BARANGAY CENTRAL BICUTAN
              </h1>

              <span className="f-white">
                Sunflower Street, Taguig City, Metro Manila
              </span>
            </div>

            {/* BO */}
            {tab == 0 &&

              <div className="mt-3 d-flex flex-column  justify-content-center w-100 p-5 rounded bg-green" >

                <div className="border-bottom p-2 pb-4 mt-3">
                  <h2 className="f-white">Current Barangay Officials</h2>
                </div>

                <div className="d-flex mt-4 justify-content-between pb-4 border-bottom">

                  <div className="d-flex align-items-center">
                    <span className="f-white">Search:</span>
                    <input type="email" className="form-control rounded ms-2" id="exampleFormControlInput1" placeholder="Username" />
                  </div>

                  <div >
                    <Button>
                      <i className="bi bi-plus fw-bold" style={{ fontSize: "20px" }}></i>
                      <span className="fw-bold">Add official</span>
                    </Button>
                  </div>
                </div>


                {/*  */}
                <div className="border-bottom p-2 pb-4 mt-3">

                  {/* Table header */}
                  <div className="d-flex col-lg-12 align-items-center justify-content-around border-bottom pb-4" style={{}}>
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

                  <div className="d-flex flex-column  col-lg-12 align-items-center justify-content-between table-mh" >

                    {
                      officials.officials.list.map((i, k) => {
                        return (

                          // Put dynamic className
                          <div className='d-flex col-lg-12 justify-content-around  row-item-container'>
                            <RowItem>
                              <span className="f-white">
                                {i.full_name}
                              </span>
                            </RowItem>
                            <RowItem>
                              <span className="f-white">
                                {i.chairmanship}
                              </span>
                            </RowItem>
                            <RowItem>
                              <span className="f-white">
                                {i.position}
                              </span>
                            </RowItem>
                            <RowItem>
                              <span className="f-white">
                                {i.status}
                              </span>
                            </RowItem>
                            <RowItem>
                              <span id={k + i.full_name + "action"}
                                onClick={() => {
                                  document.getElementById(k + i.full_name + "button").classList.remove('d-none')
                                  document.getElementById(k + i.full_name + "action").classList.add('d-none')

                                }}
                                className="f-white bg-yellow p-2 rounded">
                                ACTION
                              </span>
                              <div id={k + i.full_name + "button"} className="d-flex d-none">

                                <button
                                  data-bs-toggle="modal" data-bs-target="#exampleModal"
                                  onClick={() => {
                                    setSelectedItem(i)
                                  }}
                                  type="button" class="btn btn-primary">Edit</button>

                                <button type="button" class="btn btn-danger ms-3">Delete</button>

                              </div>
                            </RowItem>
                          </div>

                        )
                      })
                    }

                  </div>

                  {/* Table body */}
                </div>

              </div>
            }
            {/* BO */}

            {/* MANAGE RESIDENT */}

            {
              tab == 1 &&
              <div className="mt-3 d-flex flex-column  justify-content-center w-100 p-5 rounded bg-green" >

                <div className="border-bottom p-2 pb-4 mt-3">
                  <h2 className="f-white">Resident Records</h2>
                </div>

                <div className="d-flex mt-4 justify-content-between pb-4 border-bottom">

                  <div className="d-flex align-items-center">
                    <span className="f-white">Search:</span>
                    <input type="email" className="form-control rounded ms-2" id="exampleFormControlInput1" placeholder="Username" />
                  </div>

                  <div >
                    <Button>
                      <i className="bi bi-plus fw-bold" style={{ fontSize: "20px" }}></i>
                      <span className="fw-bold">Official</span>
                    </Button>
                  </div>
                </div>


                {/*  */}
                <div className="border-bottom p-2 pb-4 mt-3">

                  {/* Table header */}
                  <div className="d-flex col-lg-12 align-items-center justify-content-around border-bottom pb-4" style={{}}>
                    <HeaderItem>
                      Fullname
                    </HeaderItem>
                    <HeaderItem>
                      Age
                    </HeaderItem>
                    <HeaderItem>
                      Civil Status
                    </HeaderItem>
                    <HeaderItem>
                      Gender
                    </HeaderItem>
                    <HeaderItem>
                      Voter Status
                    </HeaderItem>
                    <HeaderItem>
                      Action
                    </HeaderItem>
                  </div>



                  {/* Table body */}

                  <div className="d-flex flex-column  col-lg-12 align-items-center justify-content-between table-mh" >

                    {
                      sample.map((i, k) => {
                        return (

                          // Put dynamic className
                          <div className='d-flex col-lg-12 justify-content-around row-item-container'>
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
            }

            {/* MANAGE RESIDENT */}



          </div>

          {/* Modal */
          console.log(selectedItem, "--> CHECK")
          }
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label  class="form-label">Name</label>
                    <input  
                    value={selectedItem != null && selectedItem.full_name}
                    onChange={(val) => {
                      if(selectedItem != null){
                        setSelectedItem({
                          ...selectedItem,
                          full_name: val.target.value
                        })
                      }
                    }}
                    class="form-control"  />
                  </div>
                  <div class="mb-3">
                    <label  class="form-label">Chairmanship</label>
                    <input 
                     value={selectedItem != null && selectedItem.chairmanship}
                     onChange={(val) => {
                      if(selectedItem != null){
                        setSelectedItem({
                          ...selectedItem,
                          chairmanship: val.target.value
                        })
                      }
                    }}
                    class="form-control"  />
                  </div>
                  <div class="mb-3">
                    <label  class="form-label">Position</label>
                    <input 
                     value={selectedItem != null && selectedItem.position}
                     onChange={(val) => {
                      if(selectedItem != null){
                        setSelectedItem({
                          ...selectedItem,
                          position: val.target.value
                        })
                      }
                    }}
                    class="form-control"  />
                  </div>
                  <div class="mb-3">
                    <label  class="form-label">Status</label>
                    <input  
                     value={selectedItem != null && selectedItem.status}
                     onChange={(val) => {
                      if(selectedItem != null){
                        setSelectedItem({
                          ...selectedItem,
                          status: val.target.value
                        })
                      }
                    }}
                    class="form-control"  />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary bg-green">Save changes</button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal */}
        </div>
      </Auth>
    </main>
  );
}
