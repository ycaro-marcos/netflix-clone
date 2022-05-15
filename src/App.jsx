import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { faLongArrowLeft, faArrowRight, faCirclePlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getMovieList } from './service/filmes-service';
import img from './img/troia.jpg';
import HeaderOptions from './service/header-options'
import NavItem from './components/nav-item';
import SpanInfo from './components/span-info';

import "./styles/slik.scss";

const URL_BASE = 'https://image.tmdb.org/t/p/w500/';

const PrevArrow = ({ currentSlide, slideCount, ...props }) => {
    const { onClick } = props;

    return (
        <div {...props} className="custom-prevArrow" onClick={onClick}>
            <FontAwesomeIcon icon={faLongArrowLeft} />
        </div>
    );
};

const NextArrow = ({ currentSlide, slideCount, ...props }) => {
    const { onClick } = props;

    return (
        <div {...props} className="custom-nextArrow" onClick={onClick}>
            <FontAwesomeIcon icon={faArrowRight} />
        </div>
    );
};

export default () => {
    const settings = {
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1248,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                }
            }
        ]
    };
    const [list, setList] = useState([])
    const sinopse = "O filme conta a história da batalha entre os reinos antigos de Troia e Esparta. Durante uma visita ao rei de Esparta, Menelau, o príncipe troiano Paris se apaixona pela esposa do rei, Helena, e a leva de volta para Troia."
    useEffect(() => {
        console.log(process.env.IMAGE_URL_BASE)
        const loadAll = async () => {
            let xolinha = await getMovieList();
            setList(xolinha)
        }
        loadAll()
    }, []);

    return (
        <>
            {console.log(list)}
            <header>
                <div className="conteiner">
                    <h2 className="logo">NETFLIX</h2>
                    <nav>
                        {
                            HeaderOptions.map(option => <NavItem title={option} toLink={option}></NavItem>)
                        }
                    </nav>

                </div>
            </header>

            <main>
                <div style={{ width: '100vw' }}>

                    <div className="divPai">

                        <div className="sinopse">

                            <div className="sinopseBox">
                                <div>
                                    <span className=""><strong>NETFLIX </strong>ORIGINAL</span>
                                    <h1 style={{ fontSize: '2.3rem' }}>TRÓIA</h1>
                                </div>

                                <div className="informacoes">
                                    <SpanInfo classStyle="relevancia" value="98% relevante"></SpanInfo>
                                    <SpanInfo value="2004"></SpanInfo>
                                    <SpanInfo value="180 minutos"></SpanInfo>
                                    <SpanInfo classStyle="border" value="4k full hd"></SpanInfo>
                                    <SpanInfo classStyle="border" value="5.1"></SpanInfo>
                                </div>

                                <div className="texto">
                                    <SpanInfo value={sinopse}></SpanInfo>
                                </div>

                                <div className="play-container">
                                    <span className="play">Asssistir</span>

                                    <span className="more-info">Mais Informações</span>

                                </div>
                            </div>
                        </div>

                        <div className="imagem">
                            <div className="imagem-container">
                                <img src={img} alt="" className="gradient" />
                            </div>
                        </div>
                    </div>

                    <div >
                        {list.map((item) => {
                            const newList = item.items.data.results.slice(0, 20)
                            console.log(newList)
                            return (
                                <div className='containerPai'>
                                    <span style={{ marginLeft: '10px' }}><strong>{item.title}</strong></span>
                                    <div className='cards'>
                                        {
                                            /** spread */
                                            <Slider {...settings} arrows={true} >
                                                {
                                                    newList.map((filme) => {
                                                        return (
                                                            <div >
                                                                <section>
                                                                    <div style={{}} className='imageContainer'>
                                                                        <div style={{ backgroundImage: `url(${URL_BASE}${filme.poster_path})` }} className='poster-image'>
                                                                            <div className='options-container'>
                                                                                <div className='film-option-container'>
                                                                                    <div className='option-play-container'>

                                                                                        <button className='options-button'>
                                                                                            <FontAwesomeIcon className='option-icon' icon={faCirclePlay}></FontAwesomeIcon>
                                                                                        </button>
                                                                                        <span className='namePlay'>play</span>
                                                                                    </div>

                                                                                    <div className='option-info-container'>
                                                                                        <button className='options-button'>
                                                                                            <FontAwesomeIcon className='option-icon' icon={faCircleInfo}></FontAwesomeIcon>
                                                                                        </button>
                                                                                        <span className='nameInfo' >info</span>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </section>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Slider>
                                        }
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>

            </main>
        </>
    )
}