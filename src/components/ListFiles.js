import React, { useEffect, useState } from 'react'
import { AiOutlineFilePdf, AiOutlineFileImage, AiOutlineFileWord, AiOutlineLink, AiOutlineDownload, AiOutlineFile, AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import fileDownload from 'js-file-download';

function ListFiles() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [file, setFile] = useState([{
        path: "Resume.pdf",
        lastModified: 1671806652904,
        lastModifiedDate: "Fri Dec 23 2022 15:44:12 GMT+0100 (Central European Standard Time",
        name: "Resume.pdf",
        size: 35006,
        format: "application/pdf"
    }])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get('/api/file/');
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    // console.log(data[0].date.split('T')[1].split('.')[0])



    const downloadFile = async (id, name) => {

        console.log(`file data ---  ${id}, ${name}`);
        setLoading(true);
        try {
            axios({
                url: `/api/file/${id}`,
                method: 'get',
                responseType: "blob"
            }).then((response) => {
                fileDownload(response.data, name)
            })
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    }

    return (
        <div className='mx-auto w-full md:w-1/2 lg:w-1/2 py-8 px-4 md:px-0 lg:px-0'>
            {data.map((file) => (
                <li key={file.path} className="border p-3 w-full lg:w-full md:full flex flex-col lg:flex-row items-center justify-between rounded-xl mb-4 shadow-sm hover:border-1 hover:border-violet-400 group hover:bg-indigo-50  ease-in-out duration-150 " >
                    <div className='flex flex-row items-center justify-center '>
                        <div className=''>
                            {file.format == 'application/pdf' ? < AiOutlineFilePdf className='text-lg h-10 w-10 stroke text-gray-500' /> : null}
                            {file.format == 'image/jpeg' || file.format == 'image/jpg' ? < AiOutlineFileImage className='text-lg h-10 w-10 stroke text-gray-500' /> : null}
                            {file.format == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.format == 'application/msword' ? < AiOutlineFileWord className='text-lg h-10 w-10 stroke text-gray-500' /> : null}
                        </div>

                        <div className='ml-4 flex flex-col items-start  py-4 lg:p-0 '>
                            <div className='text-sm font-medium text-gray-500'> {file.fileName}</div>
                            <div className=' flex flex-row'>
                                <div className='text-xs font-normal text-gray-400 mt-1'> {file.fileDownloadCount}  Downloads </div>
                                <div className='text-xs font-normal text-gray-400 mt-1 ml-3 border-l px-3'>  Uploaded on {file.date.split('T')[0]} at {file.date.split('T')[1].split('.')[0]}  </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='border p-3 mr-4 rounded-full flex items-center justify-center hover:bg-indigo-100 hover:border-indigo-500 cursor-pointer ease-in-out duration-300 ' onClick={(e) => downloadFile(file._id, file.fileName)}>
                            < AiOutlineDownload className='text-lg h-4 w-4 stroke text-gray-500' />
                        </div>
                        <div className='border p-3 mr-4 rounded-full flex items-center justify-center hover:bg-indigo-100 hover:border-indigo-500 cursor-pointer ease-in-out duration-300 '>
                            < AiOutlineLink className='text-lg h-4 w-4 stroke text-gray-500' />
                        </div>
                        {/* <div className='border p-3 mr-0 rounded-full flex items-center justify-center hover:bg-indigo-100 hover:border-indigo-500 cursor-pointer ease-in-out duration-300 '>
                    < AiOutlineClose className='text-lg h-4 w-4 stroke text-gray-500' />
                </div> */}
                    </div>

                </li >))}
        </div>
    )
}

export default ListFiles