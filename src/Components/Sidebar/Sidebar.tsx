import '../../index.css'
import Logo from '../../../src/assets/Logo/Logo.png'
import Pages from '../../Components/Sidebar/Pages'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import DownloadOptions from './DownloadOptions'

type Props={
    obg?: string;
    vbg?: string;
    abg?: string;
    oicon?: string;
    vicon?: string;
    aicon?: string;
    otext?: string;
    vtext?: string;
    atext?: string;
    ohover?: string;
    vhover?: string;
    ahover?: string;
}

export default function Sidebar({
    obg, vbg, abg,
    oicon='black', aicon='black', vicon='black',
    otext='black', atext='black', vtext='black',
    ohover, ahover, vhover,
}: Props) {

    // Set to false initially so it starts expanded, or true for collapsed
    const [isHovering, setIsHovering] = useState(true)
    const [downloadOptions, setDownloadOptions] = useState(true)
    
    const Overviewicon= <svg width="20" height="20" viewBox="0 0 20 20" fill={oicon} xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 15.8333V8.74996C16.6667 8.62059 16.6366 8.49299 16.5787 8.37728C16.5208 8.26157 16.4368 8.16091 16.3333 8.08329L10.5 3.70829C10.3558 3.60011 10.1803 3.54163 10 3.54163C9.8197 3.54163 9.64426 3.60011 9.50001 3.70829L3.66668 8.08329C3.56318 8.16091 3.47918 8.26157 3.42132 8.37728C3.36346 8.49299 3.33334 8.62059 3.33334 8.74996V15.8333C3.33334 16.0543 3.42114 16.2663 3.57742 16.4225C3.7337 16.5788 3.94566 16.6666 4.16668 16.6666H7.50001C7.72102 16.6666 7.93299 16.5788 8.08927 16.4225C8.24555 16.2663 8.33334 16.0543 8.33334 15.8333V13.3333C8.33334 13.1123 8.42114 12.9003 8.57742 12.744C8.7337 12.5878 8.94566 12.5 9.16668 12.5H10.8333C11.0544 12.5 11.2663 12.5878 11.4226 12.744C11.5789 12.9003 11.6667 13.1123 11.6667 13.3333V15.8333C11.6667 16.0543 11.7545 16.2663 11.9108 16.4225C12.067 16.5788 12.279 16.6666 12.5 16.6666H15.8333C16.0544 16.6666 16.2663 16.5788 16.4226 16.4225C16.5789 16.2663 16.6667 16.0543 16.6667 15.8333Z" fill={oicon} stroke={oicon} stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

    const Vaults= <svg width="20" height="20" viewBox="0 0 20 20" fill={vicon} xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.66667 2.5C4.09203 2.5 3.54093 2.72827 3.1346 3.1346C2.72827 3.54093 2.5 4.09203 2.5 4.66667V7C2.5 7.57464 2.72827 8.12574 3.1346 8.53206C3.54093 8.93839 4.09203 9.16667 4.66667 9.16667H7C7.57464 9.16667 8.12574 8.93839 8.53206 8.53206C8.93839 8.12574 9.16667 7.57464 9.16667 7V4.66667C9.16667 4.09203 8.93839 3.54093 8.53206 3.1346C8.12574 2.72827 7.57464 2.5 7 2.5H4.66667ZM4.66667 10.8333C4.09203 10.8333 3.54093 11.0616 3.1346 11.4679C2.72827 11.8743 2.5 12.4254 2.5 13V15.3333C2.5 15.908 2.72827 16.4591 3.1346 16.8654C3.54093 17.2717 4.09203 17.5 4.66667 17.5H7C7.28453 17.5 7.56628 17.444 7.82915 17.3351C8.09202 17.2262 8.33087 17.0666 8.53206 16.8654C8.73326 16.6642 8.89285 16.4254 9.00174 16.1625C9.11062 15.8996 9.16667 15.6179 9.16667 15.3333V13C9.16667 12.4254 8.93839 11.8743 8.53206 11.4679C8.12574 11.0616 7.57464 10.8333 7 10.8333H4.66667ZM13 2.5C12.4254 2.5 11.8743 2.72827 11.4679 3.1346C11.0616 3.54093 10.8333 4.09203 10.8333 4.66667V7C10.8333 7.57464 11.0616 8.12574 11.4679 8.53206C11.8743 8.93839 12.4254 9.16667 13 9.16667H15.3333C15.6179 9.16667 15.8996 9.11062 16.1625 9.00174C16.4254 8.89285 16.6642 8.73326 16.8654 8.53206C17.0666 8.33087 17.2262 8.09202 17.3351 7.82915C17.444 7.56628 17.5 7.28453 17.5 7V4.66667C17.5 4.38214 17.444 4.10039 17.3351 3.83752C17.2262 3.57465 17.0666 3.3358 16.8654 3.1346C16.6642 2.93341 16.4254 2.77381 16.1625 2.66493C15.8996 2.55604 15.6179 2.5 15.3333 2.5H13ZM13 10.8333C12.4254 10.8333 11.8743 11.0616 11.4679 11.4679C11.0616 11.8743 10.8333 12.4254 10.8333 13V15.3333C10.8333 15.908 11.0616 16.4591 11.4679 16.8654C11.8743 17.2717 12.4254 17.5 13 17.5H15.3333C15.6179 17.5 15.8996 17.444 16.1625 17.3351C16.4254 17.2262 16.6642 17.0666 16.8654 16.8654C17.0666 16.6642 17.2262 16.4254 17.3351 16.1625C17.444 15.8996 17.5 15.6179 17.5 15.3333V13C17.5 12.7155 17.444 12.4337 17.3351 12.1709C17.2262 11.908 17.0666 11.6691 16.8654 11.4679C16.6642 11.2667 16.4254 11.1071 16.1625 10.9983C15.8996 10.8894 15.6179 10.8333 15.3333 10.8333H13Z" fill={vicon}/>
                    </svg>

    const Analysis= <svg width="20" height="20" viewBox="0 0 20 20" fill={aicon} xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 1.875C10 1.70924 10.0658 1.55027 10.1831 1.43306C10.3003 1.31585 10.4592 1.25 10.625 1.25C11.692 1.25 12.7485 1.46016 13.7343 1.86848C14.7201 2.2768 15.6158 2.87528 16.3702 3.62976C17.1247 4.38423 17.7232 5.27993 18.1315 6.2657C18.5398 7.25147 18.75 8.30801 18.75 9.375C18.75 9.54076 18.6841 9.69973 18.5669 9.81694C18.4497 9.93415 18.2908 10 18.125 10H10.625C10.4592 10 10.3003 9.93415 10.1831 9.81694C10.0658 9.69973 10 9.54076 10 9.375V1.875ZM8.75 4.4025C8.75 4.31568 8.73192 4.22981 8.6969 4.15036C8.66188 4.07092 8.61069 3.99964 8.5466 3.94108C8.4825 3.88251 8.40691 3.83794 8.32464 3.81021C8.24236 3.78247 8.15522 3.77219 8.06875 3.78C6.6493 3.90942 5.29613 4.44063 4.16772 5.31141C3.03931 6.1822 2.1824 7.3565 1.69735 8.69676C1.21231 10.037 1.11922 11.4877 1.42899 12.879C1.73876 14.2703 2.43856 15.5445 3.44643 16.5523C4.45429 17.5602 5.72847 18.26 7.11974 18.5698C8.511 18.8795 9.96173 18.7864 11.302 18.3014C12.6423 17.8164 13.8165 16.9594 14.6873 15.831C15.5581 14.7026 16.0893 13.3494 16.2187 11.93C16.2264 11.8437 16.216 11.7568 16.1882 11.6748C16.1605 11.5928 16.116 11.5174 16.0576 11.4534C15.9992 11.3895 15.9281 11.3384 15.8489 11.3034C15.7697 11.2684 15.6841 11.2502 15.5975 11.25H8.75V4.4025Z" fill={aicon}/>
                    </svg>

    const DownloadButton= <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.625 15.513C11.5083 15.471 11.4 15.4 11.3 15.3L7.7 11.7C7.5 11.5 7.404 11.2667 7.412 11C7.42 10.7333 7.516 10.5 7.7 10.3C7.9 10.1 8.13767 9.996 8.413 9.988C8.68833 9.98 8.92567 10.0757 9.125 10.275L11 12.15V5C11 4.71667 11.096 4.47934 11.288 4.288C11.48 4.09667 11.7173 4.00067 12 4C12.2827 3.99934 12.5203 4.09534 12.713 4.288C12.9057 4.48067 13.0013 4.718 13 5V12.15L14.875 10.275C15.075 10.075 15.3127 9.979 15.588 9.987C15.8633 9.995 16.1007 10.0993 16.3 10.3C16.4833 10.5 16.5793 10.7333 16.588 11C16.5967 11.2667 16.5007 11.5 16.3 11.7L12.7 15.3C12.6 15.4 12.4917 15.471 12.375 15.513C12.2583 15.555 12.1333 15.5757 12 15.575C11.8667 15.5743 11.7417 15.5537 11.625 15.513ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V16C4 15.7167 4.096 15.4793 4.288 15.288C4.48 15.0967 4.71733 15.0007 5 15C5.28267 14.9993 5.52033 15.0953 5.713 15.288C5.90567 15.4807 6.00133 15.718 6 16V18H18V16C18 15.7167 18.096 15.4793 18.288 15.288C18.48 15.0967 18.7173 15.0007 19 15C19.2827 14.9993 19.5203 15.0953 19.713 15.288C19.9057 15.4807 20.0013 15.718 20 16V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z" fill="#0064CA"/>
                            </svg>

    const Arrow= <svg className={`${downloadOptions ? 'rotate-0' : 'rotate-180'} transition-all ease-in-out duration-500`}  width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_3243_1899)">
                            <path d="M6.57999 9.54801L5.51999 8.48701L11.297 2.70801C11.3896 2.61486 11.4996 2.54093 11.6209 2.49048C11.7421 2.44003 11.8722 2.41406 12.0035 2.41406C12.1348 2.41406 12.2648 2.44003 12.3861 2.49048C12.5073 2.54093 12.6174 2.61486 12.71 2.70801L18.49 8.48701L17.43 9.54701L12.005 4.12301L6.57999 9.54801Z" fill="black"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_3243_1899">
                            <rect width="12" height="24" fill="white" transform="matrix(0 -1 1 0 0 12)"/>
                            </clipPath>
                            </defs>
                            </svg>

    const Chainlink= <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.67 0L6.835 1.055L1.835 3.945L0 5V15L1.835 16.055L6.88083 18.945L8.71583 20L10.5508 18.945L15.505 16.055L17.34 15V5L15.505 3.945L10.505 1.055L8.67 0ZM3.67 12.89V7.11L8.67 4.22L13.67 7.11V12.89L8.67 15.78L3.67 12.89Z" fill="#007DFC"/>
                    </svg>

    return (
        <div className='fixed top-0 left-0 z-11 max-[850px]:hidden'>
        <motion.section 
            onMouseEnter={() => setIsHovering(false)}
            onMouseLeave={() => setIsHovering(true)}
            initial={false}
            animate={{ width: isHovering ? 100 : 280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white h-full flex flex-col p-[1.25em] justify-between overflow-hidden bordersr"
        >
            <section className={`flex gap-[3.125em] flex-col ${isHovering ? 'items-center' : 'items-start'}`}>
                {/* Logo Section */}
                <div className="flex gap-[1em] items-center h-[3em] overflow-hidden">
                    <img src={Logo} className="h-[2em] min-w-[2em]" alt="Trust lens logo" />
                    <AnimatePresence>
                        {!isHovering && (
                            <motion.p 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="text-h4 font-mfont font-medium whitespace-nowrap"
                            >
                                Trust lens
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pages Section */}
                <div className="flex flex-col gap-5">
                    <Pages name="Overview" link="/" logo={Overviewicon} bg={obg} text={otext} hover={ohover} hide={isHovering ? 'hidden' : 'block'} />
                    <Pages name="Vaults" link="/vaults" logo={Vaults} bg={vbg} text={vtext} hover={vhover} hide={isHovering ? 'hidden' : 'block'} />
                    <Pages name="Analysis" link="/analysis" logo={Analysis} bg={abg} text={atext} hover={ahover} hide={isHovering ? 'hidden' : 'block'} width={isHovering ? 'w-fit' : 'w-[250px]'} />
                </div>
            </section>

            {/* Bottom Section */}
            <section className={`flex flex-col gap-30 w-full overflow-hidden ${isHovering ? 'items-center' : 'items-start'}`}>
                {/* Download Audit */}
                <section className='flex flex-col gap-20'>
                    <div onClick={() => setDownloadOptions(!downloadOptions)} className={`cursor-pointer flex gap-5 items-center justify-between ${isHovering ? 'w-fit' : 'w-full'}`}>
                        <div className="flex gap-5 items-center">
                            {DownloadButton}
                            <AnimatePresence>
                                {!isHovering && (
                                    <motion.p 
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="font-mfont text-p whitespace-nowrap overflow-hidden"
                                    >
                                        Download Audit
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        {!isHovering && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                {Arrow}
                            </motion.div>
                        )}
                    </div>

                    <DownloadOptions display={downloadOptions ? 'hidden' : 'flex'} />
                </section>

                {/* Powered by */}
                <div className="flex items-center gap-5 min-h-20">
                    <AnimatePresence>
                        {!isHovering && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-p font-mfont text-black whitespace-nowrap">
                                Powered
                            </motion.p>
                        )}
                    </AnimatePresence>
                    <p className="text-p font-mfont text-black">by</p>
                    {Chainlink}
                    <AnimatePresence>
                        {!isHovering && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-p font-mfont text-blue whitespace-nowrap">
                                Chainlink
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </motion.section>
        </div>
    )
}