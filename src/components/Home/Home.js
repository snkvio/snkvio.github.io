import * as ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap'
import { useState, useEffect } from "react";

// blockchain
import connectToMetaMask from "../../utils/connectToMetaMask";
import web3 from "../../utils/web3"
import contract from "../../utils/contract";

// images
import logo from '../../img/logo.png';
import manWalkingWithSneakers from '../../img/man-walking-with-sneakers.GIF';
import threeMenWalking from '../../img/three-men-walking.png';
import roadmap from '../../img/roadmap.png';
import roadmap2 from '../../img/roadmap-2.jpg';
import carlo from '../../img/Carlo.png';
import david from '../../img/David.PNG';
import joseph from '../../img/Joseph.png';
import gian from '../../img/Gian.png';
import prototype from '../../img/prototype.png';
import floppyDrogoLogo from '../../img/floppy-drogo-logo.png';
import ininjaLogo from '../../img/ininja-logo.png';
import kcgPartnershipLogo from '../../img/kcg-partnership-logo.png';
import metaD from '../../img/meta-d.png';
import daybreak from '../../img/daybreak.png';

function Home(props) {
    const [inputsValues, setInputsValues] = useState({
        quantity: 1,
    })

    // Modals
    const [showModalQuantity, setShowModalQuantity] = useState(false);
    const handleCloseModalQuantity = () => setShowModalQuantity(false);
    const handleShowModalQuantity = () => setShowModalQuantity(true);
    const [showModalProcessing, setShowModalProcessing] = useState(false);
    const handleCloseModalProcessing = () => setShowModalProcessing(false);
    const handleShowModalProcessing = () => setShowModalProcessing(true);
    const [showModalMinted, setShowModalMinted] = useState(false);
    const handleCloseModalMinted = () => setShowModalMinted(false);
    const handleShowModalMinted = () => setShowModalMinted(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputsValues({ ...inputsValues, [name]: value });
    }
    let viewTeamDescription = function(e) {
        ReactDOM.findDOMNode(e.currentTarget).getElementsByClassName('team-description')[0].style.top = "0";
    };
    let hideTeamDescription = function(e) {
        ReactDOM.findDOMNode(e.currentTarget).getElementsByClassName('team-description')[0].style.top = "100%";
    };
    let showQuantityModal = function() {
        handleShowModalQuantity();

        // modalQuantity.classList.add("show");
        // modalQuantity.style.display = "block";

        // modalProcessing.show();
        // modalMinted.show();
    };
    let mint = async function() {
        let address = await connectToMetaMask();

        if(address) {
            let owner;
            let cost = 0;
            let quantity = parseInt(inputsValues.quantity);

            await contract.methods.owner().call()
                .then(function(data){
                    owner = data;
                });

            if(web3.utils.toChecksumAddress(address) !== web3.utils.toChecksumAddress(owner)) {
                await contract.methods.cost().call()
                    .then(function(data){
                        cost = parseFloat(web3.utils.fromWei(data, 'ether'));
                    });
            }

            handleCloseModalQuantity();

            await contract.methods.mint(quantity).send({
                from: address,
                value: web3.utils.toWei((cost * quantity).toString(), 'ether')
            }).on('transactionHash', function(hash) {
                handleShowModalProcessing();
            }).on('error', function(error) {
                alert(error.message);
            }).then(function(receipt) {
                let tokenId;
                if(quantity > 1) {
                    tokenId = receipt.events.Transfer['0'].returnValues.tokenId;
                } else {
                    tokenId = receipt.events.Transfer.returnValues.tokenId;
                }

                handleCloseModalProcessing();
                handleShowModalMinted();

                document.getElementById('minted-message').innerHTML = "You have successfully minted your NFT" + ((quantity > 1) ? "s" : "") + ".";
                document.getElementById('opensea').href = "https://testnets.opensea.io/assets/mumbai/" + contract.options.address + "/" + tokenId;
            });
        } else {
            alert("Invalid address");
        }
    };

    useEffect(function() {

    });

    return (
        <div className="home">
            {/* Navbar*/}
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-color-1">
                <div className="container py-2">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Sneakerverse" />
                    </a>

                    <div className="d-flex d-lg-none">
                        <a className="btn btn-custom-1 d-flex align-items-center justify-content-center me-3" href="https://twitter.com/snkvrse" target="_blank" rel="noreferrer" style={{"width":"36px", "height":"36px"}}>
                            <i className="fab fa-twitter font-size-120"></i>
                        </a>

                        <a className="btn btn-custom-1 d-flex align-items-center justify-content-center me-3" href="https://discord.com/invite/hNgnnjRSnD" target="_blank" rel="noreferrer" style={{"width":"36px", "height":"36px"}}>
                            <i className="fab fa-discord font-size-120"></i>
                        </a>

                        <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    </div>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item px-2 px-xl-3 d-none d-lg-block">
                                <a className="btn btn-custom-1 d-flex align-items-center justify-content-center" href="https://twitter.com/snkvrse" target="_blank" rel="noreferrer">
                                    <i className="fab fa-twitter font-size-140"></i>
                                </a>
                            </li>
                            <li className="nav-item px-2 px-xl-3 d-none d-lg-block">
                                <a className="btn btn-custom-1 d-flex align-items-center justify-content-center" href="https://discord.com/invite/hNgnnjRSnD" target="_blank" rel="noreferrer">
                                    <i className="fab fa-discord font-size-140"></i>
                                </a>
                            </li>
                            <li className="nav-item font-size-90 font-size-xl-100 px-2 px-xl-3">
                                <a className="nav-link text-white font-size-110 font-weight-800 mt-3 mt-lg-0" href="#about-us">ABOUT&nbsp;US</a>
                            </li>
                            <li className="nav-item font-size-90 font-size-xl-100 px-2 px-xl-3">
                                <a className="nav-link text-white font-size-110 font-weight-800" href="#vision">VISION</a>
                            </li>
                            <li className="nav-item font-size-90 font-size-xl-100 px-2 px-xl-3">
                                <a className="nav-link text-white font-size-110 font-weight-800" href="#roadmap">ROADMAP</a>
                            </li>
                            <li className="nav-item font-size-90 font-size-xl-100 px-2 px-xl-3">
                                <a className="nav-link text-white font-size-110 font-weight-800" href="#core">CORE</a>
                            </li>
                            <li className="nav-item font-size-90 font-size-xl-100 px-2 px-xl-3">
                                <a className="nav-link text-white font-size-110 font-weight-800" href="#team">TEAM</a>
                            </li>
                            <li className="nav-item font-size-90 font-size-xl-100 px-2 ps-xl-3">
                                <a className="nav-link text-white font-size-110 font-weight-800" href="#partners">PARTNERS</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <div className="bg-color-1 overflow-hidden">
                <div className="container">
                    <div className="row position-relative">
                        <div className="col-lg-6 min-vh-100 d-flex align-items-center position-relative" id="header-section-1" style={{"zIndex":"1"}}>
                            <div className="w-100">
                                <h2 className="text-center text-color-1 font-weight-900 font-size-250 font-size-sm-360 font-size-xl-420 font-size-xxl-470 mb-4 pb-md-2">SNEAKERVERSE</h2>

                                <div className="text-center mb-4 mb-md-5">
                                    <button className="btn btn-custom-2 py-3 px-5">
                                        <div className="px-2 px-md-5 py-md-1 font-weight-500 font-size-140" onClick={showQuantityModal}>MINT NOW</div>
                                    </button>
                                </div>

                                <h1 className="text-center text-color-1 font-weight-500 font-size-160 font-size-md-180 font-size-xl-210 font-size-xxl-250 mb-0">3,333 NFTs ready to bridge the sneakerheads to the metaverse.</h1>
                            </div>
                        </div>

                        <div className="col-lg-6" id="walking-container">
                            <img src={manWalkingWithSneakers} className="h-100 position-relative" style={{"minHeight":"calc(100vh - 40px)", "zIndex":"0"}} alt="man walking with sneakers" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="background-image-cover background-image-1 position-relative" style={{"minHeight":"140px", "zIndex":"1", "backgroundPosition":"top", "marginTop":"-1px"}}></div>

            <div className="background-image-cover background-image-2 position-relative" style={{"marginTop":"-100px", "zIndex":"0"}}>
                <div id="about-us" className="position-absolute invisible" style={{"top":"-100px"}}></div>
                <div className="container pb-5">
                    <div className="pb-5">
                        <div className="row align-items-lg-center pb-5">
                            <div className="col-lg-7 pe-lg-0 mb-5 mb-md-0">
                                <img src={threeMenWalking} className="w-100" alt="three men walking" />
                            </div>

                            <div className="col-lg-5 pt-md-5 pt-lg-0 mb-5 mb-lg-0">
                                <h2 className="text-center text-color-2 font-weight-800 font-size-300 font-size-xl-370 mb-3 mb-xl-4 mt-lg-5 pt-lg-5 pt-lg-0 pt-xl-5">ABOUT US</h2>
                                <p className="text-center text-color-2 font-weight-500 font-size-120 font-size-xl-150 mb-0" style={{"lineHeight":"1.7em"}}>Sneakerverse is an NFT collection made to represent the sneaker scene and streetwear fashion in the Philippines, created by a group of people with the same love for the culture.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="background-image-cover background-image-3 position-relative" style={{"marginTop":"-110px", "zIndex":"0", "backgroundPosition":"top"}}>
                <div id="vision" className="position-absolute invisible" style={{"top":"0px"}}></div>
                <div className="container">
                    <div className="d-flex align-items-center min-vh-100">
                        <div className="px-sm-5">
                            <h2 className="text-center text-color-2 font-weight-800 font-size-300 font-size-xl-370 pt-5 my-5">VISION</h2>
                            <p className="text-center text-color-2 font-weight-500 font-size-120 font-size-xl-150 mb-5" style={{"lineHeight":"1.7em"}}>SNKV aims to build a platform for all, especially for the sneakerheads, wherein they can connect and reignite their passion and love for the culture. The project focuses on making NFTs in diverse styles to connect and represent each of the members' sense of fashion. SNKV values inclusivity and it wants to educate everyone about how Sneakers, Fashion, and Streetwear can go beyond what we expect them to be.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-color-1 position-relative">
                <div id="roadmap" className="position-absolute invisible" style={{"top":"-50px"}}></div>
                <div className="container py-5">
                    <h2 className="text-center text-color-1 font-weight-800 font-size-300 font-size-xl-370 my-5">ROADMAP</h2>
                    <img src={roadmap} className="w-100 mb-5 d-none d-lg-block" alt="sneakerverse roadmap" />
                    <img src={roadmap2} className="w-100 mb-5 d-block d-lg-none" alt="sneakerverse roadmap" />
                </div>
            </div>

            <div className="container py-5 position-relative">
                <div id="core" className="position-absolute invisible" style={{"top":"-50px"}}></div>
                <h2 className="text-center text-color-2 font-weight-800 font-size-300 font-size-xl-370 my-5">CORE</h2>

                <div className="row mb-5">
                    <div className="col-sm-6 col-lg-3 pb-4">
                        <div className="card border-radius-0 border-0 cursor-pointer position-relative overflow-hidden h-100" onMouseOver={viewTeamDescription} onMouseOut={hideTeamDescription}>
                            <div className="d-flex flex-column h-100">
                                <img src={joseph} className="w-100" alt="sneakerverse joseph kern" />
                                <div className="bg-color-1 p-4 flex-fill">
                                    <p className="text-white text-center font-weight-600 mb-1">Joseph Kern</p>
                                    <p className="text-white text-center fst-italic font-size-70 mb-2">Core &amp; Project Lead</p>
                                </div>
                            </div>

                            <div className="team-description position-absolute w-100 h-100 bg-color-1 p-4 overflow-auto" style={{"transition":"0.4s", "top":"100%"}}>
                                <div className="d-flex justify-content-end mb-3">
                                    <a className="btn btn-custom-1 d-flex align-items-center justify-content-center" href="https://twitter.com/NftSeph" target="_blank" rel="noreferrer">
                                        <i className="fab fa-twitter font-size-140"></i>
                                    </a>
                                </div>

                                <p className="text-white text-center font-weight-600 mb-1">Joseph Kern</p>
                                <p className="text-white text-center fst-italic font-size-70 mb-4 pb-2">Core &amp; Project Lead</p>

                                <p className="text-white font-size-90 mb-1" style={{"textAlign":"justify", "lineHeight":"1.8em"}}>A BS Architecture student who envisions blockchain as the foundation of the digital era. An NFT art enthusiast that supports and bridges the Filipinos to the metaverse.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3 pb-4">
                        <div className="card border-radius-0 border-0 cursor-pointer position-relative overflow-hidden h-100" onMouseOver={viewTeamDescription} onMouseOut={hideTeamDescription}>
                            <div className="d-flex flex-column h-100">
                                <img src={gian} className="w-100" alt="sneakerverse gian caringal" />
                                <div className="bg-color-1 p-4 flex-fill">
                                    <p className="text-white text-center font-weight-600 mb-1">Gian Gary Caringal</p>
                                    <p className="text-white text-center fst-italic font-size-70 mb-2">Core &amp; Artist</p>
                                </div>
                            </div>

                            <div className="team-description position-absolute w-100 h-100 bg-color-1 p-4 overflow-auto" style={{"transition":"0.4s", "top":"100%"}}>
                                <div className="d-flex justify-content-end mb-3">
                                    <a className="btn btn-custom-1 d-flex align-items-center justify-content-center" href="https://twitter.com/nftgsquared" target="_blank" rel="noreferrer">
                                        <i className="fab fa-twitter font-size-140"></i>
                                    </a>
                                </div>

                                <p className="text-white text-center font-weight-600 mb-1">Gian Gary Caringal</p>
                                <p className="text-white text-center fst-italic font-size-70 mb-4 pb-2">Core &amp; Artist</p>

                                <p className="text-white font-size-90 mb-1" style={{"textAlign":"justify", "lineHeight":"1.8em"}}>Gian is 20 years old and currently a 2nd year BS Architecture student. He has developed his talent in traditional and digital art in Junior High school and has been competing in visual art and design contests ever since. His interest in crypto and passion in art led him into the artistic world of NFTs.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3 pb-4">
                        <div className="card border-radius-0 border-0 cursor-pointer position-relative overflow-hidden h-100" onMouseOver={viewTeamDescription} onMouseOut={hideTeamDescription}>
                            <div className="d-flex flex-column h-100">
                                <img src={carlo} className="w-100" alt="sneakerverse carlo miguel angeles" />
                                <div className="bg-color-1 p-4 flex-fill">
                                    <p className="text-white text-center font-weight-600 mb-1">Carlo Miguel Angeles</p>
                                    <p className="text-white text-center fst-italic font-size-70 mb-2">Core &amp; Artist</p>
                                </div>
                            </div>

                            <div className="team-description position-absolute w-100 h-100 bg-color-1 p-4 overflow-auto" style={{"transition":"0.4s", "top":"100%"}}>
                                <div className="d-flex justify-content-end mb-3">
                                    <a className="btn btn-custom-1 d-flex align-items-center justify-content-center" href="https://twitter.com/HidroxNFTs" target="_blank" rel="noreferrer">
                                        <i className="fab fa-twitter font-size-140"></i>
                                    </a>
                                </div>

                                <p className="text-white text-center font-weight-600 mb-1">Carlo Miguel Angeles</p>
                                <p className="text-white text-center fst-italic font-size-70 mb-4 pb-2">Core &amp; Artist</p>

                                <p className="text-white font-size-90 mb-1" style={{"textAlign":"justify", "lineHeight":"1.8em"}}>Carlo is a 20 year old architecture student and is currently in his 2nd year.  His passion for the arts started in his childhood years and his passion grew until his college years. This love for the arts reached the NFT space and wishes to spread it further to the world.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3 pb-4">
                        <div className="card border-radius-0 border-0 cursor-pointer position-relative overflow-hidden h-100" onMouseOver={viewTeamDescription} onMouseOut={hideTeamDescription}>
                            <div className="d-flex flex-column h-100">
                                <img src={david} className="w-100" alt="sneakerverse david alessandro castor" />
                                <div className="bg-color-1 p-4 flex-fill">
                                    <p className="text-white text-center font-weight-600 mb-1">David Alessandro Castor</p>
                                    <p className="text-white text-center fst-italic font-size-70 mb-2">Core &amp; Artist</p>
                                </div>
                            </div>

                            <div className="team-description position-absolute w-100 h-100 bg-color-1 p-4 overflow-auto" style={{"transition":"0.4s", "top":"100%"}}>
                                <div className="d-flex justify-content-end mb-3">
                                    <a className="btn btn-custom-1 d-flex align-items-center justify-content-center" href="#" target="_blank" rel="noreferrer">
                                        <i className="fab fa-twitter font-size-140"></i>
                                    </a>
                                </div>

                                <p className="text-white text-center font-weight-600 mb-1">David Alessandro Castor</p>
                                <p className="text-white text-center fst-italic font-size-70 mb-4 pb-2">Core &amp; Artist</p>

                                <p className="text-white font-size-90 mb-1" style={{"textAlign":"justify", "lineHeight":"1.8em"}}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-color-1 position-relative">
                <div id="team" className="position-absolute invisible" style={{"top":"-50px"}}></div>
                <div className="container py-5">
                    <h2 className="text-center text-white font-weight-800 font-size-300 font-size-xl-370 my-5">TEAM</h2>

                    <div className="row justify-content-center">
                        <div className="col-sm-6 col-lg-3 pb-4">
                            <div className="card border-radius-0 border-0 cursor-pointer position-relative overflow-hidden h-100" onMouseOver={viewTeamDescription} onMouseOut={hideTeamDescription}>
                                <div className="d-flex flex-column h-100">
                                    <img src={prototype} className="w-100" alt="prototype" />
                                    <div className="bg-color-2 px-5 py-4 flex-fill">
                                        <p className="text-color-2 text-center font-weight-600 mb-1">Cee Jay Tomas</p>
                                        <p className="text-color-2 text-center fst-italic font-size-70 mb-2">Marketing Specialist</p>
                                    </div>
                                </div>

                                <div className="team-description position-absolute bg-color-2 w-100 h-100 p-4" style={{"transition":"0.4s", "top":"100%"}}>
                                    <div className="d-flex justify-content-end mb-3">
                                        <a className="btn btn-custom-3 d-flex align-items-center justify-content-center" href="https://twitter.com/ceejaysmm" target="_blank" rel="noreferrer">
                                            <i className="fab fa-twitter font-size-140"></i>
                                        </a>
                                    </div>

                                    <p className="text-color-2 text-center font-weight-600 mb-1">Cee Jay Tomas</p>
                                    <p className="text-color-2 text-center fst-italic font-size-70 mb-4 pb-2">Marketing Specialist</p>

                                    <p className="text-color-2 font-size-90 mb-1" style={{"textAlign":"justify", "lineHeight":"1.6em"}}>Cee Jay is a Social Media Marketing Specialist who fell in love with the crypto and NFT space. He has a broad range of experience working with online coaches and a few brick-and-mortar businesses. His newly-found passion for the space made him focus on helping NFT projects with their marketing.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 pb-4">
                            <div className="card border-radius-0 border-0 cursor-pointer position-relative overflow-hidden h-100" onMouseOver={viewTeamDescription} onMouseOut={hideTeamDescription}>
                                <div className="d-flex flex-column h-100">
                                    <img src={prototype} className="w-100" alt="prototype" />
                                    <div className="bg-color-2 px-5 py-4 flex-fill">
                                        <p className="text-color-2 text-center font-weight-600 mb-1">Jaesther Macanas</p>
                                        <p className="text-color-2 text-center fst-italic font-size-70 mb-2">General Operations Head</p>
                                    </div>
                                </div>

                                <div className="team-description position-absolute bg-color-2 w-100 h-100 p-4" style={{"transition":"0.4s", "top":"100%"}}>
                                    <div className="d-flex justify-content-end mb-3">
                                        <a className="btn btn-custom-3 d-flex align-items-center justify-content-center" href="https://twitter.com/xiao_nly" target="_blank" rel="noreferrer">
                                            <i className="fab fa-twitter font-size-140"></i>
                                        </a>
                                    </div>

                                    <p className="text-color-2 text-center font-weight-600 mb-1">Jaesther Macanas</p>
                                    <p className="text-color-2 text-center fst-italic font-size-70 mb-4 pb-2">General Operations Head</p>

                                    <p className="text-color-2 font-size-90 mb-1" style={{"textAlign":"justify", "lineHeight":"1.6em"}}>A 4th year Student from Polytechnic University of the Philippines. Freelance graphic and digital artist. Has a wide range of experience as an administrative head of their university's events.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center mb-5">
                        <div className="col-sm-6 col-lg-3 pb-4">
                            <div className="card border-radius-0 border-0 cursor-pointer position-relative overflow-hidden h-100" onMouseOver={viewTeamDescription} onMouseOut={hideTeamDescription}>
                                <div className="bg-color-2 px-5 py-3">
                                    <p className="text-color-2 text-center font-weight-600 mb-1">APEXboii</p>
                                    <p className="text-color-2 text-center fst-italic font-size-70 mb-1">Discord Mod</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 pb-4">
                            <div className="card border-radius-0 border-0 cursor-pointer position-relative overflow-hidden h-100" onMouseOver={viewTeamDescription} onMouseOut={hideTeamDescription}>
                                <div className="bg-color-2 px-5 py-3">
                                    <p className="text-color-2 text-center font-weight-600 mb-1">Kismet1019</p>
                                    <p className="text-color-2 text-center fst-italic font-size-70 mb-1">Discord Mod</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 pb-4">
                            <div className="card border-radius-0 border-0 cursor-pointer position-relative overflow-hidden h-100" onMouseOver={viewTeamDescription} onMouseOut={hideTeamDescription}>
                                <div className="bg-color-2 px-5 py-3">
                                    <p className="text-color-2 text-center font-weight-600 mb-1">Sunny</p>
                                    <p className="text-color-2 text-center fst-italic font-size-70 mb-1">Discord Mod</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="background-image-cover background-image-4 py-5 position-relative" style={{"zIndex":"0"}}>
                <div id="partners" className="position-absolute invisible" style={{"top":"-100px"}}></div>
                <div className="container py-4 mb-5">
                    <div className="d-flex justify-content-center align-items-center flex-wrap pb-4 py-xl-5">
                        <div className="">
                            <a href="https://twitter.com/KaChingGaming" target="_blank" rel="noreferrer">
                                <img src={kcgPartnershipLogo} height="200" alt="kcg partnership logo" />
                            </a>
                        </div>

                        <div className="px-1">
                            <a href="https://www.instagram.com/_daybreakph/" target="_blank" rel="noreferrer">
                                <img src={daybreak} height="70" alt="daybreak logo" />
                            </a>
                        </div>

                        <div className="px-3">
                            <a href="https://twitter.com/meta_donuts" target="_blank" rel="noreferrer">
                                <img src={metaD} height="170" alt="meta d logo" />
                            </a>
                        </div>

                        <div className="px-3">
                            <a href="https://twitter.com/floppydrogoNFT" target="_blank" rel="noreferrer">
                                <img src={floppyDrogoLogo} height="100" alt="floppy drogo logo" />
                            </a>
                        </div>

                        <div className="px-3">
                            <a href="https://www.facebook.com/ininja.shop" target="_blank" rel="noreferrer">
                                <img src={ininjaLogo} height="150" alt="ininja logo" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="background-image-cover background-image-5 position-relative" style={{"marginTop":"-100px", "minHeight":"155px", "zIndex":"1", "backgroundPosition":"bottom"}}></div>

            <div className="bg-color-1 pt-4 pb-5" style={{"marginTop":"-1px"}}>
                <div className="container py-3">
                    <div className="text-center text-white font-weight-600 mb-3">
                        &copy; 2022 Sneakerverse | All Rights Reserved
                    </div>

                    <div className="d-flex justify-content-center">
                        <a className="btn btn-custom-1 mx-3 d-flex align-items-center justify-content-center" href="https://twitter.com/snkvrse" target="_blank" rel="noreferrer">
                            <i className="fab fa-twitter font-size-140"></i>
                        </a>
                        <a className="btn btn-custom-1 mx-3 d-flex align-items-center justify-content-center" href="https://discord.com/invite/hNgnnjRSnD" target="_blank" rel="noreferrer">
                            <i className="fab fa-discord font-size-140"></i>
                        </a>
                    </div>
                </div>
            </div>

            <Modal show={showModalQuantity} onHide={handleCloseModalQuantity} className="" centered>
                <div className="modal-body p-5 border-0 bg-color-1">
                    <p className="text-center text-white fw-bold font-size-130">How many tokens do you want to mint?</p>

                    <div className="mb-4 pb-3 px-4">
                        <label htmlFor="recipient-name" className="col-form-label text-white text-center w-100">Quantity</label>
                        <input type="number" className="form-control fw-bold text-center font-size-200" name="quantity" step="1" min="1" max="20" value={inputsValues.quantity} onChange={handleInputChange} />
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn btn-custom-5 fw-bold px-5 py-3 font-size-110 mx-1" onClick={handleCloseModalQuantity}>Close</button>
                        <button type="button" className="btn btn-custom-4 fw-bold px-5 py-3 font-size-110 mx-1" onClick={mint}>MINT</button>
                    </div>
                </div>
            </Modal>

            <Modal show={showModalProcessing} onHide={handleCloseModalProcessing} className="" backdrop="static" keyboard={false} centered>
                <div className="modal-body p-5">
                    <div className="text-center py-4">
                        <div className="spinner-grow bg-white mb-3" style={{"width":"5rem", "height":"5rem"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mb-0 fw-bold font-size-110 text-white mb-2">Processing your transaction</p>
                    </div>
                </div>
            </Modal>

            <Modal show={showModalMinted} onHide={handleCloseModalMinted} className="" centered>
                <div className="modal-body p-5">
                    <div className="text-center py-4">
                        <i className="fas fa-check-circle font-size-600 text-color-1 mb-3"></i>
                        <p className="mb-0 fw-bold font-size-110 text-white mb-4 pb-2" id="minted-message">You have successfully minted your NFT.</p>

                        <a href="#" target="_blank" rel="noreferrer" className="btn btn-custom-4 fw-bold px-5 py-3 font-size-110" id="opensea">View on OpenSea</a>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Home