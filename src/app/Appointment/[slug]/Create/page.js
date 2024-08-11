'use client'
import Button from "@/components/Button";
import { generateOTPapi, otpLoginApi } from "@/redux/reducer/resident";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useDropzone } from 'react-dropzone'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import 'react-quill/dist/quill.snow.css';
export default function CreateAppointment() {

    const dispatch = useDispatch()
    const router = useRouter()

    const [birthday, setBirthday] = useState('1992-11-03')
    const [email, setEmail] = useState('afeil@example.net')
    const [otp, setOTP] = useState('')
    const [success, setSuccess] = useState(false)
    const [successOTP, setSuccessOTP] = useState(false)

    const [accessToken, setAccessToken] = useState('')
    // afeil@example.net
    // 1992-11-03
    const [files, setFiles] = useState([]);

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
                console.error("Error reading files: ", error);
            });
    }, []);

      console.log('final', files)
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop,    accept: {
        'image/*': [] // Accept only image files
      } })


    const submit = () => {
        let merge = {
            email,
            birthday
        }

        const fetchData = async () => {

            try {
                const result = await dispatch(generateOTPapi(merge)).unwrap();

                
                // Handle success, e.g., navigate to another page
                setSuccess(result.success)
            } catch (error) {

                // Handle error, e.g., show an error message
            }
        };

        fetchData();

    }

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

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        
        if (selectedFile) {
            setFiles(selectedFile);
        }
    };


    return (
        <main >
            <div className=" d-flex bg-white bg-3 align-items-center justify-content-center flex-column">

                <div className="schedule-form p-4 col-6 rounded">

                    <h4>
                        Scheduling Form
                    </h4>

                    {/* {
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
                        success && 

                        <div className="d-flex flex-column mt-5">
                        <span className="">OTP</span>
                        <input
                            // onKeyDown={handleKeyDown}
                            onChange={(v) => setOTP(v.target.value)}
                            value={otp}
                            type="email" className="form-control rounded mt-3" placeholder="Enter otp received in your email address" />
                    </div>
                    } */}

                    {
                        !success &&
                        <div>
                            <DatePicker
                                showMonthDropdown={true}
                                showYearDropdown={true}
                            />

                            <div {...getRootProps()} className="mt-5" style={{borderStyle:"dotted"}}>
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
                                            return(
                                                <div>
                                                        <span>{i.fileName}</span>
                                                </div>
                                            )
                                        })
                                    }
                                 </div>  
                        </div>
                    }

                    <button onClick={() => {

                        if (!success && !successOTP) {
                            submit()
                        }
                        else if (success && !successOTP) {
                            submitOTP()
                        }

                    }} type="button" class="btn btn-primary bg-green mt-5 col-12" >Proceed</button>

                </div>


            </div>
        </main>
    );
}
