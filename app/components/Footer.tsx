export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 bottom-0">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold">My e-commerce Website</h3>
                        <p className="text-gray-400">© 2024 All Rights Reserved</p>
                    </div>
                    <ul className="flex space-x-6">
                        <li>
                            <a href="/" className="hover:text-gray-300">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-gray-300">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/services" className="hover:text-gray-300">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-gray-300">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
