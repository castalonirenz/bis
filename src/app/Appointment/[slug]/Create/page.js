'use client'
import Button from "@/components/Button";
import { createAppointmentApi, generateOTPapi, otpLoginApi } from "@/redux/reducer/resident";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from 'react-dropzone'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-quill/dist/quill.snow.css';
import { getDocumentTypeApi } from "@/redux/reducer/document";
import moment from "moment";
export default function CreateAppointment() {

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);

    const dispatch = useDispatch()
    const router = useRouter()

    // const [birthday, setBirthday] = useState('1992-11-03')
    // const [email, setEmail] = useState('afeil@example.net')

    const [birthday, setBirthday] = useState('')
    const [email, setEmail] = useState('')

    const [otp, setOTP] = useState('')
    const [success, setSuccess] = useState(false)
    const [successOTP, setSuccessOTP] = useState(false)

    const [accessToken, setAccessToken] = useState('')
    const [files, setFiles] = useState([]);
    const [selectedFileForViewing, setSelectedFileForViewing] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedDoc, setSelectedDoc] = useState(0);
    const documentList = useSelector(state => state.document.list.data)

    const [showSuccess, setShowSuccess] = useState(false)
    const [message, setMessage] = useState('')




    const onDrop = useCallback((acceptedFiles) => {
        // Convert files to base64 and update state
        const fileReaders = acceptedFiles.map(file => {
            const reader = new FileReader();

            return new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    resolve({
                        fileName: file.name,
                        base64: reader.result
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders)
            .then(filesWithBase64 => {
                // Update state with new files
                setFiles(prevFiles => [...prevFiles, ...filesWithBase64]);
            })
            .catch(error => {
                // Handle error

            });
    }, []);



    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'image/*': [] // Accept only image files
        }
    })


    const getDocumentList = async () => {
        let data = {
            token: accessToken,
            currentPage: 1,
            searchItemList: ''
        }




        try {
            const result = await dispatch(getDocumentTypeApi(data)).unwrap();




            // Handle success, e.g., navigate to another page
        } catch (error) {

            // Handle error, e.g., show an error message
        }


        //   fetchData();

    }



    const submit = () => {
        let merge = {
            email,
            birthday
        }

        const fetchData = async () => {

            try {
                const result = await dispatch(generateOTPapi(merge)).unwrap();

                



                if (result.error) {
                    setShowSuccess(true)
                    setMessage(result.error_msg)
                }
                else {
                    setSuccess(result.success)
                }
                // Handle success, e.g., navigate to another page

            } catch (error) {

                // Handle error, e.g., show an error message
            }
        };

        fetchData();

    }

    useEffect(() => {

        if (accessToken != "") {
            getDocumentList()
        }
    }, [accessToken])


    const submitOTP = () => {

        let merge = {
            email,
            otp
        }

        const fetchData = async () => {

            try {

                const result = await dispatch(otpLoginApi(merge)).unwrap();


                // Handle success, e.g., navigate to another page
                setSuccessOTP(result.success)
                setAccessToken(result.access_token)

            } catch (error) {

                // Handle error, e.g., show an error message
            }
        };

        fetchData();
    }

    const createAppoint = async () => {

        let base64List = []

        files.map((i, k) => {
            base64List.push(i.base64)
        })

        let data = {
            id: selectedDoc,
            selectedDate: moment(selectedDate).format('YYYY-MM-DD'),
            file_upload: base64List,
            token: accessToken
        }



        try {

            const result = await dispatch(createAppointmentApi(data)).unwrap();



            // Handle success, e.g., navigate to another page


        } catch (error) {

            // Handle error, e.g., show an error message
        }

    }


    useEffect(() => {
        //rotp
        // 
        

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        let momentDate = moment(birthday, 'YYYY-MM-DD', true).isValid();

        
        if (emailRegex.test(email) && momentDate) {
            document.getElementById('rotp').disabled = false
        }
        else{
            document.getElementById('rotp').disabled = true
        }

    }, [email, birthday])


    return (
        <main >
            <div className=" d-flex bg-white bg-3 align-items-center justify-content-center flex-column">

                <div className="schedule-form p-4 col-6 rounded">

                    <h4>
                        Scheduling Form
                    </h4>

                    {
                        !success &&

                        <div>
                            <div className="d-flex flex-column mt-5">
                                <span className="">Email address</span>
                                <input
                                    // onKeyDown={handleKeyDown}
                                    onChange={(v) => setEmail(v.target.value)}
                                    value={email}
                                    type="email" className="form-control rounded mt-3" placeholder="Enter your email" />
                            </div>

                            <div className="d-flex flex-column mt-3">
                                <span className="">Birthday</span>
                                <input
                                    // onKeyDown={handleKeyDown}
                                    value={birthday}
                                    onChange={(v) => setBirthday(v.target.value)}
                                    className="form-control rounded mt-3" placeholder="YYYY-MM-DD" />
                            </div>

                        </div>
                    }
                    {
                        success && !successOTP &&

                        <div className="d-flex flex-column mt-5">
                            <span className="">OTP</span>
                            <input
                                // onKeyDown={handleKeyDown}
                                onChange={(v) => setOTP(v.target.value)}
                                value={otp}
                                type="email" className="form-control rounded mt-3" placeholder="Enter otp received in your email address" />
                        </div>
                    }

                    {
                        success && successOTP &&
                        <div>


                            <div className="d-flex flex-column" >
                                <label>Select date</label>

                                <Calendar
                                    onChange={(v) => {

                                        setSelectedDate(moment(v).format("YYYY-MM-DD"))

                                    }}
                                />
                            </div>



                            <div className="mt-3">
                                <label>Select service</label>

                                <select

                                    onChange={(v) => {
                                        setSelectedDoc(v.target.value)
                                    }}
                                    class="form-select" aria-label="Default select example">

                                    {documentList.map((i, k) => {

                                        return (
                                            <option value={i.id} key={k}>{i.service}</option>
                                        )

                                    })}
                                </select>
                            </div>


                            <div {...getRootProps()} className="mt-5" style={{ borderStyle: "dotted" }}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Drop the files here ...</p> :
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                }


                            </div>

                            <div className="mt-3">
                                {
                                    files.length != 0 && files.map((i, k) => {
                                        return (
                                            <div>
                                                <span>{i.fileName}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }

                    {
                        !success && !successOTP &&
                        <button
                            id='rotp'
                            disabled={true}
                            onClick={() => {
                                submit()
                            }} type="button" class="btn btn-primary bg-green mt-5 col-12" >Request OTP</button>


                    }

                    {
                        success && !successOTP &&
                        <button
                            onClick={() => {
                                submitOTP()
                            }} type="button" class="btn btn-primary bg-green mt-5 col-12" >Verify OTP</button>


                    }

                    {
                        success && successOTP &&
                        <button onClick={() => {
                            createAppoint()
                        }} type="button" class="btn btn-primary bg-green mt-5 col-12" >Create appointment</button>


                    }

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
                                    {message}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" onClick={() => setShowSuccess(false)}>Close</button>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </main>
    );
}
