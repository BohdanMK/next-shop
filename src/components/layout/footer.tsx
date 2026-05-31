import { getTranslations } from "next-intl/server"
import Link from "next/link";
import SocialLinks from "@/config/social-links";
import Logo from "@/components/brand/logo";
import CatalogList from "@/config/catalog-list";
import { NavigationConfigList } from "@/config/navigation-list";
import HeaderContacts from "@/components/contacts/header-contacts";

const Footer = async () => {
    const t = await getTranslations('footer')

    return (
            <footer className="text-foreground py-5">
                <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-5">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <Logo />
                                <div className="block sm:hidden">
                                    <HeaderContacts
                                        className="text-[14px] font-bold p-0 outline-0 focus:right-0"
                                    />
                                </div>
                            </div>
                            {/* social */}
                            <div className="mb-7 hidden sm:flex gap-6 items-center">
                                <ul className="flex  gap-4">
                                    {SocialLinks.map((item, index) => (
                                        <li key={index} className="mb-0 leading-normal text-[14px] style-lyra:mb-2 style-lyra:leading-relaxed hover:scale-125 transition-all">
                                            <a href={item.href} target="_blank" rel="noreferrer" className="font-regular">
                                                <img src={item.icon} alt={item.name} />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="mb-0">
                                <h4 className="font-bold text-[14px] mb-2">{t('pages')}</h4>
                                <ul className="flex  gap-4 flex-wrap">
                                    {NavigationConfigList.map((item, index) => (
                                        <li key={index} className="mb-0 leading-normal text-[12px] style-lyra:mb-2 style-lyra:leading-relaxed">
                                            <Link href={item.href} className="font-regular">{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-0">
                                <h4 className="font-bold text-[14px] mb-2">{t('catalog')}</h4>
                                <ul className="flex flex-row gap-2 flex-wrap">
                                    {CatalogList.map((item, index) => (
                                        <li key={index} className="mb-0 leading-normal text-[12px] style-lyra:mb-2 style-lyra:leading-relaxed">
                                            <Link href="#" className="font-regular">{item.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="hidden sm:block">
                                <HeaderContacts
                                    className="text-[14px] font-bold p-0 outline-0 focus:right-0"
                                />
                            </div>
                            <div className="max-w-[194px] text-[13px] leading-[100%]">
                                {t('scheduleTitle')} <br />
                                {t('deliverySchedule')} <br />
                                {t('pickupSchedule')} <br />
                                {t('noWeekends')}
                            </div>
                        </div>
                    </div>

                </div>
           </footer>
        )
}

export default Footer
