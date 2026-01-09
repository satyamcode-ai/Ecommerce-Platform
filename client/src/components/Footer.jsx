import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-8 mt-auto w-full">
            <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
                <p className="text-sm text-slate-400">&copy; 2026 Satyam Singh. All rights reserved.</p>
                <a
                    href="https://www.linkedin.com/in/satyam-singh-92b774256/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors font-medium"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn Profile
                </a>
            </div>
        </footer>
    );
};

export default Footer;
