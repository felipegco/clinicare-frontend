import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Hero.css'
import heroImage1 from '../../../assets/hero1.jpg';
import heroImage2 from '../../../assets/hero2.jpg';
import BotaoRoxo from "../../ui/BotaoRoxo/BotaoRoxo.jsx";

function Hero(){

    const ImageSwiper = () => (
        <Swiper modules={[Autoplay, EffectFade]} effect={"fade"} loop={true} autoplay={{ delay: 4000, disableOnInteraction: false }} className="hero_swiper"
            onSlideChangeTransitionEnd={(swiper) => swiper.el.dispatchEvent(new Event('glass-change', { bubbles: true }))}>
            <SwiperSlide>
                <img src={heroImage1} alt="Recepção confortável da clínica CliniCare" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={heroImage2} alt="Vista ampla da recepção da clínica" />
            </SwiperSlide>
        </Swiper>
    )

    return (
        <div id="hero">
            <section className="hero_container">
                <div className="hero_text_column">
                    <h1>A jornada para o seu sorriso perfeito começa aqui.</h1>
                    <div className="hero_swiper_mobile">
                        <ImageSwiper />
                    </div>
                    <p>Equipamentos de ponta e especialistas dedicados a cuidar da sua saúde bucal com o carinho e a atenção que você merece.</p>
                    <BotaoRoxo/>
                </div>
                <div className="hero_image_column_desktop">
                    <ImageSwiper />
                </div>
            </section>
        </div>
    )
} export default Hero;