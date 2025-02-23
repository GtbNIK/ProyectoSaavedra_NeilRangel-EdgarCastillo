import Services from "../components/home/Services";
import QuoteRequest from "../components/home/QuoteRequest";
import Testimonial from "../components/home/Testimonial";

const ServicesPage = () => {
    return(
        <>
        <div class="jumbotron jumbotron-fluid mb-5">
            <div class="container text-center py-5">
                <h1 class="text-white display-3">Services</h1>
                <div class="d-inline-flex align-items-center text-white">
                    <p class="m-0"><a class="text-white" href="home.html">Home</a></p>
                    <i class="fa fa-circle px-3"></i>
                    <p class="m-0">Services</p>
                </div>
            </div>
        </div>
            < Services />
            < QuoteRequest />
            < Testimonial />
        </>
    )
}

export default ServicesPage;