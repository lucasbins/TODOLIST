import React, { useState, useCallback } from 'react';
import Header from '../components/Header.jsx';
import Img from '../img/img2.jpg';
import Footer from '../components/Footer.jsx';


export const LandingPage = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenLogin = useCallback(() => {
        setOpenModal(true);
    }, [setOpenModal]);

    return (
        <>
            <img src={Img} alt={""} className="img-fluid" />
            <div id="titulo">
                <p id="titulo_chamada">Chega de procastinar!</p>
                <p id="titulo_texto">Comece a usar o <b style={{ color: 'rgba(155, 0, 250, 1)' }}>
                    Tarefas.io
                </b>, e não perca nenhuma atividade!</p>
                <button className='button-comecar' onClick={handleOpenLogin}>Começar</button>
            </div>
            <Header
                openModalLogin={openModal}
                closeModalLogin={() => {
                    setOpenModal(false);
                }}
            />
            <Footer />
        </>
    )
}