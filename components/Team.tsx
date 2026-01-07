import { Linkedin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';

const team = [
    {
        name: "Ezzat Darra",
        role: "Developer",
        image: "/team/ezzat-darra.jpg",
        socials: {
            instagram: "https://www.instagram.com/m_ezzat_darra?igsh=bDVreGU5M3R3NnN3",
            linkedin: "https://www.linkedin.com/in/m-ezzat-darra-6b9a4726"
        }
    },
    {
        name: "Mazen Alnouri",
        role: "CTO",
        image: "/team/team-3.jpg",
        socials: {
            instagram: "https://www.instagram.com/mazennouri?igsh=MWozNTJoMnk1ODlhOA==",
            linkedin: "https://www.linkedin.com/in/mazen-al-nouri-4472981ba"
        }
    },
    {
        name: "Salma Alazhuri",
        role: "Marketing coordinator",
        image: "/team/team-4.jpg",
        socials: {
            instagram: "https://www.instagram.com/amer_aldarra?igsh=MXA2czlvNXl1OHlnOA==",
            linkedin: "https://www.linkedin.com/in/salma-alazhari-1559b7179"
        }
    },
    {
        name: "Abd Alrhman Al Darra",
        role: "CEO",
        image: "/team/founder.jpg",
        socials: {
            instagram: "https://www.instagram.com/abdalrhman.darra?igsh=MTZpZDFnNnBjcjl3Nw%3D%3D&utm_source=qr",
            linkedin: "https://www.linkedin.com/in/abd-alrhman-al-darra-45160911b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
        }
    },
    {
        name: "Amer Darra",
        role: "Accountant",
        image: "/team/amer-darra.jpg",
        socials: {
            instagram: "https://www.instagram.com/amer_aldarra?igsh=MXA2czlvNXl1OHlnOA==",
            linkedin: "https://www.linkedin.com/in/mhd-amer-aldrra-1a860b63"
        }
    }
];

export default function Team() {
    const t = useTranslations('Team');

    return (
        <section id="team" className="py-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-heading text-primary-dark dark:text-white mb-4 uppercase">{t('title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-4">
                                    {/* Render social icons based on availability */}
                                    <div className="flex gap-3 text-gray-500 dark:text-gray-400">
                                        {member.socials.linkedin && (
                                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-white transition-colors">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        {member.socials.instagram && (
                                            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-white transition-colors">
                                                <Instagram className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className={`font-bold font-heading text-gray-800 dark:text-white ${member.name.length > 15 ? 'text-base' : 'text-lg'}`}>{member.name}</h3>
                                <span className="text-sm text-primary dark:text-gray-300 font-medium">{member.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
