import { useState, useEffect, useRef } from 'react';
import { LiquidGlass } from '@ybouane/liquidglass';
import './Header.css';
import '../../ui/HeaderEffect.css';
import logo from '../../../assets/mini-logo.png';

// Configuração do vidro (https://liquid-glass.ybouane.com)
const glassConfig = (scrolled) => JSON.stringify({
    // valores do Interactive Playground da LiquidGlass
    blurAmount: 0.25,
    refraction: 0.8,
    chromAberration: 0,
    edgeHighlight: 0.05,
    specular: 0,
    fresnel: 2,
    distortion: 0,
    cornerRadius: scrolled ? 40 : 0,
    zRadius: 40,
    opacity: 1,
    saturation: 0,
    brightness: 0,
    shadowOpacity: scrolled ? 0.3 : 0,
    shadowSpread: 10,
    bevelMode: 0,
});

function Header({ children, mobileContent }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const glassRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);

    // O vidro precisa ser filho direto do root; o root é o container da página
    useEffect(() => {
        const glass = glassRef.current;
        const root = glass.parentElement;
        let instance = null;
        let cancelled = false;

        // Conteúdo que muda sozinho (ex.: carrossel) avisa com o evento 'glass-change'
        const handleChange = (e) => instance?.markChanged(e.target);
        root.addEventListener('glass-change', handleChange);

        // A LiquidGlass não percebe a rolagem da página sob o header fixo
        const handleScroll = () => instance?.markChanged();
        window.addEventListener('scroll', handleScroll, { passive: true });

        LiquidGlass.init({ root, glassElements: [glass] })
            .then((created) => {
                if (cancelled) {
                    created.destroy();
                    return;
                }
                instance = created;
            })
            .catch((err) => console.error('LiquidGlass:', err));

        return () => {
            cancelled = true;
            root.removeEventListener('glass-change', handleChange);
            window.removeEventListener('scroll', handleScroll);
            instance?.destroy();
        };
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <div
                ref={glassRef}
                className={`header-effect-wrapper ${scrolled ? 'scrolled' : ''}`}
                data-config={glassConfig(scrolled)}
            >
                <header className="header-container">
                    <img src={logo} alt="CliniCare Logo" className="header-logo"/>
                    {children}
                </header>
            </div>

            <div className={`menu-icon ${menuOpen ? 'active' : ''} ${scrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>
                <div className="menu-icon__line"></div>
                <div className="menu-icon__line"></div>
                <div className="menu-icon__line"></div>
            </div>

            <div className={`backdrop ${menuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

            <nav className={`mobile-nav ${menuOpen ? 'active' : ''}`}>
                {mobileContent && mobileContent(closeMenu)}
            </nav>
        </>
    );
} export default Header;
