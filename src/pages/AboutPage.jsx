import About from "../components/home/About";
import Features from "../components/home/Features";
import Team from "../components/home/Team";

const AboutPage = () => {
    return(
        <>
        <div class="jumbotron jumbotron-fluid mb-5">
            <div class="container text-center py-5">
                <h1 class="text-white display-3">About</h1>
                <div class="d-inline-flex align-items-center text-white">
                    <p class="m-0"><a class="text-white" href="home.html">Home</a></p>
                    <i class="fa fa-circle px-3"></i>
                    <p class="m-0">About</p>
                </div>
            </div>
        </div>
        <About />
        <Features />
        <Team />
        </>
    )
}

export default AboutPage;