import React, { useEffect, useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { AiOutlineFilePdf, AiOutlineFileImage, AiOutlineFileWord, AiOutlineLink, AiOutlineDownload, AiOutlineFile, AiOutlineClose } from "react-icons/ai";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import axios from 'axios'

function Upload() {
    const [fileTypes, setFileTypes] = useState('');
    const [file, setFile] = useState(null);
    const [uploadState, setUploadState] = useState(null);

    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    useEffect(() => {
        setFile(acceptedFiles[0])
        console.log(file)

    }, [file]);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setFile(acceptedFiles[0]);
        console.log(acceptedFiles);
    }, [])

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/jpeg': [],
            'image/jpg': [],
            'image/png': [],
            'application/pdf': [],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
            'application/vnd.ms-excel': [],
            'application/msword': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
            'application/vnd.oasis.opendocument.text': [],
            'text/plain': [],

        },
        maxFiles: 10
    });


    const handleUploadFile = async (e) => {
        e.preventDefault()
        if (uploadState == "Uploading") {
            return;
        }

        const formData = new FormData();
        formData.append("fileName", file);

        console.log(file)

        try {
            const data = await axios({
                method: 'POST',
                url: 'api/file/single',
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then((response) => {
                console.log(response.data);
                setFile(null)

            }).then(() => {
                setTimeout(() => {
                    window.location.reload(true)
                }, 2000)
            })
        }
        catch (error) {
            console.log(error.message);
            setUploadState('Upload Failed');
        }
    }

    const files = acceptedFiles.map((file) => {
        return (
            <li key={file.path} className="border p-3 w-full flex flex-row items-center justify-between rounded-xl mb-4 shadow-sm hover:border-1 hover:border-violet-400 group hover:bg-indigo-50  ease-in-out duration-150 " >
                <div className='flex flex-row items-center justify-center '>
                    <div className=''>
                        {file.format == 'application/pdf' ? < AiOutlineFilePdf className='text-lg h-10 w-10 stroke text-gray-500' /> : null}
                        {file.format == 'image/jpeg' || file.format == 'image/jpg' ? < AiOutlineFileImage className='text-lg h-10 w-10 stroke text-gray-500' /> : null}
                        {file.format == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.format == 'application/msword' ? < AiOutlineFileWord className='text-lg h-10 w-10 stroke text-gray-500' /> : null}
                    </div>
                    <div>
                    </div>
                    <div className='ml-4 flex flex-col items-start'>
                        <div className='text-sm font-medium text-gray-500'> {file.path}</div>
                        <div className=' flex flex-row'>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row'>

                    <div className='border p-3 mr-4 rounded-full flex items-center justify-center hover:bg-indigo-100 hover:border-indigo-500 cursor-pointer ease-in-out duration-300 '>
                        < AiOutlineLink className='text-lg h-4 w-4 stroke text-gray-500' />
                    </div>
                    {/* <div className='border p-3 mr-0 rounded-full flex items-center justify-center hover:bg-indigo-100 hover:border-indigo-500 cursor-pointer ease-in-out duration-300 '>
                    < AiOutlineClose className='text-lg h-4 w-4 stroke text-gray-500' />
                </div> */}
                </div>

            </li >
        )
    })


    // name of the document -
    // icon based on its type -
    // a preview image of its content 1st page content
    // date and time of upload -
    // number of downloads - 

    return (
        <>
            <div className="grid grid-rows-1 grid-cols-4 p-8 py-10 m-auto border rounded-lg gap-4 lg:w-1/2 bg-[#f7f7f7] sticky top-0 w-full">


                <div className='col-span-4 sticky top-0 mb-4'>
                    <div className='grid col-span-3 justify-items-end bg-[#f7f7f7]'  >
                        <div {...getRootProps({ className: 'dropzone p-12  border-2 bg-white rounded-lg border-dashed  cursor-pointer border-indigo-200 hover:border-indigo-500 w-full group hover:bg-indigo-50' })}>
                            <input {...getInputProps()} />
                            <p className='text-md text-gray-500 group-hover:text-indigo-500'>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <button className=' px-4 py-2 bg-indigo-500 font-medium text-md text-white rounded-md mt-4 w-40 hover:bg-indigo-600 ' onClick={(e) => handleUploadFile(e)}>Upload</button>
                    </div>

                </div>
                {files.length > 0 ?
                    <>
                        <div className='p-8 border row-span-3 col-span-3 bg-white rounded-lg'>
                            <ul className='flex flex-col items-start'>{files}</ul>

                        </div>
                        <div className=' border p-3 row-span-1 col-span-1 bg-white  rounded-lg flex flex-row justify-around '>
                            <div className=' flex flex-col p-2 items-center justify-center'>
                                <h1 className='font-bold text-md text-gray-500'>{files.length}</h1>
                                <h1 className='text-xs text-gray-400 font-medium'>Files selected to upload</h1>
                            </div>
                        </div>



                        <div className=' border p-3 row-span-1 col-span-1 bg-white  rounded-lg flex flex-row justify-around cursor-pointer hover:bg-indigo-100 hover:border-indigo-500'>
                            <div className=' flex flex-col p-2 items-center justify-center' onClick={() => { setIsPreviewVisible(!isPreviewVisible) }}>
                                < AiOutlineFile className='text-lg h-6 w-6 stroke text-gray-500 mb-2' />
                                <h1 className='text-xs text-gray-400 font-medium'>Preview {files.length} files </h1>
                            </div>
                        </div>
                    </>
                    : null

                }
            </div>
            {isPreviewVisible ?
                <div className=' border p-8 top-0 bg-white rounded-lg fixed w-full h-full '>
                    <div className='flex items-end justify-end cursor-pointer'>
                        <div className='px-4 py-2 border text-lg w-28 bg-gray-800 text-white rounded-md ' onClick={() => setIsPreviewVisible(false)}>Close</div>
                    </div>
                    <DocViewer
                        documents={acceptedFiles.map((file) => ({
                            uri: window.URL.createObjectURL(file),
                            fileName: file.name,
                        }))}

                        config={{
                            header: {
                                disableHeader: false,
                                disableFileName: false,
                                retainURLParams: false,
                            },
                            csvDelimiter: ",", // "," as default,
                            pdfZoom: {
                                defaultZoom: 1, // 1 as default,
                                zoomJump: 0.1, // 0.1 as default,
                            },
                        }}
                    />
                </div> : null}
        </>
    )
}

export default Upload