import { SiHashnode, SiTwitter, SiLinkedin, SiGithub } from 'react-icons/si'
// import { BsFillTelephoneFill } from 'react-icons/bs'
// import { MdHealthAndSafety } from 'react-icons/md'
// import { GiHeartKey, GiWrappedSweet, GiSnorkel } from 'react-icons/gi'
import './footer.css'
export function Footer() {
    const gap10 = {
        gap: '10px',
    }
    return (
        <div className="flex footer align-left margin-top-8 justify-space-around flex-wrap">
            <div className="flex flex-column justify-center align-center connect-links">
                <h3>Made with &lt;/&gt; by Eesh Gupta</h3>
                <section className="flex" style={gap10}>
                    <a
                        href="https://twitter.com/ra1711003010629"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-links"
                    >
                        <SiTwitter />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/eesh-gupta-42673a144"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-links"
                    >
                        <SiLinkedin />
                    </a>
                    <a
                        href="https://github.com/GuptaEesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-links"
                    >
                        <SiGithub />
                    </a>
                    <a
                        href="https://webdevjourney.hashnode.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-links"
                    >
                        <SiHashnode />
                    </a>
                </section>
                <p className="bold">© 2022 Attr🔷ct Designs</p>
            </div>
        </div>
    )
}
