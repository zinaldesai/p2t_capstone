import landing from "../assets/landing.png"
import appDownload from "../assets/appDownload.png"

const HomePage = () => {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-[#496928]">
                    In Crust We Trust
                </h1>
                <span className="text-xl">Order now and get a pi-zza the action!</span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landing}/>
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">Order food even faster!</span>
                    <span>Download the Just Dough It App for faster ordering and personalized recommendations</span>
                    <img src={appDownload} />
                </div>
            </div>
        </div>
    )
}

export default HomePage;