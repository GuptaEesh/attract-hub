import { SiHashnode, SiTwitter, SiLinkedin, SiGmail } from 'react-icons/si'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdHealthAndSafety } from 'react-icons/md'
import { GiHeartKey, GiWrappedSweet, GiSnorkel } from 'react-icons/gi'
import './footer.css'
export function Footer() {
    const gap10 = {
        gap: '10px',
    }
    return (
        <div className="flex footer align-left margin-top-8 justify-space-around flex-wrap">
            <div className="flex flex-column justify-center align-center connect-links">
                <h2>Connect with us :</h2>
                <section className="flex" style={gap10}>
                    <a
                        href="https://webdevjourney.hashnode.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-links"
                    >
                        <SiHashnode />
                    </a>
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
                </section>
                <section
                    className="flex flex-column align-center"
                    style={gap10}
                >
                    <a
                        href="mailto:ssg4099@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-links bold flex align-center"
                        style={gap10}
                    >
                        Email-us <SiGmail className="md" />
                    </a>
                    <a
                        href="https://wa.me/+917015887787"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-links bold flex align-center"
                        style={gap10}
                    >
                        Whatsapp-us <BsFillTelephoneFill className="md" />
                    </a>
                    <p style={gap10}>Helpline : +91 89076-23468</p>
                </section>
            </div>
            <div className="flex flex-column justify-center gap-1">
                <h2 className="bold">Affiliated Partners :</h2>

                <p className="flex flex-column connect-links bold">
                    <span className="flex gap-1">
                        <span className="sm">
                            Keyos <GiHeartKey className="sm" />
                        </span>{' '}
                        <span className="sm">
                            Wrapofy <GiWrappedSweet className="sm" />
                        </span>
                    </span>
                    <span className="flex gap-1">
                        <span className="sm">
                            X-Hosts <GiSnorkel className="sm" />
                        </span>{' '}
                        <span className="sm">
                            Safers <MdHealthAndSafety className="sm" />
                        </span>
                    </span>
                </p>
                <span className="sm">More Partners joining soon.....</span>
            </div>
            <div className="align-left flex flex-column justify-center gap-1">
                <h2 className="bold">We are best known for :</h2>
                <div className="flex justify-center bold connect-links">
                    <ul className="list-squareUnordered">
                        <li className="sm">Fast Delivery</li>
                        <li className="sm">Good quality products</li>
                        <li className="sm">Available in 250 locations</li>
                    </ul>
                    <ul className="list-squareUnordered">
                        <li className="sm">Products never seen before</li>
                        <li className="sm">Properly sanitized products</li>
                        <li className="sm">Round the clock customer care</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
