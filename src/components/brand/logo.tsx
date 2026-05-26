import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={94} height={60} loading="eager" style={{ width: "auto", height: "auto" }} />
    </div>
  );
}

export default Logo;