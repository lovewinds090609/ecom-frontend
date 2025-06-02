import { MoonLoader } from "react-spinners";
const Loader = ({text}) => {
    return (
        <div className="flex flex-col justify-center items-center h-[200px] gap-4">
            <MoonLoader color="#17e939" loading size={60} />
            <p className="text-slate-800 text-lg font-medium">{text ? text : "Please wait..."}</p>
        </div>
    )
}

export default Loader;