import { useState } from "react";
import { motion } from "framer-motion";


import { BsFillEmojiLaughingFill } from "react-icons/bs";

export default function ExpandingBox(props) {
    
    const { isOpen, setIsOpen, handleEmoji,  showEmojiBox, setShowEmojiBox  } = props.value
    return (
        <div className="absolute top-[10px] right-7 ">
            <div className="w-10 h-10 bg-white overflow-hidden relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isOpen ? "100%" : 0 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                    className="h-full absolute right-0"
                >
                    <div className="w-full h-full flex flex-row items-center justify-items-center">
                        <BsFillEmojiLaughingFill onClick={() => { setShowEmojiBox(!showEmojiBox) }} className=' text-2xl font-semibold text-yellow-300' />
                       
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
