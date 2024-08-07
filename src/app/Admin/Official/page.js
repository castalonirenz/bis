'use client'
import Button from "@/components/Button";
import { HeaderItem, RowItem } from "@/components/RowItem";
import { addOfficials, dashboardViewApi, deleteOffialsApi, loadOfficials, updateOfficials } from "@/redux/reducer/officials";
import { addResidentApi, editResidentApi, loadAllUsers } from "@/redux/reducer/resident";
import { LogOut } from "@/redux/reducer/user";
import Auth from "@/security/Auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { addDocumentTypeApi, deleteDocumentTypeApi, getDocumentTypeApi, updateDocumentTypesApi } from "@/redux/reducer/document";



export default function Official() {
  const dispatch = useDispatch();
  const router = useRouter()
  const officials = useSelector(state => state)
  const alluser = useSelector(state => state.alluser)
  const documentList = useSelector(state => state.document)
  const dashboard = useSelector(state => state.officials.dashboardData)
  const token = useSelector(state => state.user)
  const [sample, setSample] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9
  ])

  

  const [success, setSuccess] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [message, SetMessage] = useState('')

  const [isEdit, setIsEdit] = useState(false);



  const [selectedItem, setSelectedItem] = useState(null)


  // 0 - BO,   MR -1,    SCHEDULES - 2, BR - 3, Services - 4 Dashboard -10
  const [tab, seTab] = useState(10)

  const [searchVal, setSearchVal] = useState('')
  const [searchOfficial, setSearchOfficial] = useState([])
  const [selectedSearchItem, setSelectedSearchItem] = useState('')
  const [count, setCount] = useState(0)



  // Resident

  const [startDate, setStartDate] = useState();
  const [resident, setResident] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    pass: '',
    birthday: '',
    cell_number: '',
    civil_status_id: '',
    male_female: ''
  })

  const [selectedResident, setSelectedResident] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    pass: '',
    birthday: '',
    cell_number: '',
    civil_status_id: '',
    male_female: ''
  })
  // male 0 female 1
  // Resident



  // Barangay services


  const [sss, setSSS] = useState({
    service: '',
  })
  const [isCert, setIsCert] = useState(1)
  const [docId, setDocId] = useState('')

  const [serviceDesc, setServiceDesc] = useState('')



  // Baranay services

  const [value, setValue] = useState('');

  useEffect(() => {

    if (tab == 10) {
      const fetchData = async () => {

        try {
          const result = await dispatch(dashboardViewApi(token.token)).unwrap();
         
          // Handle success, e.g., navigate to another page
        } catch (error) {

          // Handle error, e.g., show an error message
        }
      };

      fetchData();
    }

    if (tab == 0) {
      const fetchData = async () => {

        try {
          const result = await dispatch(loadOfficials(token.token)).unwrap();

          // Handle success, e.g., navigate to another page
        } catch (error) {

          // Handle error, e.g., show an error message
        }
      };

      fetchData();
    }
    if (tab == 1 || tab == 0) {
      const fetchData = async () => {

        try {
          const result = await dispatch(loadAllUsers(token.token)).unwrap();

          // Handle success, e.g., navigate to another page
        } catch (error) {

          // Handle error, e.g., show an error message
        }
      };


      fetchData();
    }



    if (tab == 3) {

      const fetchData = async () => {

        try {
          const result = await dispatch(getDocumentTypeApi(token.token)).unwrap();

          // Handle success, e.g., navigate to another page
        } catch (error) {

          // Handle error, e.g., show an error message
        }
      };

      fetchData();
    }



  }, [tab, count]);


  const searchAddOfficial = (v) => {


    setSearchVal(v)
    //v search val
    // officials list
    let tmpArr = []
    alluser.list.map((i, k) => {

      let fullname = i.first_name + " " + i.middle_name + " " + i.last_name


      // Create a regular expression dynamically with case-insensitive flag
      const regex = new RegExp(v, 'i');

      // Perform the search
      const found = regex.test(fullname);

      if (found) {
        tmpArr.push(i)
      }

    })

    setSearchOfficial(tmpArr)
  }

  const deleteOffials = () => {
    let merge = {
      selectedItem,
      token: token.token
    }

    const fetchData = async () => {



      try {
        const result = await dispatch(deleteOffialsApi(merge)).unwrap();

        // Handle success, e.g., navigate to another page
        document.getElementById('selctednameadd').value = ''
        setSelectedSearchItem({
          chairmanship: '',
          position: '',
          status: '',
        })

        setSelectedItem(null)

        setCount(count + 1)
        SetMessage('Successfully deleted a barangay official information')
        setShowSuccess(true)
        setSuccess(true)

        if (result.success) {
          setShowSuccess(true)
          setSuccess(true)
        }
        else {
          setShowSuccess(true)
          setSuccess(false)
        }



      } catch (error) {

        // Handle error, e.g., show an error message
      }
    };

    fetchData();



  }


  const updateOfficial = async () => {


    let merge = {
      selectedItem,
      token: token.token
    }

    const fetchData = async () => {



      try {
        const result = await dispatch(updateOfficials(merge)).unwrap();

        // Handle success, e.g., navigate to another page
        document.getElementById('selctednameadd').value = ''
        setSelectedSearchItem({
          chairmanship: '',
          position: '',
          status: '',
        })

        setSelectedItem(null)

        setCount(count + 1)
        SetMessage('Successfully updated a barangay official information')
        setShowSuccess(true)
        setSuccess(true)

        if (result.success) {
          setShowSuccess(true)
          setSuccess(true)
        }
        else {
          setShowSuccess(true)
          setSuccess(false)
        }



      } catch (error) {

        // Handle error, e.g., show an error message
      }
    };

    fetchData();



    dispatch(updateOfficials(merge))
    setTimeout(() => {
      setCount(count + 1)

      document.getElementById('selctednameadd').value = ''
      setSelectedItem(null)
    }, 3000)


  }

  const addOfficial = async () => {


    let merge = {
      selectedSearchItem,
      token: token.token
    }

    const fetchData = async () => {



      try {
        const result = await dispatch(addOfficials(merge)).unwrap();

        // Handle success, e.g., navigate to another page
        document.getElementById('selctednameadd').value = ''
        setSelectedSearchItem({
          chairmanship: '',
          position: '',
          status: '',
        })

        setSelectedSearchItem(null)

        setCount(count + 1)
        SetMessage('Successfully added a barangay official')
        setShowSuccess(true)
        setSuccess(true)

        if (result.success) {
          setShowSuccess(true)
          setSuccess(true)
        }
        else {
          setShowSuccess(true)
          setSuccess(false)
        }



      } catch (error) {

        // Handle error, e.g., show an error message
      }
    };

    fetchData();


  }


  const addResident = async () => {





    if (resident.first_name == "") {
      document.getElementById('fnameinput').style.border = '1px solid red'
    }

    if (resident.last_name == "") {
      document.getElementById('lnameinput').style.border = '1px solid red'
    }


    if (resident.email == "") {
      document.getElementById('emailinput').style.border = '1px solid red'
    }

    if (resident.birthday == "") {
      document.getElementById('bdayinput').style.border = '1px solid red'
    }

    if (resident.cell_number == "") {
      document.getElementById('phoneinput').style.border = '1px solid red'
    }

    if (resident.male_female === "") {
      document.getElementById('genderinput').style.border = '1px solid red'
    }

    if (resident.civil_status_id == "") {
      document.getElementById('civilinput').style.border = '1px solid red'
    }

    if (resident.first_name != "" && resident.last_name != "" && resident.birthday != "" && resident.cell_number != ""
      && resident.male_female !== "" && resident.civil_status_id != ""

    ) {

      let merge = {
        resident,
        birthday: startDate,
        token: token.token
      }


      isEdit ? dispatch(editResidentApi(merge)) : dispatch(addResidentApi(merge))


    }


  }
  const addDocumentType = () => {

    let merge = {
      data: {
        description: serviceDesc,
        service: sss.service,
        isCertificate: isCert,
        doc_id: docId
      },
      token: token.token
    }

    setSSS({
      service: '',
      isCertificate: 1,
      doc_id: ''
    })
    

    setServiceDesc('')
    console.log(isEdit, "--> IS EDIT")
    const fetchData = async () => {




      try {
        let result =''

        if(isEdit){
          result = await dispatch(updateDocumentTypesApi(merge)).unwrap();

          SetMessage('Successfully updated a barangay service')

          setCount(count + 1)
  
          setIsEdit(false)
          setShowSuccess(true)
          setSuccess(true)
  
          if (result.success) {
            setShowSuccess(true)
            setSuccess(true)
          }
          else {
            setShowSuccess(true)
            setSuccess(false)
          }
  
        }

        else{
         result = await dispatch(addDocumentTypeApi(merge)).unwrap();



          SetMessage('Successfully added a barangay service')

          setCount(count + 1)
  
          setIsEdit(false)
          setShowSuccess(true)
          setSuccess(true)
  
          if (result.success) {
            setShowSuccess(true)
            setSuccess(true)
          }
          else {
            setShowSuccess(true)
            setSuccess(false)
          }
  
        }

        // Handle success, e.g., navigate to another page

   


      } catch (error) {

        // Handle error, e.g., show an error message
      }
    };

    fetchData();


  }

  const deleteDocumentType = () => {

    let merge = {
      data: selectedItem,
      token: token.token
    }




    const fetchData = async () => {



      try {
        const result = await dispatch(deleteDocumentTypeApi(merge)).unwrap();

        // Handle success, e.g., navigate to another page

        SetMessage('Successfully deleted a barangay service')
        setSSS({
          service: '',
          isCertificate: 1
        })
        setServiceDesc('')

        setCount(count + 1)

        setShowSuccess(true)
        setSuccess(true)

        if (result.success) {
          setShowSuccess(true)
          setSuccess(true)
        }
        else {
          setShowSuccess(true)
          setSuccess(false)
        }



      } catch (error) {

        // Handle error, e.g., show an error message
      }
    };

    fetchData();


  }

  const viewCreatedTemplate = (val) => {


    window.open(`https://18.141.22.83/api/generatePdf?doc_id=${val.id}&download=0`)
    // https://18.141.22.83/api/generatePdf?doc_id=14&download=0

  }


  useEffect(() => {

  }, [])



  const changeTab = (v) => {
    seTab(v)
  }



  return (
    <main className={`container-fluid`}>
      <Auth>
        <div className="row vh-100" style={{ backgroundColor: "white" }}>

          <div className="col-lg-4 p-5 d-flex flex-column bg-green side-bg">

            <div className="d-flex flex-column align-items-center logo-bg col-lg-12" style={{ height: "100px" }}>

            </div>



            {/* Navigation */}

            <div className="flex-column mt-5">

              <div onClick={() => changeTab(10)} className={`p-4 w-100 rounded ${tab == 10 ? 'active-nav' : ''} pointer`}>
                <i class="bi bi-person f-white icon"></i>
                <span className="f-white ms-2 nav-item">
                  Dashboard
                </span>
              </div>



              <div onClick={() => changeTab(0)} className={`p-4 w-100 rounded ${tab == 0 ? 'active-nav' : ''} pointer`}>
                <i class="bi bi-person f-white icon"></i>
                <span className="f-white ms-2 nav-item">
                  Barangay Officials
                </span>
              </div>


              <div onClick={() => changeTab(1)} className={`p-4 w-100 rounded ${tab == 1 ? 'active-nav' : ''} pointer`}>

                <i class="bi bi-people-fill f-white icon"></i>
                <span className="f-white ms-2 nav-item">
                  Manage Residents
                </span>
              </div>


              <div onClick={() => changeTab(2)} className={`p-4 w-100 rounded ${tab == 2 ? 'active-nav' : ''} pointer`}>

                <i class="bi bi-calendar-date f-white icon"></i>
                <span className="f-white ms-2 nav-item">
                  Schedules
                </span>
              </div>


              <div onClick={() => changeTab(2)} className={`p-4 w-100 rounded ${tab == 2 ? 'active-nav' : ''} pointer`}>

                <i class="bi bi-person-fill-slash f-white icon"></i>
                <span className="f-white ms-2 nav-item">
                  Blotter
                </span>
              </div>

              <div onClick={() => changeTab(3)} className={`p-4 w-100 rounded ${tab == 3 ? 'active-nav' : ''} pointer`}>
                <i class="bi bi-file-earmark-diff-fill f-white icon" ></i>
                <span className="f-white nav-item ms-2">
                  Services
                </span>
              </div>



            </div>
            {/* Navigation */}

          </div>

          <div className="col-lg-8 d-flex flex-column align-items-center justify-content-center mt-5" style={{}}>



            <div class="dropdown d-flex align-items-center justify-content-between w-100" >

              <h4>
                {
                  tab == 10 && "Dashboard"
                }
                {
                  tab == 0 && "Barangay Officials"
                }

                {
                  tab == 1 && "Barangay Officials"
                }

                {
                  tab == 3 && "Barangay Services"
                }

              </h4>
              <div style={{ position: "relative" }}>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "70px", width: "70px", borderRadius: "35px", border: "1px solid green", backgroundColor: "white", position: "absolute", left: -50, bottom: -10 }}>
                  <i class="bi bi-person-fill" style={{ fontSize: "50px" }}></i>
                </div>
                <button class="btn-remove bg-yellow roundedEnd p-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">



                  <span className="f-white ms-3">
                    Administrator
                  </span>
                </button>
                <ul class="dropdown-menu">



                  <div
                    className="pointer p-2 hover"
                    onClick={async () => {

                      try {
                        const result = await dispatch(LogOut());
                        router.replace('/', { scroll: false })
                        // Handle success, e.g., navigate to another page
                      } catch (error) {

                        // Handle error, e.g., show an error message
                      }

                    }}
                  >
                    <span>
                      Logout
                    </span>
                  </div>
                </ul>
              </div>

            </div>




            {
              tab != 10 ?
                <div className="d-flex flex-column align-items-center justify-content-center w-100 p-5 rounded bg-green mt-3">
                  <h1 className="f-white">
                    BARANGAY CENTRAL BICUTAN
                  </h1>

                  <span className="f-white">
                    Sunflower Street, Taguig City, Metro Manila
                  </span>
                </div>

                :

                <div className="col-12 d-flex mt-5">

                  <div className="col-6" >
                    <img
                      style={{
                        height: "300px",
                        width: "100%",
                        objectFit: "cover"
                      }}
                      // src={require('../assets/')}
                      src='/images/TaguigSky.jpg'
                    />
                  </div>

                  <div className="col-6 bg-green p-5" >
                    <h4 className="f-white">
                      DID YOU KNOW?
                    </h4>

                    <p className="f-white">
                      Bonifacio Global City (BGC) in Taguig is a modern business and lifestyle district in Metro Manila, known for its upscale shopping centers, trendy restaurants, and vibrant nightlife. Originally a military camp named Fort Bonifacio, it has transformed into a major financial and commercial hub, attracting both local and international businesses.
                    </p>

                  </div>

                </div>
            }

            {/* Dashboard */}
            {
              tab == 10 &&

              <>
                <div className="col-12 mt-5 ">
                  <h4>Resident Information</h4>
                  <div className="col-12 d-flex">

                    <div className="d-flex bg-green p-3 align-items-center rounded">
                      <i class="bi bi-house-door f-white" style={{ fontSize: "50px" }}></i>
                      <div className="flex-column d-flex ms-3 align-items-center">
                        <span className="f-white">
                          Count of Residents
                        </span>

                        <span className="f-yellow mt-3" style={{ fontSize: "26px", fontWeight: "bold" }}>
                          {dashboard.count_of_residents}
                        </span>
                      </div>
                    </div>


                    <div className="d-flex bg-green p-3 align-items-center rounded ms-3">
                      <i class="bi bi-gender-male f-white" style={{ fontSize: "50px" }}></i>
                      <div className="flex-column d-flex ms-3 align-items-center">
                        <span className="f-white">
                          Count of Male
                        </span>

                        <span className="f-yellow mt-3" style={{ fontSize: "26px", fontWeight: "bold" }}>
                          {dashboard.males}
                        </span>
                      </div>
                    </div>


                    <div className="d-flex bg-green p-3 align-items-center rounded ms-3">
                      <i class="bi bi-gender-female f-white" style={{ fontSize: "50px" }}></i>
                      <div className="flex-column d-flex ms-3 align-items-center">
                        <span className="f-white">
                          Count of Female
                        </span>

                        <span className="f-yellow mt-3" style={{ fontSize: "26px", fontWeight: "bold" }}>
                        {dashboard.females}
                        </span>
                      </div>
                    </div>


                    <div className="d-flex bg-green p-3 align-items-center rounded ms-3">
                      <i class="bi bi-person-wheelchair f-white" style={{ fontSize: "50px" }}></i>
                      <div className="flex-column d-flex ms-3 align-items-center">
                        <span className="f-white">
                          Count of Seniors
                        </span>

                        <span className="f-yellow mt-3" style={{ fontSize: "26px", fontWeight: "bold" }}>
                          {dashboard.count_of_seniors}
                        </span>
                      </div>
                    </div>



                  </div>
                </div>

                <div className="col-12 d-flex justify-content-start mb-5">
                  <div className="mt-5 col-5">
                    <h4>Apointment Schedules</h4>
                    <div className="col-12 d-flex">

                      <div className="d-flex bg-green p-3 align-items-center rounded">
                        <i class="bi bi-calendar-date f-white" style={{ fontSize: "50px" }}></i>
                        <div className="flex-column d-flex ms-3 align-items-center">
                          <span className="f-white">
                            Count of total schedules
                          </span>

                          <span className="f-yellow mt-3" style={{ fontSize: "26px", fontWeight: "bold" }}>
                            {dashboard.schedules}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="mt-5">
                    <h4>Complaints</h4>

                    <div className="d-flex">
                      <div className=" d-flex">

                      <div className="d-flex bg-green p-3 align-items-center justify-content-center rounded" style={{width:"200px"}}>
                          <i class="bi bi-hand-thumbs-down f-white" style={{ fontSize: "50px" }}></i>
                          <div className="flex-column d-flex ms-3 align-items-center">
                            <span className="f-white">
                              Unresolve
                            </span>

                            <span className="f-yellow mt-3" style={{ fontSize: "26px", fontWeight: "bold" }}>
                              {dashboard.unresolved}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className=" d-flex ms-3">

                        <div className="d-flex bg-green p-3 align-items-center justify-content-center rounded" style={{width:"200px"}}>
                          <i class="bi bi-lightning f-white" style={{ fontSize: "50px" }}></i>
                          <div className="flex-column d-flex ms-3 align-items-center">
                            <span className="f-white">
                              Ongoing
                            </span>

                            <span className="f-yellow mt-3" style={{ fontSize: "26px", fontWeight: "bold" }}>
                              {dashboard.ongoing}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="d-flex mt-3">
                      <div className=" d-flex">

                      <div className="d-flex bg-green p-3 align-items-center justify-content-center rounded" style={{width:"200px"}}>
                          <i class="bi bi-hand-thumbs-up f-white" style={{ fontSize: "50px" }}></i>
                          <div className="flex-column d-flex ms-3 align-items-center">
                            <span className="f-white">
                              Settled
                            </span>

                            <span className="f-yellow mt-3" style={{ fontSize: "26px", fontWeight: "bold" }}>
                              {dashboard.settled}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className=" d-flex ms-3">

                      <div className="d-flex bg-green p-3 align-items-center justify-content-center rounded" style={{width:"200px"}}>
                          <i class="bi bi-x-octagon-fill f-white" style={{ fontSize: "50px" }}></i>
                          <div className="flex-column d-flex ms-3 align-items-center">
                            <span className="f-white">
                              Dismissed
                            </span>

                            <span className="f-yellow mt-3" style={{ fontSize: "26px", fontWeight: "bold" }}>
                              {dashboard.dismissed}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>


              </>
            }

            {/* Dashboard */}



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

                  {
                    <div >
                      <button
                        className="primary bg-yellow p-2 rounded" style={{ border: "0px" }}
                        data-bs-toggle="modal" data-bs-target="#addOfficialModal"
                      >
                        <i className="bi bi-plus fw-bold" style={{ fontSize: "20px" }}></i>
                        <span className="fw-bold">Add official</span>
                      </button>
                    </div>
                  }
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

                                    document.getElementById(k + i.full_name + "button").classList.add('d-none')
                                    document.getElementById(k + i.full_name + "action").classList.remove('d-none')
                                  }}
                                  type="button" class="btn btn-primary">Edit</button>

                                <button
                                  data-bs-toggle="modal" data-bs-target="#deleteConfirmModal"

                                  onClick={() => {
                                    setSelectedItem(i)
                                    document.getElementById(k + i.full_name + "button").classList.add('d-none')
                                    document.getElementById(k + i.full_name + "action").classList.remove('d-none')
                                  }}
                                  type="button" class="btn btn-danger ms-3">Delete</button>

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
                    <button
                      data-bs-toggle="modal" data-bs-target="#addResidentModal"
                      className="primary bg-yellow p-2 rounded" style={{ border: "0px" }}
                    >
                      <i className="bi bi-plus fw-bold" style={{ fontSize: "20px" }}></i>
                      <span className="fw-bold">Add Resident</span>
                    </button>
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
                      alluser.list.map((i, k) => {
                        return (

                          // Put dynamic className
                          <div className='d-flex col-lg-12 justify-content-around row-item-container'>
                            <RowItem>
                              <span className="f-white">
                                {i.first_name + " " + i.middle_name + " " + i.last_name}
                              </span>
                            </RowItem>
                            <RowItem>
                              <span className="f-white">
                                {i.age}
                              </span>
                            </RowItem>
                            <RowItem>
                              <span className="f-white">
                                {i.civil_status_type}
                              </span>
                            </RowItem>
                            <RowItem>
                              <span className="f-white">

                              </span>
                            </RowItem>
                            <RowItem>
                              <span className="f-white">

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
                                  data-bs-toggle="modal" data-bs-target="#addResidentModal"
                                  onClick={() => {

                                    setIsEdit(true)
                                    setResident(i)
                                    document.getElementById(k + i.full_name + "button").classList.add('d-none')
                                    document.getElementById(k + i.full_name + "action").classList.remove('d-none')
                                  }}
                                  type="button" class="btn btn-primary">Edit</button>

                                <button
                                  data-bs-toggle="modal" data-bs-target="#deleteConfirmModal"

                                  onClick={() => {

                                    setSelectedItem(i)
                                    setResident(i)
                                    document.getElementById(k + i.full_name + "button").classList.add('d-none')
                                    document.getElementById(k + i.full_name + "action").classList.remove('d-none')
                                  }}
                                  type="button" class="btn btn-danger ms-3">Delete</button>

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

            {/* MANAGE RESIDENT */}



            {/* Barangay services */}

            {
              tab == 3 &&
              <div className="mt-3 d-flex flex-column  justify-content-center w-100 p-5 rounded bg-green" >

                <div className="border-bottom p-2 pb-4 mt-3">
                  <h2 className="f-white">List of Document Type</h2>
                </div>

                <div className="d-flex mt-4 justify-content-between pb-4 border-bottom">

                  <div className="d-flex align-items-center">
                    <span className="f-white">Search:</span>
                    <input type="email" className="form-control rounded ms-2" id="exampleFormControlInput1" />
                  </div>

                  <div >
                    <button
                      data-bs-toggle="modal" data-bs-target="#addBarangayServices"
                      className="primary bg-yellow p-2 rounded border-0"
                    >
                      <i className="bi bi-plus fw-bold" style={{ fontSize: "20px" }}></i>
                      <span className="fw-bold">Document Type</span>
                    </button>
                  </div>
                </div>


                {/*  */}
                <div className="border-bottom p-2 pb-4 mt-3">

                  {/* Table header */}
                  <div className="d-flex col-lg-12 align-items-center justify-content-around border-bottom pb-4" style={{}}>
                    <HeaderItem>
                      No.
                    </HeaderItem>
                    <HeaderItem>
                      Service
                    </HeaderItem>
                    <HeaderItem>
                      Description
                    </HeaderItem>
                    <HeaderItem>
                      Action
                    </HeaderItem>
                  </div>



                  {/* Table body */}

                  <div className="d-flex flex-column  col-lg-12 align-items-center justify-content-between table-mh" >

                    {
                      documentList.list.map((i, k) => {
                        return (

                          // Put dynamic className
                          <div className='d-flex col-lg-12 justify-content-around row-item-container'>
                            <RowItem>
                              <span className="f-white">
                                {i.id}
                              </span>
                            </RowItem>
                            <RowItem>
                              <span className="f-white">
                                {i.service}
                              </span>
                            </RowItem>
                            <RowItem>
                              <span className="f-white">
                                {i.service}
                              </span>
                            </RowItem>
                            <RowItem>
                              <span id={k + i.service + "action"}
                                onClick={() => {

                                  document.getElementById(k + i.service + "button").classList.remove('d-none')
                                  document.getElementById(k + i.service + "action").classList.add('d-none')
                                }}
                                className="f-white bg-yellow p-2 rounded">
                                ACTION
                              </span>
                              <div id={k + i.service + "button"} className="d-flex d-none">

                                <button
                                  data-bs-toggle="modal" data-bs-target="#addBarangayServices"
                                  onClick={() => {
                                    
                                    setDocId(i.id)
                                    setSSS({
                                      ...sss, ...{
                                        service: i.service,
                                      }
                                    })


                                    setServiceDesc(i.description)



                                    setIsEdit(true)
                                    document.getElementById(k + i.service + "button").classList.add('d-none')
                                    document.getElementById(k + i.service + "action").classList.remove('d-none')
                                  }}
                                  type="button" class="btn btn-primary">Edit</button>

                                <button
                                  onClick={() => {

                                    viewCreatedTemplate(i)
                                    setSelectedItem(i)
                                    document.getElementById(k + i.service + "button").classList.add('d-none')
                                    document.getElementById(k + i.service + "action").classList.remove('d-none')
                                  }}
                                  type="button" class="btn btn-warning ms-3">View</button>

                                <button
                                  data-bs-toggle="modal" data-bs-target="#deleteConfirmModal"

                                  onClick={() => {
                                    setSelectedItem(i)
                                    document.getElementById(k + i.service + "button").classList.add('d-none')
                                    document.getElementById(k + i.service + "action").classList.remove('d-none')
                                  }}
                                  type="button" class="btn btn-danger ms-3">Delete</button>

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

            {/* Barangay services */}

          </div>

          {/* Modal */

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
                    <label class="form-label fw-bold">{selectedItem != null && selectedItem.full_name}</label>
                    {/* <input
                      value={selectedItem != null && selectedItem.full_name}
                      onChange={(val) => {
                        if (selectedItem != null) {
                          setSelectedItem({
                            ...selectedItem,
                            full_name: val.target.value
                          })
                        }
                      }}
                      class="form-control" /> */}
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Chairmanship</label>
                    <input
                      value={selectedItem != null && selectedItem.chairmanship}
                      onChange={(val) => {
                        if (selectedItem != null) {
                          setSelectedItem({
                            ...selectedItem,
                            chairmanship: val.target.value
                          })
                        }
                      }}
                      class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Position</label>
                    <input
                      value={selectedItem != null && selectedItem.position}
                      onChange={(val) => {
                        if (selectedItem != null) {
                          setSelectedItem({
                            ...selectedItem,
                            position: val.target.value
                          })
                        }
                      }}
                      class="form-control" />
                  </div>
                  {/* <div class="mb-3">
                    <label class="form-label">Status</label>
                    <input
                      value={selectedItem != null && selectedItem.status}
                      onChange={(val) => {
                        if (selectedItem != null) {
                          setSelectedItem({
                            ...selectedItem,
                            status: val.target.value
                          })
                        }
                      }}
                      class="form-control" />
                  </div> */}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button onClick={() => updateOfficial()} type="button" class="btn btn-primary bg-green" data-bs-dismiss="modal">Save changes</button>
                </div>
              </div>
            </div>
          </div>



          {/* Add official */}
          <div class="modal fade" id="addOfficialModal" tabindex="-1" aria-labelledby="addOfficialModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="addOfficialModalLabel">Add</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label class="form-label">Search name</label>
                    <input
                      id='selctednameadd'
                      // value={selectedItem != null && selectedItem.full_name}
                      onChange={(val) => {

                        searchAddOfficial(val.target.value)
                      }}
                      class="form-control" />
                    {
                      searchVal != "" &&
                      <div className="box position-absolute col-lg-12" style={{ maxHeight: "300px", overflow: "scroll" }}>
                        {
                          searchOfficial.map((i, k) => {
                            return (
                              <div
                                onClick={() => {
                                  document.getElementById('selctednameadd').value = i.first_name + " " + i.middle_name + " " + i.last_name
                                  setSearchVal('')
                                  setSelectedSearchItem(i)
                                }}
                                className="search-item pointer">
                                <span>
                                  {i.first_name + " " + i.middle_name + " " + i.last_name}
                                </span>
                              </div>
                            )
                          })
                        }
                      </div>
                    }
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Chairmanship</label>
                    <input
                      value={selectedSearchItem != null && selectedSearchItem.chairmanship}
                      onChange={(val) => {
                        if (selectedSearchItem != null) {
                          setSelectedSearchItem({
                            ...selectedSearchItem,
                            chairmanship: val.target.value
                          })
                        }
                      }}
                      class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Position</label>
                    <input
                      value={selectedSearchItem != null && selectedSearchItem.position}
                      onChange={(val) => {
                        if (selectedSearchItem != null) {
                          setSelectedSearchItem({
                            ...selectedSearchItem,
                            position: val.target.value
                          })
                        }
                      }}
                      class="form-control" />
                  </div>
                  {/* <div class="mb-3">
                    <label class="form-label">Status</label>
                    <input
                      value={selectedSearchItem != null && selectedSearchItem.status}
                      onChange={(val) => {
                        if (selectedSearchItem != null) {
                          setSelectedSearchItem({
                            ...selectedSearchItem,
                            status: val.target.value
                          })
                        }
                      }}
                      class="form-control" />
                  </div> */}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" data-bs-dismiss="modal" onClick={() => addOfficial()} class="btn btn-primary bg-green">Save changes</button>
                </div>
              </div>
            </div>
          </div>

          {/* Add official */}


          {/* Add Resident */}

          { }

          <div class="modal fade" id="addResidentModal" tabindex="-1" aria-labelledby="addResidentModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content" style={{ maxHeight: "720px", overflowY: "scroll" }}>
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="addOfficialModalLabel"> {isEdit ? "Edit Resident" : "Add Resident"}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label class="form-label">First name</label>
                    <input
                      id='fnameinput'
                      value={resident.first_name}
                      onChange={(val) => {

                        if (val.target.value != "") {
                          document.getElementById('fnameinput').style.border = '1px solid #dee2e6'
                        }
                        else {
                          document.getElementById('fnameinput').style.border = '1px solid red'
                        }

                        setResident({
                          ...resident, ...{
                            first_name: val.target.value
                          }
                        })

                      }}
                      class="form-control" />

                  </div>

                  <div class="mb-3">
                    <label class="form-label">Middle name</label>
                    <input
                      value={resident.middle_name}
                      onChange={(val) => {

                        setResident({
                          ...resident, ...{
                            middle_name: val.target.value
                          }
                        })

                      }}
                      class="form-control" />

                  </div>

                  <div class="mb-3">
                    <label class="form-label">Last name</label>
                    <input
                      id='lnameinput'
                      value={resident.last_name}
                      onChange={(val) => {

                        if (val.target.value != "") {
                          document.getElementById('lnameinput').style.border = '1px solid #dee2e6'
                        }
                        else {
                          document.getElementById('lnameinput').style.border = '1px solid red'
                        }

                        setResident({
                          ...resident, ...{
                            last_name: val.target.value
                          }
                        })

                      }}
                      class="form-control" />

                  </div>

                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input
                      id='emailinput'
                      value={resident.email || resident.Email}
                      onChange={(val) => {
                        if (val.target.value != "") {
                          document.getElementById('emailinput').style.border = '1px solid #dee2e6'
                        }
                        else {
                          document.getElementById('emailinput').style.border = '1px solid red'
                        }
                        setResident({
                          ...resident, ...{
                            email: val.target.value
                          }
                        })

                      }}
                      class="form-control" />

                  </div>

                  <div class="mb-3 d-flex flex-column">
                    <label class="form-label">Birthday</label>
                    <DatePicker
                      id='bdayinput'
                      className="w-100 form-control"
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      selected={startDate} onChange={(date) => {
                        document.getElementById('bdayinput').style.border = '1px solid #dee2e6'


                        setResident({
                          ...resident, ...{
                            birthday: date
                          }
                        })
                        setStartDate(date)
                      }
                      } />
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Phone number</label>
                    <input
                      id='phoneinput'
                      value={resident.cell_number}
                      onChange={(val) => {

                        if (val.target.value != "") {
                          document.getElementById('phoneinput').style.border = '1px solid #dee2e6'
                        }
                        else {
                          document.getElementById('phoneinput').style.border = '1px solid red'
                        }

                        setResident({
                          ...resident, ...{
                            cell_number: val.target.value
                          }
                        })

                      }}
                      class="form-control" />

                  </div>



                  <div id='genderinput' class="mb-3">
                    <label class="form-label">Gender</label>
                    <div class="form-check">
                      <input
                        checked={resident.male_female == 0}
                        onChange={() => {


                          document.getElementById('genderinput').style.border = '0px solid #dee2e6'


                          setResident({
                            ...resident, ...{
                              male_female: 0
                            }
                          })
                        }}
                        class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Male
                      </label>
                    </div>

                    <div class="form-check">
                      <input
                        checked={resident.male_female == 1}
                        onChange={() => {


                          document.getElementById('genderinput').style.border = '0px solid #dee2e6'

                          setResident({
                            ...resident, ...{
                              male_female: 1
                            }
                          })
                        }}
                        class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Female
                      </label>
                    </div>

                  </div>


                  <div class="mb-3">
                    <label class="form-label">Civil Status</label>

                    <select
                      value={resident.civil_status_id}
                      id='civilinput'
                      onChange={(v) => {
                        document.getElementById('civilinput').style.border = '0px solid #dee2e6'
                        setResident({
                          ...resident, ...{
                            civil_status_id: v.target.value
                          }
                        })
                      }}
                      class="form-select" aria-label="Default select example">
                      <option selected>Civil status</option>
                      <option value="0">Single</option>
                      <option value="1">Married</option>
                      <option value="2">Widowed</option>
                      <option value="3">Legally Separated</option>
                    </select>

                  </div>



                </div>
                <div class="modal-footer">
                  <button type="button" onClick={() => { }} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" onClick={() => addResident()} class="btn btn-primary bg-green">Save changes</button>
                </div>
              </div>
            </div>
          </div>

          {/* Add Resident */}


          {/* Add barangay services */}

          <div id="addBarangayServices" class="modal" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">{isEdit ? "Edit" : "Add"} Barangay Services</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                  <div id='certificateinput' class="mb-3">
                    <label class="form-label">Is this a certificate?</label>
                    <div class="form-check">
                      <input
                        checked={isCert == 1 ? true : false}
                        onChange={() => {


                          // document.getElementById('genderinput').style.border = '0px solid #dee2e6'


                          setIsCert(1)
                        }}
                        class="form-check-input" type="radio" name="isCertificate" id="isCertificate" />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Yes
                      </label>
                    </div>

                    <div class="form-check">
                      <input
                        checked={isCert == 0 ? true : false}
                        onChange={() => {



                          // document.getElementById('genderinput').style.border = '0px solid #dee2e6'

                          setIsCert(0)

                        }}
                        class="form-check-input" type="radio" name="isCertificate" id="isCertificate" />
                      <label class="form-check-label" for="flexRadioDefault2">
                        No
                      </label>
                    </div>

                  </div>

                  <div class="mb-3">
                    <label class="form-label">Document Title</label>
                    <input
                      id='serviceinput'
                      value={sss.service}
                      onChange={(val) => {
                        setSSS({
                          ...sss, ...{
                            service: val.target.value
                          }
                        })

                      }}
                      class="form-control" />

                  </div>

                  <div className="mb-3">

                    <label class="form-label">Legend</label>

                    <span className="ms-3" style={{ fontSize: "12px", color: "red" }}>Ex. {'{first_name}'} as placeholder</span>


                  </div>

                  {/* <div className="mb-3">
                    <label class="form-label">For Barangay ID</label>

                    <span className="ms-3">Ex. {'{first_name}'}  {'{middle_name}'} {'{last_name'} {'{address}'}as placeholder</span>
                  </div> */}

                  <div class="mb-3">
                    <label class="form-label">Description</label>

                    <ReactQuill
                      //  value={formik.values.message}
                      value={serviceDesc}
                      onChange={(val) => {
                        setServiceDesc(val)
                      }}
                      placeholder="Enter the message..........."
                    />


                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button data-bs-dismiss="modal" onClick={() => addDocumentType()} type="button" class="btn btn-primary bg-green">Save</button>
                </div>
              </div>
            </div>
          </div>

          {/* Add barangay services */}


          {/* Confirm delete modal */}
          { }

          <div id="deleteConfirmModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Delete</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Are you sure you want to delete <span className="fw-bold">{selectedItem != null && (selectedItem.full_name || selectedItem.service)}</span>?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button data-bs-dismiss="modal" onClick={() => {

                    tab == 0 && deleteOffials()
                    tab == 3 && deleteDocumentType()
                  }} type="button" class="btn btn-primary bg-green">Yes</button>
                </div>
              </div>
            </div>
          </div>



          {
            showSuccess &&
            <div id="statusModal " class="modal fade show d-block">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    {/* <h5 class="modal-title">Delete</h5> */}
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    {success ? message : "Something went wrong."}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onClick={() => setShowSuccess(false)}>Close</button>

                  </div>
                </div>
              </div>
            </div>
          }


          {/* Modal */}
        </div>
      </Auth>
    </main>
  );
}
