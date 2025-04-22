import React, { useState } from 'react'

import { GrNotes } from "react-icons/gr";
import { FaImages } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { SiWikibooks } from "react-icons/si";
import EmojiPicker from 'emoji-picker-react';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import ExpandingBox from './subComponents/ExpandingBox';
import { RxCross1 } from "react-icons/rx";
import axiosInstance from '../api/AxiosInstance';
import { toasterror, toastinfo, toastsuccess } from './Toast';
import CarouselComponent from './subComponents/CarouselComponent'

const PostUploadComponent = () => {
    const [showEmojiBox, setShowEmojiBox] = useState(false);
    const [text, setText] = useState('');
    const [selectForm, setselectForm] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [uploadImages, setUploadImages] = useState([]);

    const handleInputChanger = (e) => {
        setShowEmojiBox(false)
        let value = e.target.value;
        setText(value)
    }

    const handleEmoji = (e) => {
        let ans = text.concat(e.emoji);
        setText(ans)
    }

    const handlefiles = (e) => {
        const file = [...e.target.files]
        console.log(file)
        setUploadImages(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        const files = [...uploadImages]

        if(!text){
            toasterror('Add text to Post!!')
            return;
        }
        if (!uploadImages.length) {
            toastinfo("No files selected!");
            try {
                const response = await axiosInstance.post('/post/createPost',{title:text})
                const data = response.data
                if(data.success){
                    toastsuccess(data.msg)
                    setText('')
                }
                else{
                    toasterror(data.msg)
                }
            } catch (error) {
                console.log(`${error}`)
            }
            return;
        }

        formData.append('title', text);

        uploadImages.forEach((file, index) => formData.append(`file`, file));

        try {
            const response = await axiosInstance.request({
                method: "POST",
                headers: {
                    'Content-Type': "multipart/form-data"
                },
                url: '/fileUpload/photos/upload',
                data: formData,
            })
            const data = response.data
            if(data.success){
                toastsuccess(data.msg)
                setUploadImages([])
                setText('')
            }
            else{
                toasterror(data.msg)
            }
        } catch (error) {
            console.log(`${error}`)
        }
    }
    return (
        <section className='w-[500px] m-auto'>
            <div className='bg-gray-400'>
                <ul className='border flex flex-row gap-2'>
                    <li onClick={() => setselectForm(1)} className='px-2 py-2 capitalize flex flex-row items-center gap-2 text-lg '>
                        <GrNotes /><p>Status</p>
                    </li>
                    <li onClick={() => setselectForm(2)} className='px-2 py-2 capitalize flex flex-row items-center gap-2 text-lg '>
                        <FaImages /><p>photo</p>
                    </li>
                    <li onClick={() => setselectForm(3)} className='px-2 py-2 capitalize flex flex-row items-center gap-2 text-lg '>
                        <MdPlace /><p>place</p>
                    </li>
                    <li onClick={() => setselectForm(4)} className='px-2 py-2 capitalize flex flex-row items-center gap-2 text-lg '>
                        <SiWikibooks /><p>live event</p>
                    </li>
                </ul>
            </div>
            <div className='bg-gray-300 p-1 '>
                <div className='relative'>
                    {
                        selectForm == 1 && <span><input value={text} onChange={handleInputChanger} className='h-15 px-3 bg-white w-full placeholder:text-xl capitalize' type="text" name="" id="" placeholder='test' />
                            {
                                !isOpen ? <MdOutlineKeyboardDoubleArrowLeft className='absolute top-4.5 right-1  text-2xl font-semibold' onClick={() => setIsOpen(!isOpen)} />
                                    :
                                    <RxCross1 onClick={() => { setIsOpen(!isOpen); setShowEmojiBox(!showEmojiBox) }} className='absolute top-5 right-1  text-xl font-semibold' />
                            }
                            <EmojiPicker style={{ position: 'absolute', right: '0' }} searchDisabled={true} open={showEmojiBox} onEmojiClick={handleEmoji} />

                            <ExpandingBox value={{ isOpen, setIsOpen, handleEmoji, showEmojiBox, setShowEmojiBox }} /></span>
                    }
                    {
                        selectForm == 2 && <span className="w-full bg-white h-15 flex flex-row justify-center items-center">
                            <label htmlFor="upload" className='px-3 py-2 rounded bg-blue-400' >Upload</label>
                            <input type="file" name="files" id="upload" multiple hidden onChange={handlefiles} />
                        </span>
                    }
                    {
                        selectForm == 3 && <span><input value={text} onChange={handleInputChanger} className='h-15 px-3 bg-white w-full placeholder:text-xl capitalize' type="text" name="" id="" placeholder='test' />
                            <MdOutlineKeyboardDoubleArrowLeft className='absolute top-5 right-1  text-2xl font-semibold' onClick={() => setIsOpen(!isOpen)} />
                            <EmojiPicker style={{ position: 'absolute', right: '0' }} searchDisabled={true} open={showEmojiBox} onEmojiClick={handleEmoji} />

                            <ExpandingBox value={{ isOpen, setIsOpen, handleEmoji, showEmojiBox, setShowEmojiBox }} /></span>
                    }
                    {
                        selectForm == 4 && <span><input value={text} onChange={handleInputChanger} className='h-15 px-3 bg-white w-full placeholder:text-xl capitalize' type="text" name="" id="" placeholder='test' />
                            <MdOutlineKeyboardDoubleArrowLeft className='absolute top-5 right-1  text-2xl font-semibold' onClick={() => setIsOpen(!isOpen)} />
                            <EmojiPicker style={{ position: 'absolute', right: '0' }} searchDisabled={true} open={showEmojiBox} onEmojiClick={handleEmoji} />

                            <ExpandingBox value={{ isOpen, setIsOpen, handleEmoji, showEmojiBox, setShowEmojiBox }} /></span>
                    }
                </div>
                {/* <input className='' type="file" name="" id="" /> */}
            </div>
            {uploadImages && <div>

                <CarouselComponent value={{uploadImages}}/>
                
            </div>}
            {
                (text != ''  || uploadImages.length > 0) &&<button onClick={handleSubmit} className='w-full py-3 px-2 bg-green-400 rounded-xl uppercase font-bold text-white mt-1'>submit</button>
            }
        </section>
    )
}

export default PostUploadComponent
