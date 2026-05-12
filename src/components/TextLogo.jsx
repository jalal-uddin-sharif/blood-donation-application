import { BiDonateHeart } from "react-icons/bi";

const TextLogo = ({ compact = false }) => {
  return (
    <div className="inline-flex items-center gap-2 text-left">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-pink-600 text-white shadow-sm shadow-pink-200">
        <BiDonateHeart size={24} />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block text-xl font-black tracking-normal text-slate-950 dark:text-white">
            Red<span className="text-pink-600">Love</span>
          </span>
          <span className="block text-[11px] font-semibold uppercase tracking-normal text-pink-500">
            Blood Network
          </span>
        </span>
      )}
    </div>
  );
};

export default TextLogo;
